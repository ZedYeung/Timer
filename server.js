const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose')
const Timer = require('./models/Timer')
const config = require('./config')

const app = express();

mongoose.connect(config.database)
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.use(cors())
app.set('port', (process.env.PORT || 5001));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

app.get('/api/timers', (req, res) => {
  Timer.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json({
        sucess: false,
        msg: err
      })
    })
});

app.post('/api/timers', (req, res) => {
  const newTimer =new Timer ({
    title: req.body.title,
    id: req.body.id,
    elapsed: 0,
    runningSince: null,
  });

  newTimer.save()
    .then((result) => {
      res.json({
        sucess: true,
        msg: 'Successfully added new Timer!'
      })
    })
    .catch((err) => {
      res.json({
        sucess: false,
        msg: err
      })
    })
});

app.post('/api/timers/start', (req, res) => {
  Timer.findOneAndUpdate(
    { id: req.body.id },
    { runningSince: req.body.start }
  )
  .then((result) => {
    res.json({
      sucess: true,
      msg: 'Successfully start Timer!'
    })
  })
  .catch((err) => {
    res.json({
      sucess: false,
      msg: err
    })
  })
});

app.post('/api/timers/stop', (req, res) => {
  Timer.findOne({ id: req.body.id }, (err, timer) => {
      const delta = req.body.stop - timer.runningSince;
      timer.elapsed += delta;
      timer.runningSince = null;

      timer.save()
        .then((result) => {
          res.json({
            sucess: true,
            msg: 'Successfully stop Timer!'
          })
        })
        .catch((err) => {
          res.json({
            sucess: false,
            msg: err
          })
        })
    })
});

app.put('/api/timers', (req, res) => {
  Timer.findOneAndUpdate(
    { id: req.body.id },
    {
      title: req.body.title
    }
  )
  .then((result) => {
    res.json({
      sucess: true,
      msg: 'Successfully update Timer!'
    })
  })
  .catch((err) => {
    res.json({
      sucess: false,
      msg: err
    })
  })
});

app.delete('/api/timers', (req, res) => {
  Timer.findOneAndRemove({ id: req.body.id} )
    .then((result) => {
      res.json({
        sucess: true,
        msg: 'Successfully delete Timer!'
      })
    })
    .catch((err) => {
      res.json({
        sucess: false,
        msg: err
      })
    })
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
