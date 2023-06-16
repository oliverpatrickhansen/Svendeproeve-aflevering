const mongoose = require("mongoose");

const caseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      unique: true,
      required: [true, "Please add a title"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    firstDescription: {
      type: String,
      required: [true, "Please add a description"],
    },
    secondDescription: {
      type: String,
      required: [true, "Please add a description"],
    },
    thirdDescription: {
      type: String,
      required: [true, "Please add a description"],
    },
    rooms: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    availableFrom: {
      type: String,
    },
    deposit: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    prepaidRent: {
      type: Number,
      required: true,
    },
    isAconto: {
      type: Boolean,
    },
    heatPrice: {
      type: Number,
      required: true,
    },
    waterPrice: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    petsAllowed: {
      type: Boolean,
    },
    elevatorAvailable: {
      type: Boolean,
    },
    balcony: {
      type: Boolean,
    },
    isReserved: {
      type: Boolean,
    },
    image: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Case", caseSchema);
