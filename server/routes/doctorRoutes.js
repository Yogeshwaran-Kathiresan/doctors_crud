const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Get paginated doctors
router.get('/doctors', (req, res) => {
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;

    const query = `SELECT * FROM doctors LIMIT ${pageSize} OFFSET ${offset}`;
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const countQuery = 'SELECT COUNT(*) AS total FROM doctors';
        connection.query(countQuery, (err, countResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                doctors: results,
                total: countResults[0].total
            });
        });
    });
});


// Add a new doctor
router.post('/doctors', (req, res) => {
    const { name, speciality, location } = req.body;
    const query = `INSERT INTO doctors (name, speciality, location) VALUES (?, ?, ?)`;

    connection.query(query, [name, speciality, location], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Doctor added successfully', doctorId: results.insertId });
    });
});

// Update a doctor
router.put('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const { name, speciality, location } = req.body;
    const query = `UPDATE doctors SET name = ?, speciality = ?, location = ? WHERE id = ?`;

    connection.query(query, [name, speciality, location, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Doctor updated successfully' });
    });
});

// Delete a doctor
router.delete('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM doctors WHERE id = ?`;

    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Doctor deleted successfully' });
    });
});

module.exports = router;
