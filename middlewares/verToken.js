const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookie('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
         const verified = jwt.verify(token, process.env.LOG_TOKEN)
         req.user = verified;
         next()
     } catch (err) {
         res.status(400).send('Invalid Token');
    }
}  

// const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };