import express from 'express'
import userRoutes from './routes/userRoutes'
import parkingRouter from './routes/parkingRoutes'
import parkingReservation from './routes/parkingReservationRoutes'
import parkingComments from './routes/parkingCommentsRoutes'
import knex from './db'
import cors from 'cors'

knex.migrate.latest()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(parkingRouter)
app.use(parkingReservation)
app.use(parkingComments)


app.listen(port, () => {
    console.log(`Now listening on port ${port}`)
})

