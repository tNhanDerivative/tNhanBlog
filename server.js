const express = require('express');
const app = express();


const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const USER = require('./model/user');
const authRoute = require('./route/authRoute');
const taskRoute = require('./route/taskRoute');
const {checkUser, requireAuth} = require('./middleware/authMiddleware')

let PORT = process.env.PORT || 3000;

//register view engine
app.set('view engine', 'ejs'); 
// don't need to specified the folder becuz views is the default folder
// app.set('views','views');

const dbURI = 'mongodb+srv://USER:test123@testexpress.v6c7j.mongodb.net/USER?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log('conect to db');
})
.catch(err => console.log(err));

app.listen(PORT);


app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use('*', checkUser);


app.get('/', (req, res) => {
    res.render('homepage');  
});

//Authorization handler
app.use(authRoute);



app.use('/allTask', requireAuth, taskRoute);

app.get('/about', (request, response) => {
    response.render('about');
});

app.get('/calPrice', (request, response) => {
    response.render('calPrice');
});


app.use((request, response) => {
    response.render('404');
    // response.status(404).sendFile('./views/404.html',{root: __dirname});    
});