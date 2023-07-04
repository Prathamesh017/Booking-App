import express from 'express'
import colors from 'colors'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/config.js'
import recordRouter from './routes/recordRouter.js'
import seatsRouter from './routes/seatRouter.js'
import bookingRouter from './routes/bookingRouter.js'
import path from 'path'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
await connectDB()

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.get('/', (req, res) => {
  res.render('index')
})
app.use('/record', recordRouter)
app.use('/seats', seatsRouter)
app.use('/booking', bookingRouter)
app.listen(port, () => {
  console.log(`Booking app listening on port ${port}`.yellow)
})
