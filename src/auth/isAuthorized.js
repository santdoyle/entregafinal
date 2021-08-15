const express = require('express')
const passport = require('passport')

function isAuthenticated(req, resp, next){
    if(req.isAuthenticated()){
        
        return next()

    }
    resp.redirect('/login')
}

module.exports = isAuthenticated