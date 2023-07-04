import express from 'express'
import {
  createSeatClass,
  createSeats,
} from '../Controller/recordSeatsController.js'
const recordRouter = express()

recordRouter.post('/seat', createSeats).post('/seat-class', createSeatClass)

export default recordRouter
