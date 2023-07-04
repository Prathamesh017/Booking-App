import mongoose from 'mongoose'
const bookingSchema = new mongoose.Schema(
  {
    booking_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    seat_ids: {
      type: [String],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
const bookingModel = mongoose.model('booking', bookingSchema)
export default bookingModel
