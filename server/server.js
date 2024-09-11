const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', doctorRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
