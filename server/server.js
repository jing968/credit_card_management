const express=require('express')
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
app.use(express.urlencoded({ extended: true }))
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var mysql = require('mysql');
 
// configuration
var con = mysql.createConnection({
  host: "credit-card.crwutwljafi3.us-east-2.rds.amazonaws.com", 
  user: "admin", 
  password: "adminadmin", 
  database: "stomble_credit_card" 
});
 
// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
});

app.get('/',(req,res)=>{
    res.json('OK');
  })

app.listen(3001,()=>{
    console.log("listening on PORT 3001")
})

// function to check if the card number is valid according to Luhn algorithm 
function checkValidNumber(input){
  if(input === '') return false;
  var sum = 0;
  for(let i = input.length-1; i >= 0; i --){
      if(i%2 != 0){
          sum += parseInt(input.charAt(i));
      }else{
          var doubled = 2* parseInt(input.charAt(i));
          if(doubled >= 10){
              sum += parseInt(doubled / 10);
              sum += parseInt(doubled % 10); 
          }else{
              sum += doubled;
          }
          
      }

  }
  if(sum%10 == 0) return true;
  return false;
}

// given month and year check if it the date is in the past
function expired(m, y){
  var today = new Date();
  var year = today.getFullYear();
  y += 2000;
  if(y > year) return false;
  else if(y < year) return true;
  var month = today.getMonth();
  var converted_m;
  switch(m){
    case 'Jan':
      converted_m = 0;
      break;
    case 'Feb':
      converted_m = 1;
     break;
    case 'Mar':
      converted_m = 2;
     break;   
    case 'Apr':
      converted_m = 3;
      break;
    case 'May':
      converted_m = 4;
      break; 
    case 'Jun':
      converted_m = 5;
      break;
    case 'Jul':
      converted_m = 6;
      break;
    case 'Aug':
      converted_m = 7;
      break; 
    case 'Sep':
      converted_m = 8;
      break; 
    case 'Oct':
      converted_m = 9;
       break; 
    case 'Nov':
      converted_m = 10;
      break;
    case 'Dec': 
      converted_m = 11;
      break; 
  }

  if(converted_m <= month) return true;

  return false;
}


// server side validation to check for valid input
// seen different constraint for cvv hence didn't gurad it with length 3
function validRequest(number,holder,cvv,month,year){
  if(!checkValidNumber(number)) return false;
  if(expired(month,year)) return false;
  if(cvv === '') return false;
  if(number.length < 13) return false;
  if(month === 'MM') return false;
  if(year === 'YY') return false;
  if(holder === '') return false;
  return true;
}
///////////////////////////////////
// Below are endpoints for the server


// testing end point for functionsin this file and other purposes
app.get('/test:payload',(req,res)=>{
  var payload = req.params.payload;
  con.query("SELECT id FROM credit_cards WHERE card_number =?",[payload],function(err,res,fields){
    if(res.length === 0) console.log('no dup')
    else console.log('in db')
  })

})


// card creation end_point
// checks if the card is valid 
// redirects to wallet on success creation
// rediticts to creation page on failure
app.post('/add_new_card',(req,res)=>{
  var number = req.body.number;
  var holder = req.body.holder;
  var cvv = req.body.cvv;
  var month = req.body.month;
  var year = req.body.year;

  console.log('Adding card with number = ' + number + ' ; holder = ' + holder + ' ; cvv = ' + cvv + ' ; month = ' + month + ' ; year = ' + year )
  if(validRequest(number,holder,cvv,month,year)){

    // check if the given card number is a duplicate of a existing card
    con.query("SELECT id FROM credit_cards WHERE card_number =?",[parseInt(number)],function(err,q_res_1,fields){
      if(q_res_1.length === 0){
        var payload = [[parseInt(number) , parseInt(cvv),holder,month,year]]

        con.query("INSERT into credit_cards (card_number,cvv,holder,month,year) VALUES ?",[payload],function(err,q_res_2,fields){

          if(err) throw err;

          console.log('Added successfully');
        });   
        res.redirect('http://localhost:3000/added');
      }else{
        console.log('Card number already in db');
        res.redirect('http://localhost:3000/retry');
      }

    })

  }else{
    console.log('Unvalid details');

    res.redirect('http://localhost:3000/retry');
  }



})


// all cards displaying end point
// only getting id ,card number and expiration dates for display purposes
app.get('/get_cards', (req,res) => {
  console.log('fetching all cards ');
  con.query('SELECT id, card_number , month, year FROM credit_cards',function(err,data,fields){
        
    if(err) throw err;
    if(data.length !== 0){
      console.log(data);
      res.send(data);
    }else{
      res.send({result: "no_cards"});
    }
  });

})

// card look up end points
// return details of a credit card for a given card id
app.get('/lookup=:id',(req,res) => {
  var id = req.params.id;
  console.log(`Getting details for credit card with id = ${id}`);

  con.query('SELECT card_number, cvv, holder, month, year FROM credit_cards where id = ?', [id] , function(err,data,fields){

    if(err) throw err;

    if(data.length !== 0){
      console.log("found")
      console.log(data);
      res.send(data);
    }else{
      console.log("no match was found")
      res.send({no_match: true});
    }
  });

})

// remove card end point
// given a card id remove it from the data base
app.get('/delete=:id',(req,res) => {
  var id = req.params.id;
  console.log(`Removing credit card with id = ${id}`);
  var respond;
  con.query('DELETE from credit_cards WHERE id = ?', [id] , function(err,res,fields){
    if(err) throw err;
    respond = res;
  });
  res.send({result: respond});
})

// update card end point
// given card detials and card it update accordingly
app.post('/update',(req,res)=>{
  var id = parseInt(req.body.id);
  var number = req.body.number;
  var holder = req.body.holder;
  var cvv = req.body.cvv;
  var month = req.body.month;
  var year = req.body.year;
  console.log(`Updating credit card details with card id = ${id}`);
  if(validRequest(number,holder,cvv,month,year)){
    
    var payload = [parseInt(number) , parseInt(cvv),holder,month,year,id]
    console.log(payload)
    con.query("UPDATE credit_cards SET card_number = ?, cvv = ?, holder =?, month = ? ,year = ? WHERE id = ?",payload,function(err,res,fields){

			if(err) throw err;

			console.log(res);
		});   

    console.log('Updated')

    res.redirect('http://localhost:3000/updated');
  }else{
    console.log('Failed to update, nothing was changed')
    res.redirect('http://localhost:3000/edit=3');
  }
})

