// Script to generate basic placeholder icons
const fs = require('fs');
const path = require('path');

// Ensure icons directory exists
const iconsDir = path.join(__dirname, '..', 'images', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('Created icons directory:', iconsDir);
}

// Simple 1x1 pixel transparent favicon base64 data
const faviconBase64 = 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD///8AVVVVAFVVVQJVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQRVVVUCVVVVAFVVVQD///8AVVVVAFVVVQJVVVUHVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUHVVVVAlVVVQBVVVUA////AFVVVQJVVVUHVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVB1VVVQJVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUEVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQRVVVUAVVVVAFVVVQBVVVUCVVVVB1VVVQlVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVB1VVVQJVVVUAVVVVAFVVVQBVVVUAVVVVAlVVVQdVVVUJVVVVCVVVVQlVVVUJVVVVCVVVVQlVVVUJVVVVB1VVVQJVVVUAVVVVAFVVVQBVVVUAVVVVAFVVVQJVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQRVVVUEVVVVBFVVVQJVVVUAVVVVAFVVVQD///8A';

// Create basic favicon.ico file
const faviconBuffer = Buffer.from(faviconBase64, 'base64');
fs.writeFileSync(path.join(iconsDir, 'favicon.ico'), faviconBuffer);
console.log('Created favicon.ico');

// Create 16x16 favicon.png file
fs.writeFileSync(path.join(iconsDir, 'favicon-16x16.png'), faviconBuffer);
console.log('Created favicon-16x16.png');

// Create 32x32 favicon.png file
fs.writeFileSync(path.join(iconsDir, 'favicon-32x32.png'), faviconBuffer);
console.log('Created favicon-32x32.png');

// Create apple-touch-icon.png file
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), faviconBuffer);
console.log('Created apple-touch-icon.png');

// Create Chrome icons referred to in the manifest
fs.writeFileSync(path.join(iconsDir, 'android-chrome-192x192.png'), faviconBuffer);
console.log('Created android-chrome-192x192.png');

fs.writeFileSync(path.join(iconsDir, 'android-chrome-512x512.png'), faviconBuffer);
console.log('Created android-chrome-512x512.png');

console.log('All icon files created successfully!');