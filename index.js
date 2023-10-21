import express from 'express';
import bodyParser from 'body-parser';
import { Days } from './static.js';
import { Months } from './static.js';
import session from 'express-session';

const port = 3000;
const app = express();
const days = Days();
const months = Months();
const todos = [];
let first = true;  // first load

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'add-todo',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    const d = new Date();
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const date = d.getDate();
    const dates = { day, month, date };
    res.locals = {
        dates, todos
    }   
    // if (first) {
    //     res.cookie('add-todo', false);
    //     first = false;
    // }
    res.render('index.ejs');
});

app.post('/add', (req, res) => {
    const todo = req.body.todo;
    // Kalo todo nggak kosongan (text kosong)
    if (todo.length != 0) {
        todos.push(todo);
        res.cookie('add-todo', true);  // Ubah nilai cookienya jadi 'true' biar bisa jalan animasinya
    }
    // res.locals = { todos, dates };
    // res.render('index.ejs');
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});