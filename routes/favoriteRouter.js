const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require("./cors");
const favoriteRouter = express.Router();

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorite.find({ user: req.user._id })
            .populate("user")
            .populate("campsite")
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then((favorite) => {
                if (favorite) {
                    req.body.forEach((campsite) => {
                        if (!favorite.campsites.includes(campsite._id)) {
                            favorite.campsites.push(campsite._id);
                        }
                    });
                    favorite
                        .save()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(favorite);
                        })
                        .catch((err) => next(err));
                } else {
                    Favorite.create({ user: req.user._id, campsites: req.body })
                        .then((favorite) => {
                            console.log("Favorite Created " + favorite);
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(favorite);
                        })
                        .catch((err) => next(err));
                }
            })
            .catch((err) => next(err));
  })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete (cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      Favorite.findOneAndDelete({ user: req.user._id })
          .then((response) => {
            res.statusCode = 200;
              if (favorite) {
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              } else {
                  res.setHeader("Content-Type", "text/plain");
                  res.end("You do not have any favorites to delete");
            }
        })
        .catch((err) => next(err));
  });

favoriteRouter
    .route("/:campsiteId")
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, authenticate.verifyUser,  (req, res, next) => {})
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorite.findOne({ user: req.user._id })
            .then((favorite) => {
                if(favorite)
            
        })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {});
    .delete (cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {});

module.exports = favoriteRouter;
