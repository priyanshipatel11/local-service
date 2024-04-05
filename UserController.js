const { _makeLong } = require("path");
const UserModel = require("../models/UserModel");
const ServiceProviderModel = require("../models/ServiceProviderModel");
const encrypt = require("../util/encrypt");
const mailUtil = require("../util/MailUtil");

const createUser = async (req, res) => {
  try {
    const hashedPassword = encrypt.encryptPassword(req.body.password);
    const UserObj = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      role: req.body.role,
    };
    const savedUser = await UserModel.create(UserObj);
    const Mailres = await mailUtil.mailSend(
      savedUser.email,
      "Testing",
      "Welcome To Our App..."
    );
    res.status(201).json({
      message: "User Created",
      data: savedUser,
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      data: error,
      flag: -1,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const getuser = await UserModel.find().populate("role");
    res.status(200).json({
      message: "Data fetched",
      data: getuser,
      flag: -1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Data not found",
      data: error,
      flag: -1,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params);
    console.log(id);
    const user = await UserModel.findById(id).populate("role");
    if (user == null) {
      res.status(404).json({
        message: "User Not Found",
        flag: -1,
        data: [],
      });
    } else {
      res.status(200).json({
        message: "Get User By Id",
        data: user,
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in Getting User",
      data: [],
      flag: -1,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const newUser = req.body;
    const updateUser = await UserModel.findByIdAndUpdate(id, newUser);
    if (updateUser == null) {
      res.status(400).json({
        message: "User Not Found",
        flag: -1,
      });
    } else {
      res.status(200).json({
        message: "Updating...",
        // data : updateUser,
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in Updating",
      data: error,
      flag: -1,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if (deleteUser == null) {
      res.status(400).json({
        message: "User Not Found",
        flag: -1,
      });
    } else {
      res.status(200).json({
        message: "Deleting...",
        data: deleteUser,
        flag: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in Deleting",
      data: error,
      flag: -1,
    });
  }
};

const loginUser = async (req, res) => {
  //select * from users where email = ? and password = ?
  //db -->password -->encrypt
  // req.body.password 123456 -->
  try {
    //kunal@gmail.com
    const email = req.body.email;
    const password = req.body.password; //123456

    const userFromEmail = await UserModel.findOne({ email: email }); //db
    if (userFromEmail != null) {
      console.log("User found");
      const flag = encrypt.comparePassword(password, userFromEmail.password);
      if (flag == true) {
        res.status(200).json({
          message: "User login successfully",
          flag: 1,
          data: userFromEmail,
        });
      } else {
        res.status(404).json({
          message: "User not found",
          flag: -1,
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
        flag: -1,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error in login User",
      data: err,
      flag: -1,
    });
  }
};

const isUserExist = async (req, res) => {
  try {
    const email = req.body.email;
    const getUser = await UserModel.findOne({ email: email });
    const getServiceProvider = await ServiceProviderModel.findOne({
      email: email,
    });
    console.log(getUser);
    console.log(getServiceProvider);
    if (getUser) {
      res.status(200).json({
        message: "User Found",
        flag: 1,
        data: getUser,
      });
    } else if (getServiceProvider) {
      res.status(200).json({
        message: "Service Provider Found",
        flag: 1,
        data: getServiceProvider,
      });
    } else {
      res.status(404).json({
        message: "User Not Found",
        flag: -1,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in finding User",
      flag: -1,
    });
  }
};

const resetPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);

  const hashedPassword = await encrypt.encryptPassword(password);
  try {
    const updateUserPassword = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    const updateAerviceProviderPassword = await ServiceProviderModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({
      message: "Password Updated Successfully",
      flag: 1,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating Password",
      flag: -1,
    });
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  isUserExist,
  resetPassword,
};
