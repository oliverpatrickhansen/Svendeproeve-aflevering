const asyncHandler = require("express-async-handler");
const Case = require("../models/caseModel");
const User = require("../models/userModel");

// @desc    Get user cases
// @route   GET /api/cases
// @access  Private
const getUserCases = asyncHandler(async (req, res) => {
  const cases = await Case.find({ user: req.user.id });

  res.status(200).json(cases);
});


// @desc    Get case
// @route   GET /api/cases/:id
// @access  Public
const getCase = asyncHandler(async (req, res) => {
  const _case = await Case.findById(req.params.id);

  if(!_case){
    res.status(404).json({ msg: "Case not found" });
  }

  res.status(200).json(_case);
});

// @desc    Get all cases
// @route   GET /api/cases/all
// @access  Public
const getAllCases = asyncHandler(async (req, res) => {
  const allCases = await Case.find();
  res.status(200).json(allCases);
});

// @desc    Post a case
// @route   POST /api/cases
// @access  Private(Admin)
const postCase = asyncHandler(async (req, res) => {

  if (
    !req.body.title ||
    !req.body.address ||
    !req.body.city ||
    !req.body.firstDescription ||
    !req.body.secondDescription ||
    !req.body.thirdDescription ||
    !req.body.rooms ||
    !req.body.size ||
    !req.body.availableFrom ||
    !req.body.deposit ||
    !req.body.rent ||
    !req.body.prepaidRent ||
    !req.body.heatPrice ||
    !req.body.waterPrice ||
    !req.body.longitude ||
    !req.body.latitude
  ) {
    res.status(400);
    console.log("Something went wrong");
    throw new Error("Please don't leave fields empty");
  }
  // if (title == req.body.title) {
  //   res.status(400);
  //   throw new Error("Case title alread exists. Please use a unique title");
  // }
  // _ is added onto case variable name because case isn't allowed alone.

  if(req.user.role == 'Admin'){
    const _case = await Case.create({
      title: req.body.title,
      address: req.body.address,
      city: req.body.city,
      firstDescription: req.body.firstDescription,
      secondDescription: req.body.secondDescription,
      thirdDescription: req.body.thirdDescription,
      rooms: req.body.rooms,
      size: req.body.size,
      availableFrom: req.body.availableFrom,
      deposit: req.body.deposit,
      rent: req.body.rent,
      prepaidRent: req.body.prepaidRent,
      isAconto: req.body.isAconto,
      heatPrice: req.body.heatPrice,
      waterPrice: req.body.waterPrice,
      petsAllowed: req.body.petsAllowed,
      elevatorAvailable: req.body.elevatorAvailable,
      balcony: req.body.balcony,
      isReserved: req.body.isReserved,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      user: req.user.id,
      image: req.body.image,
    });
    res.status(200).json(_case);
  }
  else {
    res.status(401);
    throw new Error("User not authorized");
  }

  
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private(Admin)
const updateCase = asyncHandler(async (req, res) => {
  const _case = await Case.findById(req.params.id);
  if (!_case) {
    res.status(400);
    throw new Error("Case not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure logged in user matches the user that made the goal and that the user is admin
  if(req.user.role !== 'Admin')
  {
    res.status(401);
    throw new Error("User not authorized");
  }
  else if (req.user.role == 'Admin')
  {
    if (_case.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    res.status(200).json(updatedCase);
  }

  
});

// @desc    Delete case
// @route   DELETE /api/cases/:id
// @access  Private(Admin)
const deleteCase = asyncHandler(async (req, res) => {
  const _case = await Case.findById(req.params.id);
  if (!_case) {
    res.status(400);
    throw new Error("Case not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure logged in user matches the user that made the goal and that the user is admin
  if(req.user.role !== 'Admin')
  {
    res.status(401);
    throw new Error("User not authorized");
  }
  else if (req.user.role == 'Admin')
  {
    if (_case.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized test");
    }
    else{
      await _case.remove();
      res.status(200).json({ id: req.params.id });
    }
  }


  

  
});
module.exports = {
  getCase,
  getUserCases,
  getAllCases,
  postCase,
  updateCase,
  deleteCase,
};
