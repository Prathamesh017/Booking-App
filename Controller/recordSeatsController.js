import seatClassModel from '../models/seatClassModel.js'
import seatModel from '../models/seatModel.js'

// @descirption - create seats
//@route  api/seats POST
export const createSeats = async (req, res) => {
  try {
    const { pass } = req.query
    if (pass !== process.env.password) {
      res.status(401).json({
        status: 'Failure',
        message: 'Wrong Password.No Authorization',
      })
      return
    }
    const seats = await seatModel.insertMany(req.body)
    if (!seats) {
      res.status(400).json({
        status: 'Failure',
        message: "Couldn't Create Seats",
      })
      return
    }
    res.status(201).json({
      status: 'Success',
      data: seats,
      message: 'Seats Added Successfully',
    })
  } catch (error) {
    console.log(error.message)
    return res
      .status(400)
      .json({ status: 'Failure', message: "Couldn't Add More Seats" })
  }
}
// @descirption - create seat class
//@route  api/seat-class POST
export const createSeatClass = async (req, res) => {
  try {
    const { pass } = req.query
    if (pass !== process.env.password) {
      res.status(401).json({
        status: 'Failure',
        message: 'Wrong Password.No Authorization',
      })
      return
    }
    const seats = await seatClassModel.insertMany(req.body)
    if (!seats) {
      res.status(400).json({
        status: 'Failure',
        message: "Couldn't Create Seats Classes",
      })
      return
    }
    res.status(201).json({
      status: 'Success',
      data: seats,
      message: 'Seats Classes Added Successfully',
    })
  } catch (error) {
    console.log(error.message)
    return res
      .status(400)
      .json({ status: 'Failure', message: "Couldn't Add Classes" })
  }
}
