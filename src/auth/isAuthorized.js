const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {config} = require('../../config')
const Loggers = require('../utils/logsConfig')

function isAuthenticated(req, resp, next){
    try {
        if (config.JWT_AUTH) {
            const tokenCookie = req.cookies.token

            if (tokenCookie) {

                if (!tokenCookie) return resp.json({ error: 'Necesitas estar logueado.' })
                jwt.verify(tokenCookie, 'secretKey', (err, user) => {
                    if (err) return resp.json({ error: 'Necesitas estar logueado.' })
                    req.user = user
                    next()
                })
            } else {
                return resp.json({ error: 'Necesitas estar logueado.' })
            }
        } else {
            if (req.isAuthenticated()) {

                return next()

            }
            resp.redirect('/login')
        }
       
    } catch (error) {
        Loggers.logError.error('Error durante autenticación' + error)
    }
    
}

module.exports = isAuthenticated