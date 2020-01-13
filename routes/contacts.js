const router = require('express').Router();
const Contact = require('../models/contact');

// Find User All
router.get('/userid/:userid', (req, res) => {
  Contact.findUserAll(req.params.userid)
    .then((contacts) => {
      if (!contacts.length) return res.status(404).send({ err: 'Contact not found' });
      res.send(contacts);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by contactid
router.get('/contactid/:contactid', (req, res) => {
  Contact.findOneByContactid(req.params.contactid)
    .then((contact) => {
      if (!contact) return res.status(404).send({ err: 'Contact not found' });
      res.send(contact);
    })
    .catch(err => res.status(500).send(err));
});

// Create new contact document
router.post('/', (req, res) => {
  Contact.create(req.body)
    .then(contact => res.send(contact))
    .catch(err => res.status(500).send(err));
});

// Update by contactid
router.put('/contactid/:contactid', (req, res) => {
  Contact.updateByContactid(req.params.contactid, req.body)
    .then(contact => res.send(contact))
    .catch(err => res.status(500).send(err));
});

// Delete by contactid
router.delete('/contactid/:contactid', (req, res) => {
  Contact.deleteByContactid(req.params.contactid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;