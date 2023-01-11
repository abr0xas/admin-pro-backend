const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CNN
    );
    console.info("DB Connected");
  } catch (err) {
    console.log(err);
    throw new Error("Error a la hora de iniciar la conexión con la bd ver logs")
  }
};

module.exports = {
  dbConnection,
};
