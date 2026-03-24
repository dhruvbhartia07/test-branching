const http = require('http');

const PORT = 3000;

let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;

  console.log(`Request #${requestCount}`);

  // Simulate random crash
  if (Math.random() < 0.3) {
    console.log("Simulating crash...");
    process.exit(1); // crash the app
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello! Request count: ${requestCount}\n`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Also crash randomly every 10–20 sec
setInterval(() => {
  if (Math.random() < 0.5) {
    console.log("Random background crash!");
    process.exit(1);
  }
}, 15000);
