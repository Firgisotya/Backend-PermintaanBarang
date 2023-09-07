const { User } = require("../models");
const bcrypt = require("bcryptjs");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const Mustache = require("mustache");
dotenv.config();
const fs = require("fs");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      return res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  },
  register: async (req, res) => {
    try {
      const schema = {
        username: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6",
      };
      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }
      // const checkEmail = await User.findOne({
      //   where: {
      //     email: req.body.email,
      //   },
      // });
      // if (checkEmail) {
      //   return res.status(409).json({
      //     status: "error",
      //     message: "Email already exist",
      //   });
      // }
      const checkUsername = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (checkUsername) {
        return res.status(409).json({
          status: false,
          message: "Username already exist",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const data = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
        role: "user",
      };
      const user = await User.create(data);
      return res.json({
        status: true,
        message: "Register success",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const usernameFound = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!usernameFound) {
        return res.status(404).json({
          message: "Username or password is invalid",
        });
      }
      const passwordValid = bcrypt.compareSync(
        req.body.password,
        usernameFound.password
      );
      if (!passwordValid) {
        return res.status(404).json({
          message: "Username or password is invalid",
        });
      }
      if (usernameFound.role !== "admin") {
        return res.status(404).json({
          message: "You are not admin",
        });
      }
      const data = {
        id: usernameFound.id,
        email: usernameFound.email,
        role: usernameFound.role,
        username: usernameFound.username,
      };
      const token = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "5h",
      });
      return res.json(token);
    } catch (error) {
      console.log(error);
    }
  },
  loginApps: async (req, res) => {
    try {
      const usernameFound = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!usernameFound) {
        return res.status(404).json({
          status: false,
          message: "Username or password is invalid",
        });
      }
      const passwordValid = bcrypt.compareSync(
        req.body.password,
        usernameFound.password
      );
      if (!passwordValid) {
        return res.status(404).json({
          status: false,
          message: "Username or password is invalid",
        });
      }
      const data = {
        id: usernameFound.id,
        email: usernameFound.email,
        role: usernameFound.role,
        username: usernameFound.username,
      };
      // const token = jwt.sign(data, process.env.SECRET_KEY, {});
      return res.json({
        status: true,
        message: "Login success",
        data,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: "Something went wrong",
      });
    }
  },
  show: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
      return res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  destroy: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
      await user.destroy();
      return res.json({
        status: "success",
        message: "User deleted",
      });
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const schema = {
        email: "email|empty:false",
      };
      const checkEmail = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!checkEmail) {
        return res.status(409).json({
          status: "error",
          message: "Email not found",
        });
      }
      let encode = {
        email: checkEmail.email,
        username: checkEmail.username,
        id: checkEmail.id,
        role: checkEmail.role,
      };
      const token = jwt.sign(encode, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      let data = {
        username: checkEmail.username,
        url: `http://localhost:3000/reset-password/${token}`,
      };
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "emailreminder95@gmail.com",
            pass: "emailreminder",
          },
          from: "emailreminder95@gmail.com",
        });
        const template = fs.readFileSync("./views/email.html", "utf-8");
        let message = {
          from: "emailreminder95@gmail.com",
          to: checkEmail.email,
          subject: "Reset Password",
          html: Mustache.render(template, data),
        };
        await transporter.sendMail(message);
      } catch (error) {
        console.log(error);
      }
      return res.status(200).json({
        status: "success",
        message: "Check your email to reset password",
      });
    } catch (error) {
      console.log(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, confirmPassword, token } = req.body;
      // check if token not expired
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const userFound = await User.findOne({
        where: {
          username: decode.username,
        },
      });
      // update password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      userFound.password = hash;
      await userFound.save();
      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Token expired",
      });
    }
  },
};
