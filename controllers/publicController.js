const path = require('path');


const PublicController = {
    page404: (req, res, next) => {
        const pathTo404 = path.resolve(_dirname + "/../public/404.html");
        res.sendFile(pathTo404);
    }
};


module.exports = publicController;
