require('dotenv').config({ path: 'config/.env' });
const express = require('express');
const connectDB = require('./config/connectDB');

const app = express();

app.use(express.json());

app.use('/api/v1', require('./routes'));

// Connection with Database
(async function () {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(process.env.PORT, () => {
      console.log(
        `Database Connect Success & App is Listen on ${process.env.PORT}`
      );
    });
  } catch (err) {
    console.log(`Database Connect Fail for ${err.message}`);
  }
})();
