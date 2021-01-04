const express = require('express');
const app = express();

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://brettr:open@book-cls1-shard-00-00-4e4iz.mongodb.net:27017,book-cls1-shard-00-01-4e4iz.mongodb.net:27017,book-cls1-shard-00-02-4e4iz.mongodb.net:27017/test?ssl=true&replicaSet=book-cls1-shard-0&authSource=admin'
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    console.log('header-interceptor: Start setting headers.')
	res.header("Access-Control-Allow-Origin" , "*");
	res.header(
		"Access-Control-Allow-Headers", "*"
	);
	if(req.method === 'OPTIONS'){
        console.log('header-interceptor: ===OPTIONS.')
		var headers = {};
		headers["Access-Control-Allow-Methods"] = "POST, PATCH ,GET, PUT, DELETE, OPTIONS";
		res.writeHead(200, headers);
		res.end();
        console.log('header-interceptor: Headers set.')
	}
    next();
})

app.use('/user', userRoutes);
app.use('/books', bookRoutes);

app.use((req,res,next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    console.log('header-interceptor: error 500.')
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;