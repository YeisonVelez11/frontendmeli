
const { AUTHOR } = require("../utils/constants");
let checkAuthor = (req, res, next) => {
    if (req.headers.author_name == AUTHOR.name && req.headers.author_lastname == AUTHOR.lastname) {
        next();
    }
    else {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Usuario no autorizado",
            },
        });
    }
};
module.exports = {
    checkAuthor
};
