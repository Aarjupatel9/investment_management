const mongoose = require("mongoose");
const fdSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  policyNumber: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  agentCode: {
    type: String,
    required: true,
  },
  agentName: {
    type: String,
    required: true,
    index: true,
  },
  planName: {
    type: String,
    required: true,
  },
  planNumber: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  planTerm: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  premiumDate: {
    type: Date,
    required: true,
  },
  lastDate: {
    type: Date,
    required: true,
  },
  sumAssured: {
    type: Number,
    required: true,
  },
  insuranceAmmount: {
    type: Number,
    required: true,
  },

  maturityDate: {
    type: Date,
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

const fdmodel = mongoose.model("lics", fdSchema);

module.exports = fdmodel;
