const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Report = require('../model/ReportModels')


const register = async (req, res) => {

  const {
    firstname,
    lastname,
    email,
    contact,
    password,
  } = req.body;
  // console.log(req,"firstName");
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err, "email");
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" })
  }

  // Ensure roleType is either 0 or 1
  // if (roleType !== 1 || roleType !== 2) {
  //     return res.status(400).json({ message: "Invalid roleType. Use 0 for buyers or 1 for sellers." });
  // }

  const hashedpassword = bcrypt.hashSync(password);

  const user = new User({
    firstname,
    lastname,
    email,
    contact,
    password: hashedpassword,
    // roleType: roleType,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: user });
};

// ....... login function ...............

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  }
  catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found Signup Please" })
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Email / Password" })
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "35m",
  });

  console.log("Generated Token\n", token);

  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30), // 30 seconds
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

// ............. VerifyiToken function ............

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  }
  catch (err) {
    return new Error(err)
  }
  if (!user) {
    return res.status(400).json({ message: "User Not Found" })
  }
  return res.status(200).json({ user });
};

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};



const report= async (req, res) => {

  const {
    date,
    project_name,
    status_update,
    obstacles,
    need_clarification,
    explanation,
    plans,
    attacment,
  } = req.body;
 


  const report = new Report({
    date,
    project_name,
    status_update,
    obstacles,
    need_clarification,
    explanation,
    plans,
    attacment,
    
  });

  try {
    await report.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: report });
};

exports.logout = logout;
exports.register = register;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.report=report;
