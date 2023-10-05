const sendMail = require('./sendMail');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const template = fs.readFileSync(
    path.join(__dirname, "../view/longTimeLogin.ejs"),
    "utf8");
//user
const userName="Aditi";
const userEmail="aditi@gmiall.com";
const email="aditipatel26902@gmail.com";
//seccessor
const seccsessorName="Aditi";
const seccsessorEmail="aditi@gmiall.com";
const usernominee=[];




async function notify(){
    const template = fs.readFileSync(
        path.join(__dirname, "../view/longTimeLogin.ejs"),
        "utf8");
    const html = ejs.render(template, { userName,userEmail,usernominee });
    try {
     const result= await sendMail(email, "Warning", "", html);
     console.log(result);
    } catch (error) {
        console.error("Error sending email:", error);  
    }
};
//notify();

async function notifysuccessor(){
    const template = fs.readFileSync(
        path.join(__dirname, "../view/successor.ejs"),
        "utf8");
   const html = ejs.render(template, { seccsessorName,seccsessorEmail});
    try {
     const result= await sendMail(email, "Successor access", "", html);
     console.log(result);
    } catch (error) {
        console.error("Error sending email:", error);  
    }
};
notifysuccessor();

// setInterval(async function () {
//     console.log("mongodb reset");
//     const result = await loginModel.findById("64605c936952931335caeb15");
//     console.log("result in mongodb connection reset :", result);
//   }, 60000);