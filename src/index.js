const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

function parse(s) {
    let arr = []
    let cur = new String();
    for (let i = 0; i < s.length; i++) {
        let obj = { first: false, second: "", third: false };
        if (s[i] == '~') {
            if (s[i - 1] == '-')
                obj.first = true;
            if (s[i - 1] == ':')
                obj.third = true;
            obj.second = cur;
            cur = "";
            arr.push(obj);
        } else {
            cur = cur + s[i];
        }
    }
    return arr;
}

app.set('views', viewsPath);
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express)
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('main', {
        title: 'HELLO'
    })
})

app.get('/Chess', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Chess';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('chess', {
            'data': arr
        })
    })
})

app.get('/Cricket', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Cricket';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('cricket', {
            'data': arr
        })
    })
})

app.get('/Football', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Football';
    exec(str, (err, stdout, stderr) => {
        console.log(stdout)
        let arr = parse(stdout);
        res.render('football', {
            'data': arr
        })
    })
})

app.get('/Basketball', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Basketball';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('basketball', {
            'data': arr
        })
    })
})

app.get('/Carrom', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Carrom';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('carrom', {
            'data': arr
        })
    })
})

app.get('/Hockey', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Hockey';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('hockey', {
            'data': arr
        })
    })
})

app.get('/Marathon', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Marathon';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('marathon', {
            'data': arr
        })
    })
})

app.get('/Swimming', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + 'Swimming';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('swimming', {
            'data': arr
        })
    })
})

app.get('/400m_Race', (req, res) => {
    const str = 'a ' + req.query.numofteams + ' ' + req.query.numofpools + ' ' + req.query.type + ' ' + '400m_Race';
    exec(str, (err, stdout, stderr) => {
        let arr = parse(stdout);
        res.render('race 400m', {
            'data': arr
        })
    })
})

app.listen(port, () => {
    console.log("Server has started on port " + port);
})