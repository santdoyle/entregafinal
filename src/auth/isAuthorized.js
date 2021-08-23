const jwt = require('jsonwebtoken')

function isAuthenticated(req, resp, next){
    console.log(req.headers)
    const token = req.query.secret_token
    
    if (token == null || token == 'undefined') return 'Token null'

    jwt.verify(token, 'top_secret', (err, user) => {
        console.log(err)
        if (err) return 'Error Token'
        req.user = user
        next()
    })
}


module.exports = isAuthenticated