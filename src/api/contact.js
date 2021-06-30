const express = require('express');
const monk = require('monk');

const router = express.Router();

const bd = monk(process.env.MONOURI);
const contact = bd.get('cinfo');

// Get All Item
router.get('/', async (req, res, next) => {
  try {
    const allitem = await contact.find();

    res.json(allitem);
  } catch (error) {
    next(error);
  }
});

// Get Single Item
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = await req.params;
    const item = await contact.findOne({ _id: id });

    res.json(item);
  } catch (error) {
    next(error);
  }
});

// Insert Item
router.post('/', async (req, res, next) => {
  try {
    const value = req.body;
    await contact.insert(value);
    res.json({
      message: '1 Item Successfully inserted',
    });
  } catch (error) {
    next(error);
  }
});

// Updated 1 Item

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = await req.params;
    const vlaue = await req.body;
    const newItem = await contact.update({ _id: id }, {
      $set: vlaue,
    });

    res.json(newItem);
  } catch (error) {
    next(error);
  }
});

// Updated 1 Item

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = await req.params;

    const deletedid = await contact.remove({ _id: id });

    res.json(deletedid);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
