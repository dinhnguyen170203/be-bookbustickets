
const routes = (app) => {
    
    app.use((req, res, next) => {
        try {
            res.status(404)
            res.json({
                status: "ERR",
                message: "404 NOT FOUND!"
            })
        } catch (error) {
            console.log('error: ', error); 
        }
    })
}

module.exports = routes