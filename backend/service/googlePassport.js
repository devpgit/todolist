const passport = require('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;

passport.use (
    new GoogleStrategy (
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/googleback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('profile:',profile);
            done(null, accessToken);
        }
    )
);