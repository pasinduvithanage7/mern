const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create item
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;

    // validation
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    const item = new Item({
        name,
        description,
        price
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update item
router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const updated = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description, price }, // only allowed fields
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;