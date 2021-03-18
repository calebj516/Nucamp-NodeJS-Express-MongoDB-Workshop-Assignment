const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
// whenever session authentication is used, we need to serialize and deserialize the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
