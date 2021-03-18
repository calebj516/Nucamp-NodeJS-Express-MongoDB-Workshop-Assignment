const express = require("express");
const Promotion = require("../models/promotion");
const authenticate = require("../authenticate");

const promotionRouter = express.Router();

// Task 2
promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => {
        console.log("Promotion Created ", promotion);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });
// .route("/")
// .all((req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   next();
// })
// .get((req, res) => {
//   res.end("Will send all the promotions to you");
// })
// .post((req, res) => {
//   res.end(
//     `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
//   );
// })
// .put((req, res) => {
//   res.statusCode = 403;
//   res.end("PUT operation not supported on /promotions");
// })
// .delete((req, res) => {
//   res.end("Deleting all promotions");
// });

// Task 1
promotionRouter
  .route("/:promotionId")
  .get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });
// .route("/:promotionId")
// .all((req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   next();
// })
// .get((req, res) => {
//   res.end(
//     `Will send details of the promotion: ${req.params.promotionId} to you`
//   );
// })
// .post((req, res) => {
//   res.statusCode = 403;
//   res.end(
//     `POST operation not supported on /promotions/${req.params.promotionId}`
//   );
// })
// .put((req, res) => {
//   res.write(`Updating the promotion: ${req.params.promotionId}\n`);
//   res.end(`Will update the promotion: ${req.body.name}
//       with description: ${req.body.description}`);
// })
// .delete((req, res) => {
//   res.end(`Deleting promotion: ${req.params.promotionId}`);
// });

module.exports = promotionRouter;
