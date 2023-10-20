// // const express = require('express');
// // const cors = require('cors');
// // const mongoose = require('mongoose');
// // const jwt = require('jsonwebtoken'); // Add this line
// // require('dotenv').config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json({ limit: '10mb' }));

// // const PORT = process.env.PORT || 8080;

// // mongoose
// //   .connect(process.env.MONGODB_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     family: 4,
// //   })
// //   .then(() => console.log('Connected to the database'))
// //   .catch((error) => console.log(error));

// // const userSchema = mongoose.Schema({
// //   firstName: String,
// //   lastName: String,
// //   email: {
// //     type: String,
// //     unique: true,
// //   },
// //   password: String,
// //   roleType: Number,
// // });

// // const userModel = mongoose.model('User', userSchema);

// // // JWT Secret Key
// // const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'MyKey';

// // // Route to generate JWT token on successful login
// // app.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await userModel.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     // Check if the provided password matches the stored password
// //     if (user.password === password) {
// //       // Generate a JWT token
// //       const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
// //         expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
// //       });

// //       return res.status(200).json({ message: 'User logged in', token });
// //     } else {
// //       return res.status(401).json({ message: 'Invalid email or password' });
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Error occurred during login' });
// //   }
// // });

// // // Protected route that requires a valid JWT token
// // app.get('/protected', (req, res) => {
// //   // Extract the token from the request headers
// //   const token = req.headers.authorization.split(' ')[1];

// //   try {
// //     // Verify the token
// //     const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

// //     // You can access the user's ID from the decoded token
// //     const userId = decodedToken.userId;

// //     // Implement your logic for the protected route here

// //     return res.status(200).json({ message: 'Access granted', userId });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(401).json({ message: 'Invalid token' });
// //   }
// // });

// // app.listen(PORT, () => console.log('Server is running at port :' + PORT));




// const express = require('express');
// const cors = require('cors')
// const mongoose = require("mongoose")
// require("dotenv").config()

// const app = express()
// app.use(cors())
// app.use(express.json({ limit: "10mb" }))

// const PORT = process.env.PORT || 8080
// //mongodb connection
// // console.log(process.env.MONGODB_URL)
// // mongoose.connect((process.env.MONGODB_URL)
// // .then(()=>console.log("connect to database"))
// // .catch((error)=>console.log(error)))
// // mongoose.set("strictQuery",false);
// // mongoose.connect()
// mongoose.connect(process.env.MONGODB_URL,{
//     useNewUrlParser: true,
//           useUnifiedTopology: true,
//           family: 4,
// })
//     .then(() => console.log("Connected to the database"))
//     .catch((error) => console.log(error));
// //schema
// const userSchema = mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: {
//         type: String,
//         unique: true,
//     },
//     password: String,
//     roleType: Number,
// })
// // confirmPassword: String,
// // image: String,
// //
// const userModel = mongoose.model("User", userSchema)

// // ========================================  Route =====================================================
// //api
// app.get("/", (req, res) => {
//     res.send("Server is running")
// });
// app.post("/signup", async (req, res) => {
//     const { email, firstName, lastName, password, roleType } = req.body;
    
//     try {
       

//         const newUser = new userModel({
//             email,
//             firstName,
//             lastName,
//             password,
//             roleType, // Assign the modified roleType object
//         });

//         const user = await newUser.save();
//         res.status(200).json({ message: 'Data saved in the backend', user });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Error occurred during signup' });
//     }
// });

// app.post('/login',async(req,res)=>{
//     const {email,password} = req.body;
//     try {
//         const user =await userModel.findOne({email});
//         console.log(user);
//         console.log("user.pass",user.password)
//         console.log("user",password)
//         if(user.password == password){
//             res.status(200).json({message:"user Login in"});
//         }else{
//             res.status(404).json({message:"user and email are invaild"});
//         }
//     } catch (err) {
//         console.log(err);
//     }
// })
// app.listen(PORT, () => console.log("server is running at port :" + PORT))