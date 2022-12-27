import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'reflect-metadata'
import configurations from './src/config/configurations'
import countryRouter from './src/routes/countries.routes'
import appRoutes from './src/routes/app.routes'
import universityRoutes from './src/routes/university.routes'

const app = express()
app.use(cors({ origin: true, credentials: true }))

// create a rotating write stream
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))

const config = configurations()

app.use('/api/countries', countryRouter)
app.use('/', appRoutes)
app.use('/api/universities', universityRoutes)

app.listen(config.port, () => {
	console.log(`Server running on PORT: ${config.port}`)
})
