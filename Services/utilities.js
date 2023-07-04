import seatModel from '../models/seatModel.js'
import seatClassModel from '../models/seatClassModel.js'
import bookingModel from '../models/bookingModel.js'

//get booking percentage
export const getBookedPercentage = async (seat_class) => {
  try {
    const allSeats = await seatModel.find({ seat_class })
    const totalSeats = allSeats.length
    const bookedSeats = allSeats.filter((seat) => {
      return seat.is_booked
    }).length

    return (bookedSeats * 100) / totalSeats
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

//get price according to availabitlity
export const getPrice = async (seat_class) => {
  let price = 0
  try {
    const booked_percentage = await getBookedPercentage(seat_class)
    const seatClassDetails = await seatClassModel.find({ seat_class })
    if (booked_percentage < 40) {
      price = seatClassDetails[0].min_price || seatClassDetails[0].normal_price
    } else if (booked_percentage >= 40 && booked_percentage <= 60) {
      price = seatClassDetails[0].normal_price || seatClassDetails[0].max_price
    } else if (booked_percentage > 60) {
      price = seatClassDetails[0].max_price || seatClassDetails[0].normal_price
    }
    return price
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

//geneate a new bookingId
export const generateBookingId = async () => {
  try {
    const bookings = (await bookingModel.find({})).length + 1
    const paddedCounter = String(bookings).padStart(4, '0')
    return `BO-${paddedCounter}`
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const checkAvailability = async (seatIdsArray) => {
  let totalPrice = 0
  try {
    const allSeats = await seatModel.find({
      seat_id: {
        $in: seatIdsArray,
      },
    })

    if (allSeats.length === 0) {
      throw Error('No Seats with these seat_ids exist')
    }

    const isAvailable = allSeats.every((seat) => {
      return seat.is_booked === false
    })

    for (const seat of allSeats) {
      totalPrice += await getPrice(seat.seat_class)
    }

    totalPrice = +totalPrice.toFixed(2)

    return { isAvailable, totalPrice }
  } catch (error) {
    throw new Error(error)
  }
}

export const updateSeatStatus = async (seatIdsArray) => {
  try {
    const result = await seatModel.updateMany(
      {
        seat_id: { $in: seatIdsArray },
      },
      {
        $set: {
          is_booked: true,
        },
      },
    )
    return result
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
