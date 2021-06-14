const Pool = require('pg').Pool;
const express = require('express');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser')
const validator = require('validator')

// dummy info
const pool = new Pool({
    user: 'register',
    host: 'localhost',
    database: 'accounts',
    password: 'toor',
    port: '5432',
})


app.use(cors({
        origin: "http://localhost:3000",
    })
)
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req,resp)=>{
    const name = parseInt(req.query.name);
    console.log(name);
    pool.query('select * from users where id = $1',[name],(error,results)=>{
        if(error){
            resp.status(400).send("failed");
        }else{
            console.log(results.rows)
            resp.status(200).send(results.rows);

        }
    });
});

app.post('/registering', (req, resp) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const npi = parseInt(req.body.npi);
    const bAddr = req.body.bAddr;
    const pNumber = req.body.pNumber;
    const email = req.body.mail;
    pool.query('insert into registrationInfo (fName, lName, npi, bAddr, phone, email) values ($1, $2,$3,$4,$5,$6)',[fName,
            lName, npi,bAddr,pNumber,email],(error, results)=>{
        if(error){
            resp.status(400).send("Failed");
        }else{
            resp.status(200).send("Data entered successfully");
        }
    });

});

app.listen(3001);
