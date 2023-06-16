const errorHandling = (err, req, res, next) => {
  // Creating a variable that will get the statuscode from the controller. So we check
  // if the status is set in the controller. If it isn't, then we set the status code to
  // 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(500);

  res.json({
    message: err.message,
  });
};

module.exports = {
  errorHandling,
};
