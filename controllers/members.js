const fs = require('fs')
const data = require('../data.json')
const {date} = require('../utils')

//INDEX
exports.index = function(req, res ) {
    return res.render("members/index", {members: data.members});
} 
 
//CREATE
exports.create = function(req, res ) {
    return res.render('members/create')
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
    
    //used to convert the date in miliseconds
    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastMember = data.members[data.members.length -1]
    
    if(lastMember) {
        id = lastMember.id + 1
    }
    
    data.members.push({
        ...req.body,
        id,
        birth
    })
    
    //used to write in a file what you want
    fs.writeFile("data.json" , JSON.stringify(data, null, 2), function(err) {
        if(err)  return res.send("Something went wrong!")
        
        return res.redirect(`/members/${id}`)
    })
}

//SHOW
exports.show = function(req, res) {
//req.query.id
    //req.body
    const {id} = req.params
    const foundMembers = data.members.find(function (members){
        return members.id == id
    })

    if(!foundMembers) {
        return res.send("Member not found")
       }

       const member = {
           ...foundMembers,
           birth: date(foundMembers.birth).birthDay
       }
       return res.render('members/show', { member })
}   

//UPDATE
exports.edit = function(req, res) { 
    const {id} = req.params
    const foundMembers = data.members.find(function (member){
        return member.id == id
    })
    
    if(!foundMembers) {
        return res.send("Member not found")
    }
    
    member = {
        ...foundMembers,
        birth: date(foundMembers.birth).iso
    }
    
    return res.render('members/edit', { member })
}

//PUT
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0
    const foundMembers = data.members.find(function (member, foundIndex){
        if(id == member.id){ 
            index = foundIndex;
            return true;
        }
    })
    
    if(!foundMembers) {
        return res.send("Member not found")
    }
    
    member = {
        ...foundMembers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.members[index] = member
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error")
        
        return res.redirect(`/members/${id}`)
    })
}

//DELETE
exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })
    
    data.members = filteredMembers
    
    fs.writeFile("data.json", JSON.stringify(data, null , 2), function(err) {
        if(err) return res.send('Write error')
        
        return res.redirect("/members")
    })
}