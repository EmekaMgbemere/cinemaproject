const company = require('../../models/company')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const routes = function (app) {
    app.post("/company", async (req, res) => {
        try {
           
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    });

}
module.exports = routes;