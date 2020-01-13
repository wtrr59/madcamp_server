const router = require('express').Router();
const Gathering = require('../models/gathering');

// 전체 모임 표시 
router.get('/', (req, res) => {
  Gathering.findGatheringAll()
    .then((gatherings) => {
      if (!gatherings.length) return res.status(404).send({ err: 'Gathering not found' });
      res.send(gatherings);
    })
    .catch(err => res.status(500).send(err));
});

// Create new gathering document
router.post('/', (req, res) => {
  Gathering.create(req.body)
    .then(gathering => res.send(gathering))
    .catch(err => res.status(500).send(err));
});
/* example input
{
  "userid":["3","4"],
  "gatheringid":"12",
  "gatheringname":"마라탕",
  "expireAt": "2016-05-18T16:00:00Z",
  "place":"궁동",
  "count":"4"
}
*/

// Update by gatheringid
router.put('/gatheringid/:gatheringid', (req, res) => {
  Gathering.updateByGatheringid(req.params.gatheringid, req.body)
    .then(gathering => res.send(gathering))
    .catch(err => res.status(500).send(err));
});

// Delete by gatheringid
router.delete('/gatheringid/:gatheringid', (req, res) => {
  Gathering.deleteByGatheringid(req.params.gatheringid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;