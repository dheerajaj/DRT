const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://drt:drt@drt.ouxtq7m.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => console.error(err));

// User Authentication Routes
app.use("/api", router);

// Men's Fashion Product Routes
// Import and use the Men's Fashion Product routes here
// Example: app.use("/api/mens-fashion", mensFashionRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






// const express = require("express");
// const mongoose = require("mongoose");
// const router = require("./routes/user-routes");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cookieParser());
// app.use(express.json());
// app.use("/api", router);
// mongoose
//   .connect(
//     `mongodb+srv://satendraarya:${process.env.MONGODB_PASSWORORD}@cluster0.vzrovi2.mongodb.net/?retryWrites=true&w=majority`
//   )
//   .then(() => {
//     app.listen(8080);
//     console.log("Database is connected! Listening to localhost 8080");
//   })
//   .catch((err) => console.log(err));

