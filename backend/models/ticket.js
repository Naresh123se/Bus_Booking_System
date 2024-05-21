import mongoose from "mongoose";
// Define a schema for the ticket data
const ticketSchema = new mongoose.Schema({
  SchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seat: {
    type: [Number],
    required: true,
  },
  customer: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
    },
  ],
  contact: {
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  ticketNum: {
    type: String,
    required: true,
  },

  finalprice: {
    totalPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },

  count: {
    type: Number,
    required: true,
  },
  BusName: {
    type: String,
    required: true,
  },
  BusNumber: {
    type: Number,
    required: true,
  },
});

// Create a Ticket model using the ticketSchema
const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
