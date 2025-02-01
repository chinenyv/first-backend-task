const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

// In-memory data store (you can use a database like MongoDB or PostgreSQL in a real app)
let users = [];

// CREATE: Add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ: Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// READ: Get a user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// UPDATE: Update a user by ID
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  res.json(user);
});
const user = ["name", "email"]
// DELETE: Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(204).send({message: 'User successfully deleted'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
