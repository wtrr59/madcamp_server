const router = require('express').Router();
const Image = require('../models/image');

// Find User All
router.get('/userid/:userid', (req, res) => {
  Image.findUserAll(req.params.userid)
    .then((images) => {
      if (!images.length) return res.status(404).send({ err: 'Image not found' });
      res.send(images);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by imageid
router.get('/imageid/:imageid', (req, res) => {
  Image.findOneByImageid(req.params.imageid)
    .then((image) => {
      if (!image) return res.status(404).send({ err: 'Image not found' });
      res.send(image);
    })
    .catch(err => res.status(500).send(err));
});

// Create new image document
router.post('/', (req, res) => {
  Image.create(req.body)
    .then(image => res.send(image))
    .catch(err => res.status(500).send(err));
});

// Update by imageid
router.put('/imageid/:imageid', (req, res) => {
  Image.updateByImageid(req.params.imageid, req.body)
    .then(image => res.send(image))
    .catch(err => res.status(500).send(err));
});

// Delete by imageid
router.delete('/imageid/:imageid', (req, res) => {
  Image.deleteByImageid(req.params.imageid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;