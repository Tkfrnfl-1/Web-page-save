const express =require('express')
const app= express()
const morgan= require('morgan')
const mysql= require("mysql");
//const utf8= require('utf8')
let moment =require('moment')


//const path= require('path')

/*var http= require('http'),
	fs=require('fs');*/
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('/home/ubuntu/save/pub'))
app.use(express.static('/home/ubuntu/save/pubb'))
app.use(morgan('short'))


function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'info',
    password: 'Han456852*',
  //  port:"3000",	  
  })
	if(err){
		console.log("Fail"+err)
		return
	}

}



app.post('/user_create', (req, res) => {//getting username
  console.log("Trying to create a new user...")
  console.log("How do we get the form data???")

  console.log("name: " + req.body.create_first_name)
  const fname = req.body.create_first_name

   // fname =JSON.parse(JSON.stringify(fname))

 var startTime = moment('03:00 pm', "HH:mm a")
 var endTime = moment('11:59 pm', "HH:mm a")
 var currentTime = moment()



if (currentTime.hour()>=6) //server time limit
	{
  const queryString = "INSERT INTO topic (name,created) VALUES (?,Now())"
  getConnection().query(queryString, [fname], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with an id: ", results.insertId);
	res.send('<script type="text/javascrpit"> alert("등록성공");</script><a href="javascript:history.back()" class="btn btn-primary">Back</a> ');


  })
	}
	else
	{
	console.log("server is not running now")
	res.send('<script type="text/javascript">alert("서버가 닫혀있어요");</script>');
	}
		//.listen(3000);
})

app.post('/user', (req, res) =>{
	console.log("fetching id:" + req.params.id)

	const connection =mysql.createConnection({
		host:'localhost',
		user:'root',
		database:'info',
		password:'Han456852*'
	})
        const first=(req.body.create_first_name)-1;
	const last = req.body.create_last_name

var dateA=new Date(2020,first,last,00,00,00)
var dateB=new Date(2020,first,last,23,59,50)
	
	console.log(dateA)

        const queryString= "select * from topic where created between ? and ?" 
	connection.query(queryString,[dateA,dateB],(err, rows, fields) =>{
		
	if (err) {
      	console.log("Failed to query for users: " + err)
      	res.sendStatus(500)
      	return
   	 }
    		res.json(rows)
		
	})


})
app.set('port',process.env.PORT || 9000);

app.listen(9000,() =>{
        console.log("server running!");
})

