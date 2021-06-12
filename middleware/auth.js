const jwt = require('jsonwebtoken')

const authenticate = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1] || ""
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.verified = verify
        console.log("Verification succesful!", verify)
        next()
    } catch (err) {
        console.log("Verification Failed !", err)
        next()
    }

}

module.exports = { authenticate }