const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 5500;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'images', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('Created icons directory:', iconsDir);
}

// Simple 1x1 pixel transparent favicon base64 data for placeholder icons
const faviconBase64 = 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD///8AVVVVAFVVVQJVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQRVVVUCVVVVAFVVVQD///8AVVVVAFVVVQJVVVUHVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUHVVVVAlVVVQBVVVVA////AFVVVQJVVVUHVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVB1VVVQJVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUCVVVVB1VVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVB1VVVQJVVVUAVVVVAFVVVQBVVVUAVVVVAlVVVQdVVVUJVVVVCVVVVQlVVVVCVVVVCVVVVQlVVVUJVVVVB1VVVQJVVVUAVVVVAFVVVQBVVVUAVVVVAFVVVQJVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQJVVVUAVVVVAFVVVQD///8A';
const faviconBuffer = Buffer.from(faviconBase64, 'base64');

// Helper function to create placeholder icon if it doesn't exist
function createPlaceholderIcon(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, faviconBuffer);
    console.log(`Created placeholder icon: ${filePath}`);
  }
}

// Create placeholder icons if they don't exist
const iconFiles = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png'
];

iconFiles.forEach(iconFile => {
  createPlaceholderIcon(path.join(iconsDir, iconFile));
});

// Redirect favicon requests to the images/icons directory
app.use('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'images', 'icons', 'favicon.ico'));
});
app.use('/favicon-16x16.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'images', 'icons', 'favicon-16x16.png'));
});
app.use('/favicon-32x32.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'images', 'icons', 'favicon-32x32.png'));
});
app.use('/apple-touch-icon.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'images', 'icons', 'apple-touch-icon.png'));
});
app.use('/site.webmanifest', (req, res) => {
  res.sendFile(path.join(__dirname, 'site.webmanifest'));
});

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// WebSocket server for live reload
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Broadcasting function for WebSocket
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`WebSocket server running at ws://localhost:${port}/ws`);
});