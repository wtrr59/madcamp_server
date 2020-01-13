const router = require('express').Router();
const User = require('../models/user');

// User가 등록되었는지 확인
router.post('/login', (req, res) => {
  User.findOne({id : req.body.id, password : req.body.password})
    .then((users) => {
      if (!users.length)
        res.send('성공');
      return res.status(500).send('실패');
      
    })
    .catch(err => res.status(404).send('실패'));
});

// 신규 user 등록
router.post('/sign', (req, res) => {
  User.create(req.body)
    .then(user => res.send('성공'))
    .catch(err => res.status(500).send(err));
});

router.get('/user/:id', (req, res) => {
  User.findByUserid(req.params.id)
    .then((users) => {
      if (users.length == 0) return res.status(404).send({ err: 'User not found' });
      else res.send(users);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/all', (req, res) => {
  User.findUserAll()
    .then((users) => {
      if (users.length == 0) return res.status(404).send({ err: 'User snot found' });
      else res.send(users);
    })
    .catch(err => res.status(404).send({err : 'User not found'}));
});


// user 정보(이름) 수정
router.put('/user/:userid', (req, res) => {
  User.updateByUserid(req.params.userid, req.body)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

// user 삭제
router.delete('/user/:userid', (req, res) => {
  User.deleteByUserid(req.params.userid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;