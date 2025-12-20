// server.js
import { createServer } from 'http';
import { readFile, access } from 'fs/promises';
import { join, extname } from 'path';
import { WebSocketServer } from 'ws';
import fs from 'fs';

// Use environment variables with fallbacks
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

// Create HTTP server
const server = createServer(async (req, res) => {
  let filePath = join(
    process.cwd(),
    req.url === '/' ? 'public/index.html' : req.url
  );

  try {
    await access(filePath);
    let content = await readFile(filePath);

    if (filePath.endsWith('.html')) {
      const wsScript = `
                <script>
                    const ws = new WebSocket('ws://${HOST}:${PORT}');
                    ws.onmessage = (event) => {
                        if (event.data === 'reload') location.reload();
                    };
                </script>
            `;
      content = content.toString().replace('</body>', `${wsScript}</body>`);
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - File Not Found');
  }
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

// Watch for file changes
fs.watch(process.cwd(), { recursive: true }, (event, filename) => {
  if (filename && !filename.includes('node_modules')) {
    console.log(`File ${filename} changed`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('reload');
      }
    });
  }
});

// Start server
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
