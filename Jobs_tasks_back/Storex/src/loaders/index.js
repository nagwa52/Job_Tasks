module.exports = async function() {
    const db = require('./sequelize')
    await db.authenticate()
    // await db.syncTables()
    const app = require('./express')
    return app
}