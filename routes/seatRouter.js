import express from 'express'
import { getSeat, getAllSeats } from '../Controller/seatController.js'
const seatsRouter = express()

seatsRouter.get('/', getAllSeats).get('/:id', getSeat)

export default seatsRouter
