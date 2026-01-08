// Simple keep-alive to prevent server sleep
const http = require('http');

setInterval(() => {
  http.get('http://localhost:5000/api/test', (res) => {
    console.log(`Keep-alive ping: ${res.statusCode}`);
  }).on('error', (err) => {
    console.log('Keep-alive error:', err.message);
  });
}, 20000); // Ping every 30 seconds

console.log('Keep-alive service started');