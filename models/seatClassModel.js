import mongoose from 'mongoose'
const seatClassSchema = new mongoose.Schema(
  {
    seat_class_id: {
      type: Number,
      required: true,
    },
    seat_class: {
      type: String,
      required: true,
    },
    min_price: {
      type: Number,
      required: false,
    },
    max_price: {
      type: Number,
      required: false,
    },
    normal_price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
)
const seatClassModel = mongoose.model('SeatClass', seatClassSchema)
export default seatClassModel
