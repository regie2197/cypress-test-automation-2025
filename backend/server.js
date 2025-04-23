const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { json } = require('body-parser');

const app = express();
const PORT = 3000;

app.use(json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
