const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',         // Update your MySQL password
  database: 'user_profiles'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL.');
});

// Save new profile
app.post('/profile', (req, res) => {
  const { fullName, studentId, email, contact, address } = req.body;
  const sql = 'INSERT INTO profiles (fullName, studentId, email, contact, address) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [fullName, studentId, email, contact, address], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Saved successfully', id: result.insertId });
  });
});

// Edit profile
app.put('/profile/:id', (req, res) => {
  const { id } = req.params;
  const { fullName, studentId, email, contact, address } = req.body;
  const sql = 'UPDATE profiles SET fullName=?, studentId=?, email=?, contact=?, address=? WHERE id=?';
  db.query(sql, [fullName, studentId, email, contact, address, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Profile updated successfully' });
  });
});

// Delete profile
app.delete('/profile/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM profiles WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Profile deleted successfully' });
  });
});

// Get profile (for editing)
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM profiles WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Profile not found' });
    res.send(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
