const authorizeTransporter = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).send('Permission denied')

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).send('Invalid token!')
        req.transporterPayload = payload
        next()
    })
}

module.exports = authorizeTransporter