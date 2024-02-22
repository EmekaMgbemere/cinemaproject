const BookingId = require('../../models/BookingId')


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