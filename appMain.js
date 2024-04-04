const express = require('express'); 
const port = 7410; 
const mysql = require('mysql2'); 
const app = express(); 
 
app.use(express.json()); 
app.use(express.urlencoded()); 
 
const connection = mysql.createConnection({ 
    host : 'localhost', 
    user : 'root', 
    password : 'Admin@123', 
    database : 'user_sql' 
}); 
 
connection.connect(() => { 
    console.log('Mysql is connected'); 
}); 
 
app.get('/',(req,res) => { 
    res.send('welcome to express.js'); 
}); 
 
app.post('/api/user',(req,res) => { 
    const {firstName,lastName,email,password,mobileNo} = req.body; 
 
    let user = { 
        firstName,lastName,email,password,mobileNo 
    }; 
 
    connection.query('insert into user set ?',user, (err,data) => { 
        if(err)  
            res.json(err); 
         
        else  
            res.json({data, message : 'User added successfully'}); 
         
    }); 
}); 
 
app.get('/api/user',(req,res) => { 
    connection.query('select * from user',(err,data) => { 
        if(err)  
            res.json(err); 
         
        else  
            res.json(data); 
         
    }); 
}); 
 
app.get('/api/get-user',(req,res) => { 
    let Id = req.query.Id;
    console.log(Id); 
    connection.query('select * from user where firstName = ' + `"${Id}"`,(err,data) => { 
        if(err)  
            res.json(err) 
        else  
            res.json(data); 
         
    }); 
}); 
 
app.listen(7410, () => { 
    console.log('Server start at http://localhost:7410'); 
});