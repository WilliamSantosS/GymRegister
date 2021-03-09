const fs = require('fs')
const data = require('../data.json')
const {age , date} = require('../utils')

//INDEX
exports.index = function(req, res ) {
    return res.render("instructors/index", {instructors: data.instructors});
} 
 
//SHOW
exports.show = function(req, res) {
    //req.query.id
    //req.body
    const {id} = req.params
    const foundInstructors = data.instructors.find(function (instructors){
        return instructors.id == id
    })

    if(!foundInstructors) {
        return res.send("Instructor not found")
       }

       const instructor = {
           ...foundInstructors,
           age: age(foundInstructors.birth),
           services: foundInstructors.services.split(";"),
           created_at: new Intl.DateTimeFormat("en-US").format(foundInstructors.created_at),
       }
       return res.render('instructors/show', {instructor: instructor})
}   

//CREATE
exports.create = function(req, res) {
    return res.render('instructors/create')
}

//POST
exports.post = function(req,res) {
     //creating a simple validation 

     //The object.keys is able to return a Object with all the keys of a submit
     const keys = Object.keys(req.body)

     for(key of keys) {
         if(req.body[key] == "") {
             return res.send('please fill all the fields')
         }  
     }

     let { name, avatar_url, birth, gender, services } = req.body;
     //used to convert the date in miliseconds
     birth = Date.parse(req.body.birth)
     //used to return the current date in miliseconds
    let created_at = Date.now()
    const id = Number(data.instructors.length + 1 )
     //used to put the itens in a array
     data.instructors.push({
         id,
         name,
         avatar_url,
         birth,
         gender,
         services,
         created_at
     })

     //used to write in a file what you want
     fs.writeFile("data.json" , JSON.stringify(data, null, 2), function(err) {
            if(err)  return res.send("Something went wrong!")

            return res.redirect("/instructors")
     })
}

//UPDATE
exports.edit = function(req, res) { 
    const {id} = req.params
    const foundInstructors = data.instructors.find(function (instructor){
        return instructor.id == id
    })

    if(!foundInstructors) {
        return res.send("Instructor not found")
       }

       instructor = {
           ...foundInstructors,
           birth: date(foundInstructors.birth).iso
       }

       return res.render('instructors/edit', { instructor })
}

//PUT
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundInstructors = data.instructors.find(function (instructor, foundIndex){
            if(id == instructor.id){ 
                index = foundIndex;
                return true;
            }
    })

    if(!foundInstructors) {
        return res.send("Instructor not found")
       }

      instructor = {
           ...foundInstructors,
           ...req.body,
           birth: Date.parse(req.body.birth),
           id: Number(req.body.id)
       }
        data.instructors[index] = instructor

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if(err) return res.send("Write error")
            
            return res.redirect(`/instructors/${id}`)
        })
}

//DELETE
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null , 2), function(err) {
        if(err) return res.send('Write error')

        return res.redirect("/instructors")
    })
}