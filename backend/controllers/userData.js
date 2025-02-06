const getUserData = (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "fail", message: err });
  }
};

module.exports = { getUserData };
