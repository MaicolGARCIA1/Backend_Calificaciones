const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const interactionsRouter = require('./src/routes/interactions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/interactions', interactionsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const interactionsRouter = require('./src/routes/interactions');
// const db = require('./src/db');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// app.use('/interactions', interactionsRouter);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     process.exit(1);
//   }
//   console.log('Connected to database');
// });