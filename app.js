var bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	config = require('./config/config'),
	express = require('express'),
	expressLayouts = require('express-ejs-layouts'),
	expressSession = require('express-session'),
	passport = require('passport'),
	passportConfig = require('./config/passport'),
	passport_mock = require('./passport_mock'),
	stream = require('getstream'),
	routes = require('./routes');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser((secret = 'I like turtles')));
app.use(
	expressSession({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(passport_mock.initialize());
// app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use(express.static(__dirname + '/static'));
app.use('/media', express.static(__dirname + '/media'));


app.get('/userToken', function(req, res) {

const client = stream.connect('9uw4aec6qkym', 'kexftsstxwf8fjvwfgpnjszz8jvnz338yhtry5jwvbx99as35qugwms5x3nn4f4x', '36857');

    let name = req.query.name;
const token = client.feed('user', name).token
	res.send(JSON.stringify({token:token}));


});

app.get('/orderNotificationToken', function(req, res) {

const client = stream.connect('9uw4aec6qkym', 'kexftsstxwf8fjvwfgpnjszz8jvnz338yhtry5jwvbx99as35qugwms5x3nn4f4x', '36857');

    let name = req.query.name;
const token = client.feed('ordernotification', name).token
	res.send(JSON.stringify({token:token}));


});

app.get('/followUser', function(req, res) {
    console.log(req.body);
    pingpp.charges.create({
        subject: req.body.subject,
        body: req.body.body,
        amount: req.body.amount,
        order_no: req.body.order_no,
        channel: req.body.channel,
        currency: "cny",
        client_ip: "127.0.0.1",
        app: { id: "app_jX5abPCu98iLyLGW" }
    }, function(err, charge) {
        console.log(charge);
        console.log(err);
        res.send(JSON.stringify(charge));
    });
});


app.listen(config.get('PORT'));
