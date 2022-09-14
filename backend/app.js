import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'
import parkingRouter from './routes/parkingRoutes'
import parkingReservation from './routes/parkingReservationRoutes'
import parkingComments from './routes/parkingCommentsRoutes'
import commonWall from './routes/commonWallRoutes'
import knex from './db'
import cors from 'cors'

knex.migrate.latest()
const app = express()

const port = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
//app.use(express.json())
//app.use(express.urlencoded({extended: true}))
app.use(userRoutes)
app.use(parkingRouter)
app.use(parkingReservation)
app.use(parkingComments)
app.use(commonWall)


app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})

