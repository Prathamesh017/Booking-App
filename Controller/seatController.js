import seatClassModel from '../models/seatClassModel.js'
import seatModel from '../models/seatModel.js'
import { getPrice } from '../Services/utilities.js'

// @descirption - get seats
//@route  api/seats GET
export const getAllSeats = async (req, res) => {
  try {
    //finding all seats and sorting them based on seat_class
    const allSeats = await seatModel.find({}).sort({
      seat_class: '1',
    })
    if (!allSeats) {
      res.status(400).json({
        status: 'Failure',
        message: "Couldn't find Any Seat",
      })
      return
    }
    res.status(200).json({
      status: 'Success',
      data: allSeats,
      message: 'All Seats Ordered According to Seat Class',
    })
  } catch (error) {
    console.log(error.message)
    return res
      .status(400)
      .json({ status: 'Failure', message: "Couldn't Get Seats" })
  }
}

// @descirption - get a particular  seat
//@route  api/seats/id  GET
export const getSeat = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      throw new Error('Please Provide Seat_ID')
    }
    const seatArr = await seatModel.find({
      $or: [{ seat_identifier: id }, { seat_id: id }],
    })
    if (seatArr.length == 0) {
      throw new Error("Seat Doesn't Exist")
    }
    const { seat_id, seat_identifier, seat_class, is_booked } = seatArr[0]
    const price = await getPrice(seat_class)

    const total = await res.status(200).json({
      status: 'Success',
      seat: {
        seat_class,
        seat_id,
        seat_identifier,
        seat_class,
        is_booked,
        price,
      },
      message: 'Seat Details',
    })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ status: 'Failure', message: error.message })
  }
}
