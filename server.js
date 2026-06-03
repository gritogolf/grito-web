// Tiny Express server for the Grito marketing site.
// Sets a Content Security Policy that allows blob: URLs (required for the
// Claude Design self-extracting HTML bundle) while keeping reasonable security.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Set CSP headers BEFORE serving static files
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self' blob: data: https:",
      "script-src 'self' 'unsafe-inline' blob: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "img-src 'self' blob: data: https:",
      "font-src 'self' blob: data: https:",
      "connect-src 'self' blob: data: https:",
    ].join('; ')
  );
  next();
});

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// SPA fallback — if a route doesn't match a file, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Grito web server running on port ${PORT}`);
});
