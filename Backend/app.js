import express from 'express'
import { nanoid } from 'nanoid'
import cors from 'cors'
import dotenv from 'dotenv'
import DbConnection from './src/config/db.js'
import urlRoutes from './src/routes/shortUrl.route.js'
import { errorHandler } from './src/utils/errorHandler.js'
import { redirectToOriginalUrl } from './src/controllers/shortUrl.controller.js'

dotenv.config('./.env')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: "http://localhost:5173", // your React app
    methods: "GET,POST,PUT,DELETE",
    credentials: "include"
}));

app.use('/api/links', urlRoutes)
app.use('/api/code', urlRoutes)
app.get('/:id', redirectToOriginalUrl)
app.use(errorHandler);

app.listen(3000, () => {
    DbConnection()
    console.log(`App is running on localhost://${3000}`)
})