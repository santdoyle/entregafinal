const jwt = require('jsonwebtoken')

function isAuthenticated(req, resp, next){
   
    const token = req.query.secret_token

    if (token == null) return 'Token null'

    jwt.verify(token, 'top_secret', (err, user) => {
        console.log(err)
        if (err) return 'Error Token'
        req.user = user
        next()
    })
}


module.exports = isAuthenticated