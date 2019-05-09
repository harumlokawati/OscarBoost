let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 7001

let pool = new pg.Pool({
    port: 5432,
    database: 'oscarboost',
    host: 'localhost',
    user: 'postgres',
    password: ''
})


pool.connect((err, db, done) => {
    if (err) {
        return console.log(err);
    } else {
        db.query('SELECT DISTINCT title FROM weekly_gross LIMIT 5', (err, table) => {
            if (err) {
                return console.log(err)
            } else {
                console.log(table)
            }
        })
    }
})

let app = express();
app.disable('etag');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getmovielist', function (req, res) {
    var year_start = req.query.year_start
    var year_end = req.query.year_end
    var week_start = req.query.week_start
    var week_end = req.query.week_end
    var nominated = req.query.nominated
    var won = req.query.won
    var query = ''
    var values = []
    if (nominated && won) {
        query = 'SELECT DISTINCT title as value, title as label FROM weekly_gross WHERE (year_starting*100+week_number)>=$1 AND (year_starting*100+week_number)<=$2 AND is_nominated=$3 AND is_awarded=$4';
        values = [Number(year_start) * 100 + Number(week_start), Number(year_end) * 100 + Number(week_end), nominated, won];
    } else if (nominated) {
        query = 'SELECT DISTINCT title as value, title as label FROM weekly_gross WHERE (year_starting*100+week_number)>=$1 AND (year_starting*100+week_number)<=$2 AND is_nominated=$3';
        values = [Number(year_start) * 100 + Number(week_start), Number(year_end) * 100 + Number(week_end), nominated];
    } else if (won) {
        query = 'SELECT DISTINCT title as value, title as label FROM weekly_gross WHERE (year_starting*100+week_number)>=$1 AND (year_starting*100+week_number)<=$2 AND is_awarded=$3';
        values = [Number(year_start) * 100 + Number(week_start), Number(year_end) * 100 + Number(week_end), won];
    } else {
        query = 'SELECT DISTINCT title as value, title as label FROM weekly_gross WHERE (year_starting*100+week_number)>=$1 AND (year_starting*100+week_number)<=$2';
        values = [Number(year_start) * 100 + Number(week_start), Number(year_end) * 100 + Number(week_end)];
    }

    pool.connect(function (err, db, done) {
        if (err) {
            return res.status(400).send(err)
        } else {
            db.query(query, values, (err, table) => {
                done();
                if (err) {
                    return res.status(400).send(err)
                } else {
                    res.status(200).send(table.rows)
                }
            })
        }
    })
})
app.post('/postmoviegross', function (req, res) {
    var year_start = req.body.year_start;
    var year_end = req.body.year_end;
    var week_start = req.body.week_start;
    var week_end = req.body.week_end;
    var movies = req.body.movies;
    // var y = year_start
    // var years = []
    // if(year_start==year_end){
    //
    // }
    // do {
    //     title_q += `title='`+movies[i].value.split("'").join("''")+`'`
    //     i++;
    //     if(i < movies.length) {
    //         title_q += ' OR '
    //     }
    // }
    // while (y = year_end);
    var title_q = `(`;
    var i = 0;
    do {
        title_q += `title='` + movies[i].value.split("'").join("''") + `'`
        i++;
        if (i < movies.length) {
            title_q += ' OR '
        }
    }
    while (i < movies.length);
    title_q += `)`
    var values = [Number(year_start) * 100 + Number(week_start), Number(year_end) * 100 + Number(week_end), title_q];
    var query = `SELECT * FROM weekly_gross WHERE (year_starting*100+week_number)>=` + values[0] + ` AND (year_starting*100+week_number)<=` + values[1] + ` AND ` + title_q + ` ORDER BY year_starting,week_number,title`
    console.log(query)
    pool.connect(function (err, db, done) {
        if (err) {
            return res.status(400).send(err)
        } else {
            db.query(query, (err, table) => {
                done();
                if (err) {
                    return res.status(400).send(err)
                } else {
                    res.status(200).send(process(table.rows, movies))
                }
            })
        }
    })
})

function process(rows, movies) {
    let result = new Map
    for (i in rows) {
        let attr = {}
        for (m in movies) {
            attr[movies[m].value] = null
        }
        attr["year_starting"] = rows[i]['year_starting']
        attr["week_number"] = rows[i]["week_number"]
        attr["axis"] = rows[i]['year_starting'] + "/" + rows[i]["week_number"]
        result.set((rows[i]['year_starting'] * 100 + rows[i]["week_number"]), attr);
    }
    for (i in rows) {
        let attr = result.get(rows[i]['year_starting'] * 100 + rows[i]["week_number"])
        attr[rows[i]["title"]] = rows[i]["weekly_gross"]
        result.set(rows[i]['year_starting'] * 100 + rows[i]["week_number"], attr)
    }
    console.log(Array.from(result.values()))
    return Array.from(result.values());
}

app.listen(PORT, () => console.log('listening to post ' + PORT))