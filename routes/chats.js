const router = require('express').Router();
const Chat = require('../models/chat');

router.get('/chat/:roomid', (req, res) => {
    Chat.findUserAll(req.params.roomid)
      .then((chats) => {
        if(chats.length ==0) return res.status(404).send({'msg' : 'user not found'});
        else res.send(chats);
      })
      .catch(err => res.status(500).send({'msg' : err}));
  });

router.delete('/chat/:roomid', (req, res) => {
    Chat.deleteByRoomid(req.params.roomid)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

router.get('/all', (req, res) => {
    Chat.findUserAll()
      .then((users) => {
        if (users.length == 0) return res.status(404).send({ err: 'User not found' });
        else res.send(users);
      })
      .catch(err => res.status(404).send({err : 'User not found'}));
  });

module.exports = router;