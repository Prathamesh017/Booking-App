import bookingModel from '../models/bookingModel.js'
import {
  generateBookingId,
  checkAvailability,
  updateSeatStatus,
} from '../Services/utilities.js'
import sendEmail from '../Config/sendEmail.js'

// @descirption - Create Booking
//@route  api/booking Post
export const createBooking = async (req, res) => {
  try {
    const { seat_ids, name, phone_number, email } = req.body
    if (!(seat_ids && name && phone_number && email)) {
      throw new Error('Please enter seat_ids,name,phone_number  email')
    }
    const booking_id = await generateBookingId()
    const { isAvailable, totalPrice } = await checkAvailability(seat_ids)

    if (!isAvailable) {
      res.status(400).json({
        status: 'Failure',
        message: 'Seats are Booked.Try Different Seats',
      })
      return
    }

    console.log(totalPrice)
    const bookingObj = new bookingModel({
      seat_ids,
      name,
      phone_number,
      booking_id,
      totalPrice,
      email,
    })
    let booking = await bookingObj.save()
    if (booking) {
      await updateSeatStatus(seat_ids)

      await sendEmail(email)
      return res.status(200).json({
        status: 'Success',
        data: {
          seat_ids,
          name,
          phone_number,
          booking_id,
          totalPrice,
          email,
        },
        message: 'Booking SuccessFully',
      })
    }
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ status: 'Failure', message: error.message })
  }
}
// @descirption - Get Booking
//@route  api/booking GET
export const getBooking = async (req, res) => {
  try {
    const id = req.query.userIdentifier || ''
    const bookings = await bookingModel.find({
      $or: [{ phone_number: id }, { email: id }],
    })

    res.status(200).json({
      status: 'Success',
      booking: bookings,
      no_of_bookings: bookings.length,
      message: `All Bookings Made By ${id}`,
    })
  } catch (error) {
    console.log(error.message)
    return res
      .status(400)
      .json({ status: 'Failure', message: "Couldn't Get Booking" })
  }
}
