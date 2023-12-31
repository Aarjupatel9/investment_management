const mongoose = require("mongoose");
const fdSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  idNo: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },

  depositeAccount: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  matuiryDate: {
    type: String,
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

const fdmodel = mongoose.model("mutualfunds", fdSchema);

module.exports = fdmodel;
