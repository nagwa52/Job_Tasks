require('./config')

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error)
})

process.on('unhandledException', error => {
    console.error('unhandledException', error)
})


const startServer = async function() {
    const app = await require('./loaders')()
    const relations = require('./models/relations')
    const db = require("./loaders/sequelize")
    await relations(db)
    const port = process.env.PORT || 3000
    app.listen(port, function() {
        console.log(`Server is running on port ${port}`)
    })
    
}
 

startServer()
