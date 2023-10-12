const mongoose = require("mongoose");
const fdSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  lockerHolder: {
    type: String,
    required: true,
  },
  lockerSize: {
    type: Number,
    required: true,
  },
  lockerNumber: {
    type: String,
    required: true,
  },
  IFSCCode: {
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
const fdmodel = mongoose.model("lockers", fdSchema);

module.exports = fdmodel;
