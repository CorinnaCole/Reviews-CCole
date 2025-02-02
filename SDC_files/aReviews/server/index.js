require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const {getReviews, getMetaData, postReview, markReviewHelpful, reportReview} = require('./db.js');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/reviews/', (req, res) => {
  getReviews(req, res)
    .then(results => {
      res.send(results)
    })
    .catch(err => {
      res.status(404);
    })

    ;
})

app.get('/reviews/meta', (req, res) => {
  getMetaData(req, res)
    .then(results => {
      res.send(results)
    })
    .catch(err => {
      res.sendStatus(404);
    });
})

app.post('/reviews', (req, res)=> {
  postReview(req, res)
    .then(results => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(400);
    })
});

app.put('/reviews/:reviewId/helpful', (req, res) => {
  markReviewHelpful(req, res)
    .then(results=> {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(404);
    })

});



app.put('/reviews/:reviewId/report', (req, res) => {
  reportReview(req, res)
    .then(results=> {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(404);
    })
}
);

app.get("/loaderio-f736a1b45b6b53e24250a58914dbf631", (req, res) => {
  res.send("loaderio-f736a1b45b6b53e24250a58914dbf631");
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
});

