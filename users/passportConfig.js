const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const prismaFunction = require('./models/userModel')



passport.use(new LocalStrategy(
  { usernameField: 'email'},
  async (email, password, done) => {
      try {
          const user = await prismaFunction.findUserEmail(email);
          if (!user) {
              return done(null, false, {message: 'No user found' });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return done(null, false, { message: 'Incorrect password'});
          }
          console.log(`Login successful ${user.email}`);
          return done(null, user);
      } catch (err) {
          return done(err);
      }        
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await prismaFunction.getUserInfo(id);
      done(null, user);
  } catch (err) {
      done(err);
  }
});

module.exports = passport;