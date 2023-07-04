import express from 'express'
import { getBooking, createBooking } from '../Controller/bookingController.js'
const bookingRouter = express()

bookingRouter.get('/', getBooking).post('/', createBooking)

export default bookingRouter
