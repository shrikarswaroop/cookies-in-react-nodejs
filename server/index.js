var express = require('express')
var cookieParser = require('cookie-parser')
var cors = require('cors')

var app = express()
let names = [];

app.use(cookieParser())

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000'
    }
));

app.get('/content', async (req, res) => {
    if(req.cookies.name===undefined) {
        res.json([true, "Tell me your name and I'll remember you for a minute!"]);
    } else {
        res.json([false, `Hello again ${req.cookies.name}!`]);
    }
})

app.post('/name', async (req, res) => {
    names.push(req.query.name);
    res.json(names.length - 1);
})

app.get('/cookie', async (req, res) => {
    let id = parseInt(req.query.loc);
    cookieContent = names[id];
    names.splice(id, 1);
    res.cookie('name', cookieContent, { maxAge:60000, secure: true });
    res.json(true);
});

app.listen(8080, () => {
    console.log('Server live on port 8080!');
});
