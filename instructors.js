const fs = require('fs')
const data = require('./data.json')

//CREATE
exports.post = function(req,res) {
     //creating a simple validation 

     //The object.keys is able to return a Object with all the keys of a submit
     const keys = Object.keys(req.body)

     for(key of keys) {
         if(req.body[key] == "") {
             return res.send('please fill all the fields')
         }  
     }

     //used to convert the date in miliseconds
     req.body.birth = Date.parse(req.body.birth)
     //used to return the current date in miliseconds
     req.body.created_at = Date.now()
     //used to put the itens in a array
     data.instructors.push(req.body)

     //used to write in a file what you want
     fs.writeFile("data.json" , JSON.stringify(data, null, 2), function(err) {
            if(err)  return res.send("Something went wrong!")

            return res.redirect("/instructors")
     })
}
//UPDATE

//DELETE