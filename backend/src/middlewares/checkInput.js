const checkRequest = (req, res, next) => {
  const userDetails = req.body;
  const isEmpty = Object.keys(userDetails).length === 0;
  if (isEmpty) {
    res.status(404).json({
      message: "Details are empty",
    });
  } else {
    next();
  }
};

module.exports = checkRequest;
