var express = require('express');
var app = express();

var http = require('http').Server(app);
var request = require('request');


const port = 8001;

http.listen(port, function () {
    console.log('app listening on port ' + port);
});


const LoggerMiddlewareUser = (req, res, next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
    //update last active
    next();
}

// application level middleware
app.use(LoggerMiddlewareUser);


app.get('/', function (req, res) {
    res.send("hello word");
});

app.post('/charge', function (req, res) {
    var body2 = req.body;

    var is_prod = "0"; // prod =1, sanbox=0
    var server_key;
    var urlgoto;
    if (is_prod === "0") {
        server_key = Buffer.from('SB-Mid-server_YOUR_SANBOX_KEY').toString('base64')
        urlgoto = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    } else {
        server_key = Buffer.from('Mid-server-YOUR_PROD_KEY').toString('base64')
        urlgoto = 'https://app.midtrans.com/snap/v1/transactions';
    }

    // Set the headers
    var headers = {
        'User-Agent': 'Secret Agent/0.0.1',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + server_key
    }

    // Configure the request
    var options = {
        url: urlgoto,    // sandbox
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body2)

    }

    // console.log('server key : ' + server_key );
    console.log('sent header : ' + JSON.stringify(headers));

    // Start the request
    request(options, function (error, response, body) {
        if (!error) {
            // Print out the response body
            console.log('success');
            console.log(body);
            res.send(body);
        } else {
            console.log('response' + body);
            console.log('response' + error);
            console.log('response' + response);
        }
    })
});