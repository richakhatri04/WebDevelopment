const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const nodemailer = require('nodemailer');
const path = require('path');  
// Passport Config
require('./passport')(passport);

const petsRoutes = require('./api/routes/pets');
const userRoutes = require('./api/routes/user');
const productsRoutes = require('./api/routes/products');
const EventsRoutes = require('./api/routes/event');
const adoptRoutes = require('./api/routes/adoption');
const feedbackRoutes = require('./api/routes/feedback');
const orderRoutes = require('./api/routes/order');
const shoppingCartRoutes = require('./api/routes/shoppingcart');
const blogsRoutes = require('./api/routes/blogs');
const storiesRoutes = require('./api/routes/stories');
const donationRoutes=require('./api/routes/donation');

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if(req.method === 'OPTIONS'){
          res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE');
          return res.status(200).json({}); 
      }
      next();
});


app.use('/api/pets', petsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/adoption', adoptRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/shoppingcart',shoppingCartRoutes);
app.use('/api/event', EventsRoutes); // Adding Event Routing reference
app.use('/api/feedback',feedbackRoutes);
app.use('/api/blogs',blogsRoutes); 
app.use('/api/stories',storiesRoutes); 
app.use('/api/donation', donationRoutes); //Adding Donation Route

mongoose.connect('mongodb+srv://strayspirit:' + process.env.MONGO_ATLAS_PW + '@strayspirit-bsghz.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
