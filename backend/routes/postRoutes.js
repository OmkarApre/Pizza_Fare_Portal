const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const jwt=require("jsonwebtoken");
const jwtSecret="wewr32vsdfgswfwr2343ert";
// const fs=require('fs')
//dbconnection 
const db = "mongodb://localhost:27017/pizza";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message);
    }
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "",
      pass: "",
    },
  });
connectDB();
//end
const displaymodel = require('../db/displaySchema')
const ordersmodel = require('../db/OrdersSchema')
const registermodel= require('../db/RegisterSchema')
function autenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}
router.post("/adduser",(req,res)=>{
    // console.log(req.body)
    let ins = new registermodel({ name: req.body.name, mobile: req.body.mobile,email:req.body.email,password:req.body.password });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
})
// router.get("/verify",(req,res)=>{
//     registermodel.find({}, (err, data) => {
//         if (err) throw err;
//         res.json({ 'data': data })
//     })
    
// })


router.post("/login",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    registermodel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            let payload={
                uid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})
router.get("/fetchpost",autenticateToken,(req, res) => {
    displaymodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ "err":0,'data': data })
    })

})

router.get("/fetchorders",autenticateToken, (req, res) => {
    ordersmodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ "err":0,'data': data })
    })

})
router.post("/addorder", (req, res) => {
    //    console.log()
    // console.log("post called")

    //     console.log(`add post called `);
    console.log(req.body.cart)
    let name = [];
    let price=0;
    for (let i = 0; i < req.body.cart.length; i++) {
             price=price+req.body.cart[i].price;
        if (i != (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name + ",")
            

        }
        else if (i = (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name)
           
        }



    }
    let ins = new ordersmodel({ name: name, card: req.body.card,price:price,user:req.body.user });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
    const mailOptions = {
        from: "",
        to: "",
        subject: "Order Placed!",
        text: `Your order has been placed succesfully! Here are the details`,
        html: `<!DOCTYPE html>
        <html>
        <head>
        <style>
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        
        }
        </style>
        </head>
        <body>
        <img height="300px" src="https://img.pikbest.com/templates/20210702/bg/afef52061728b8e025a03da8b940ccbe_42575.png!bw340"/>
        <h1 className="text-success">Your Order Placed Successfully.</h1>
        
        <table style="width:45%">
        <tr>
        <th>Ordered Items</th>
        <th>Total Price</th>
        </tr>
          <tr>
          <td>${name}</td>
          <td>Rs. ${price}</td>
        </tr>
          
        </table>
        </body>
        </html> `
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent");
        }
      });


})



module.exports = router;