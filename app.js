var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://bhakti:1234@ds257848.mlab.com:57848/thinkfuldb');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
// var about = require('./routes/aboutus');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

var activitySchema = mongoose.Schema({
  name:String,
  icon: String,
  schedule:String,
  days:[],
  weeklyFrequency : String,
  monthlyFrequency : String,
  dayTime:[],
  username:String

},
{
  timestamps:true
})


var Activity = mongoose.model("Activity" , activitySchema , "activity");




//getting all the activies from the database
app.get('/myActivities/:user' , function(req,res)
{
  console.log(req.params.user);
  Activity.find({username:req.params.user} , function(err , data)
    {
      if(err)
      {
        console.log(err);
      }

      res.json(data);
    });
})
app.post('/newActivity',function(req,res)
{
  console.log(req.body);
  var activity = new Activity(req.body);
  activity.save(function(err, document)
  {
    if(err){
      console.log(err);
    }

  req.flash('success_msg', 'New activity added');
    res.status(201).json(document);
  })
  
})

app.delete('/activity/:id', (req, res) => {
  console.log(req.params);
  Activity
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(202).json({message:"Item deleted"}).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

app.get('/activity/:id', (req, res) => {
  console.log(req.params);
  Activity
    .findById(req.params.id , function(err , doc)
    {
      console.log(doc);
      res.status(200).json(doc).end()
      
    })
   
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

app.put('/activity/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params);

  Activity
    .findByIdAndUpdate(req.params.id ,req.body , function(err , doc)
    {
      console.log(doc);
      
      
    })
   res.status(200);
   
});



app.use('/', routes);
app.use('/users', users);
// app.use('/AboutUs', about);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});


module.exports = app