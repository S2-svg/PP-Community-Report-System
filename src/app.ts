import express from 'express';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;