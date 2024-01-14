const hendleMongodbError = (error, data, next) => {
  const { name, code } = error;
  const status =
    name === "MongoServerError" && code === 11000
      ? 409
      : 400;

  if (status === 409) {
    error.message = "email in use";
  }

  error.status = status;
  next();
};

module.exports = hendleMongodbError;
