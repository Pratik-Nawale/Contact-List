const exp = require("constants");
const express = require("express");
const { expr } = require("jquery");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose")
const Contact = require("./models/contact")

const  app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// // middleware 1
// app.use(function(req, res, next){
//     req.myName = "Pratik";
//     next();
// });

// // middleware 2
// app.use(function(req, res, next){
//     console.log("My name from middleware 1 -> ",req.myName);
//     next();
// })

// var contactList = [
//     {
//         name: "Contact-1",
//         phone: "1234567890"
//     },
//     {
//         name: "Contact-2",
//         phone: "1234567890"
//     },
//     {
//         name: "Contact-3",
//         phone: "1234567890"
//     }
// ]

app.get("/", function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }

        return res.render("home", {
            title: "My Contact List",
            contact_list: contacts
        });
    });

    // return res.render("home", {
    //     title: "My Contact List",
    //     contact_list: contactList
    // });
});

app.get("/pratice", function(req, res){
    return res.render("pratice", {
        title: "Let's play with ejs"
    });
});

// app.get("/delete-contact/:phone", function(req, res){
//     console.log(req.params);
//     let phone = req.params.phone;
// })

// app.get("/delete-contact", function(req, res){
//     // console.log(req.query);
//     // let phone = req.query.phone;
//     // // let name = req.query.name;

//     // let contactIndex = contactList.findIndex(contact => contact.phone === phone);
//     // // console.log(contactIndex);

//     // if(contactIndex != -1){
//     //     contactList.splice(contactIndex, 1);
//     // }
// }
// })

//? for deleting a contact
app.get("/delete-contact", function(req, res){
    //?  get the id from query in the url
    // let phone = req.query.phone;
    let id = req.query.id;

    // let contactIndex = contactList.findIndex(contact => contact.phone === phone);

    // if(contactIndex !== -1) {

    //     contactList.splice(contactIndex,1);
    // }

    // ? find the contact in the databse using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting an object from database");
            return;
        }
        return res.redirect("back");
    });

    // return res.redirect("back");
});



app.post("/create-contact", function(req, res){
    // return res.redirect("/pratice")
    // console.log(req.body);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log("error in creating a contact!");
            return;
        }
        console.log("**********", newContact);
        return res.redirect("back")
    })

    // return res.redirect("back");
});

app.listen(port, function(err){
    if(err){
        console.log("Error in running the server ", err);
    }
    
    console.log("Yup! my express server is running on port: ", port);

});


/*

STEPS FOR USING EJS:

1. Install ejs
2. app.set -> view engine
           -> view path
3. view directory + file
4. render -> res.render (home.ejs not home.html)

*/
