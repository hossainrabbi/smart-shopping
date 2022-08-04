require('dotenv').config({ path: 'config/.env' });
const express = require('express');
const connectDB = require('./config/connectDB');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/v1', require('./routes'));

// Global Error Handler
app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: `internal server error, ${err.message}`,
  });
});

// Connection with Database
connectDB(process.env.DB_URL)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(
        `Database Connect Success & App is Listen on ${process.env.PORT}`
      );
    })
  )
  .catch((err) => console.log(`Database Connect Fail for ${err.message}`));
