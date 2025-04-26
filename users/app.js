const cors = require('cors');
require('dotenv').config();
const express = require('express');
const router = require("./routes/userRoutes");
const session = require('express-session');
const passport = require('passport');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./prisma');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore( prisma, { checkPeriod: 2 * 60 * 1000 }        
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/api', router);

app.listen(3000, () => console.log('Backend running on port 3000'));