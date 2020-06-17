const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


//Item Model
const Item = require('../../models/item');

//@route GET api/items
//@desc Get All items
//@access Public
router.get('/', (req, res) => {
    Item.find()
     .sort({date:-1})
     .then(items => res.json(items));
});

//@route POST api/items
//@desc create an item
//@access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc delete A Item
//@access Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
     .then(item => item.remove().then(() => res.json({success: true})))
     .catch(err => res.status(404).json({success: false}));
});



module.exports = router;