// Import dependencies
const mysql = require('mysql');
const express = require('express');

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'nodedb'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...')
});

const app = express();

// Initial
app.get('/', (req, res) => {
  res.json({greeting:'Hello World!'});
});

// Create DB
app.get('/createdb/:dbname', (req, res) => {
  let sql = `CREATE DATABASE ${req.params.dbname}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', result);
    res.send(`Database ${req.params.dbname} created...`);
  })
});

// Create table
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', result);
    res.send('Posts table created...');
  })
});

// Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {
    title: 'Post One',
    body: 'This is post number one'
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', result);
    res.send('Posts 1 added...');
  })
});

// Insert post 2
app.get('/addpost2', (req, res) => {
  let post = {
    title: 'Post Two',
    body: 'This is post number two'
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', result);
    res.send('Posts 2 added...');
  })
});

// Select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', results);
    res.send('Posts fetched...');
  })
});

// Select single post
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', result);
    res.send('Post fetched...');
  })
});

// Update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', result);
    res.send('Post updated...');
  })
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Result: ', result);
    res.send('Post deleted...');
  })
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
