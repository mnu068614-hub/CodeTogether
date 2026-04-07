const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

function resolveRequestedPath(url = '/') {
  const rawPath = (url.split('?')[0] || '').split('#')[0] || '/';
  if (rawPath.includes('\0') || /%00/i.test(rawPath)) {
    throw new URIError('NUL bytes are not allowed in request paths');
  }

  const pathname = decodeURIComponent(rawPath);
  if (pathname.includes('\0')) {
    throw new URIError('NUL bytes are not allowed in request paths');
  }

  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const absolutePath = path.resolve(root, `.${requestedPath}`);
  const relativePath = path.relative(root, absolutePath);
  const isInsideRoot = relativePath === '' || (!relativePath.startsWith('..') && !path.isAbsolute(relativePath));

  return { absolutePath, isInsideRoot };
}

function createServer() {
  return http.createServer((req, res) => {
    let resolved;
    try {
      resolved = resolveRequestedPath(req.url || '/');
    } catch {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }

    if (!resolved.isInsideRoot) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    fs.readFile(resolved.absolutePath, (error, data) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      const ext = path.extname(resolved.absolutePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });
}

if (require.main === module) {
  createServer().listen(port, () => {
    console.log(`CodeTogether scaffold running at http://localhost:${port}`);
  });
}

module.exports = {
  createServer,
  resolveRequestedPath
};
