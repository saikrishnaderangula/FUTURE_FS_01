const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sai76587658**', // Replace with your MySQL root password
  database: 'portfolio_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('MySQL Connected');
});

// Create a table for contact form submissions if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, err => {
  if (err) {
    console.error('Error creating contacts table:', err.message);
  } else {
    console.log('Contacts table ready');
  }
});

// Create a table for blog posts if it doesn't exist (optional blog feature)
db.query(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, err => {
  if (err) {
    console.error('Error creating blog_posts table:', err.message);
  } else {
    console.log('Blog_posts table ready');
  }
});

// Email setup with Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify the transporter setup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP connection successful');
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validate request body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Save to database
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to save message to database' });
    }

    // Debug log to confirm recipient email
    console.log('Sending email to:', email);

    // Send email to the form submitter
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender: worldofwords81@gmail.com
      to: email, // Recipient: the email from the form
      cc: process.env.EMAIL_USER, // CC to yourself to get a notification
      subject: 'Thank You for Contacting Me',
      text: `Hello ${name},\n\nThank you for reaching out!\n\nYour message: ${message}\n\nI will get back to you soon at ${email}.\n\nBest regards,\n[Your Name]`,
      replyTo: process.env.EMAIL_USER, // Replies go to your email
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error.message);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Message sent successfully' });
    });
  });
});

// Blog endpoints (optional)
app.get('/api/blog', (req, res) => {
  db.query('SELECT * FROM blog_posts ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
    res.json(results);
  });
});

app.post('/api/blog', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const query = 'INSERT INTO blog_posts (title, content) VALUES (?, ?)';
  db.query(query, [title, content], (err) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Failed to add blog post' });
    }
    res.status(200).json({ message: 'Blog post added successfully' });
  });
});

// Blog Integration: Create a table to link contact submissions to blog posts
db.query(`
  CREATE TABLE IF NOT EXISTS blog_contact_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    blog_post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
  )
`, err => {
  if (err) {
    console.error('Error creating blog_contact_links table:', err.message);
  } else {
    console.log('Blog_contact_links table ready');
  }
});

// Blog Integration: Endpoint to link a contact submission to a blog post
app.post('/api/blog/contact-link', (req, res) => {
  const { contact_id, blog_post_id } = req.body;

  // Validate request body
  if (!contact_id || !blog_post_id) {
    return res.status(400).json({ error: 'Contact ID and Blog Post ID are required' });
  }

  // Verify that the contact_id exists
  db.query('SELECT id FROM contacts WHERE id = ?', [contact_id], (err, contactResults) => {
    if (err) {
      console.error('Database error (contacts check):', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    if (contactResults.length === 0) {
      return res.status(404).json({ error: 'Contact ID not found' });
    }

    // Verify that the blog_post_id exists
    db.query('SELECT id FROM blog_posts WHERE id = ?', [blog_post_id], (err, blogResults) => {
      if (err) {
        console.error('Database error (blog_posts check):', err.message);
        return res.status(500).json({ error: 'Database error' });
      }
      if (blogResults.length === 0) {
        return res.status(404).json({ error: 'Blog Post ID not found' });
      }

      // Insert the link into blog_contact_links table
      const query = 'INSERT INTO blog_contact_links (contact_id, blog_post_id) VALUES (?, ?)';
      db.query(query, [contact_id, blog_post_id], (err) => {
        if (err) {
          console.error('Database error (blog_contact_links insert):', err.message);
          return res.status(500).json({ error: 'Failed to link contact to blog post' });
        }
        res.status(200).json({ message: 'Contact linked to blog post successfully' });
      });
    });
  });
});

// Blog Integration: Endpoint to fetch contacts linked to a specific blog post
app.get('/api/blog/:id/contacts', (req, res) => {
  const blogPostId = req.params.id;

  const query = `
    SELECT c.*
    FROM contacts c
    JOIN blog_contact_links bcl ON c.id = bcl.contact_id
    WHERE bcl.blog_post_id = ?
    ORDER BY c.created_at DESC
  `;

  db.query(query, [blogPostId], (err, results) => {
    if (err) {
      console.error('Database error (fetch contacts for blog post):', err.message);
      return res.status(500).json({ error: 'Failed to fetch contacts for blog post' });
    }
    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});