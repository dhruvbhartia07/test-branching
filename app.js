const express = require('express');
const app = express();
const port = 3000;

// Middleware to simulate a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Route 1: A route that returns a simple response after 10 seconds
app.get('/route1', async (req, res) => {
  try {
    console.log('Route 1 processing started');
    await delay(10000);  // 10 seconds delay
    console.log('Route 1 processing completed');
    res.status(200).send('Processed after 10 seconds');
  } catch (error) {
    res.status(500).send('Error occurred');
  }
});

// Route 2: A route that returns a 500 after 10 seconds of processing
app.get('/route2', async (req, res) => {
  try {
    console.log('Route 2 processing started');
    await delay(10000);  // 10 seconds delay
    console.log('Route 2 processing completed');
    res.status(500).send('Internal Server Error after 10 seconds');
  } catch (error) {
    res.status(500).send('Error occurred');
  }
});

// Route 3: A route with a 5-second timeout and calls Route 1 internally
app.get('/route3', (req, res) => {
  const timeout = setTimeout(() => {
    res.status(500).send('Request Timeout - Operation took too long');
  }, 5000);  // 5-second timeout
  
  // Simulating the call to Route 1 (internally)
  fetchRoute1()
    .then(response => {
      clearTimeout(timeout);  // Clear timeout if route 1 succeeds within time
      res.status(200).send(response);
    })
    .catch(error => {
      clearTimeout(timeout);  // Clear timeout if there's an error
      res.status(500).send('Failed to call Route 1');
    });
});

// Helper function to simulate calling Route 1 internally
const fetchRoute1 = async () => {
  console.log('Calling Route 1 internally...');
  const response = await new Promise((resolve, reject) => {
    // Using fetch or you can use axios or any HTTP client here
    const http = require('http');

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/route1',
      method: 'GET',
    };

    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.end();
  });

  return response;
};

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
