const mongoose = require("mongoose");
const fdSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  product: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  QuantityInHand: {
    type: Number,
    required: true,
  },
  QuantitySold: {
    type: Number,
    required: true,
  },
  inventoryValue: {
    type: String,
    required: true,
  },
  salesValue: {
    type: String,
    required: true,
  },
  availabelStokes: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  nominee: [
    {
      name: {
        type: String,
        required: true,
      },
      share: {
        type: Number,
        required: true,
      },
    },
  ],
  document: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
});
const fdmodel = mongoose.model("stokes", fdSchema);

module.exports = fdmodel;
