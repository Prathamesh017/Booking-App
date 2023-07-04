import mongoose from 'mongoose'
const seatSchema = new mongoose.Schema(
  {
    seat_id: {
      type: String,
      required: true,
    },
    seat_identifier: {
      type: String,
      required: true,
    },
    seat_class: {
      type: String,
      required: true,
    },
    is_booked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)
const seatModel = mongoose.model('Seat', seatSchema)
export default seatModel
