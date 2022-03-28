import { userModel } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    console.log(user);
    if (!user)
      return res.status(404).json({ message: "Tài khoản không tồn tại !!" });
    else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(404)
          .json({ message: "Mật khẩu của bạn không đúng !!" });
      }
      if (user && isValidPassword) {
        const userReturn = {
          userId: user._id,
          email: user.email,
          username: user.username,
          name: user.name,
          isAdmin: user.isAdmin,
          telephone: user.telephone,
          address: user.address,
          avatarUrl: `${process.env.BASE_URL}/images/default-avatar.png`,
        };

        const accessToken = jwt.sign(userReturn, process.env.JWT_ACCESS_KEY);
        return res.status(200).json({ ...userReturn, accessToken });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (req, res) => {
  const { name, username, password, email, telephone } = req.body;
  try {
    const isAlreadyUser = await userModel.findOne({ username });
    if (isAlreadyUser)
      return res.status(404).json({ message: "Tài khoản đã tồn tại !!" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      telephone: telephone,
    });
    await newUser.save();
    res.status(200).json({ message: "Bạn đã đăng ký thành công !!" });
  } catch (err) {
    console.log(err);
  }
};

export const authenticatedUser = async (req, res) => {
  try {
    const currentUser = await userModel
      .findById(req.userId)
      .select("-password");
    if (!currentUser) return res.status(401).json("User not found");
    res.status(200).json({
      ...currentUser,
      avatarUrl: `${process.env.BASE_URL}/images/default-avatar.png`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateNameUser = async (req, res) => {
  try {
    const newEditUser = await userModel
      .findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
      .select("-password");
    res.status(200).json({ name: newEditUser.name });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateUsernameUser = async (req, res) => {
  try {
    const newEditUser = await userModel
      .findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
      .select("-password");
    res.status(200).json({ username: newEditUser.username });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePasswordUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    await userModel.findOneAndUpdate(
      { _id: req.body._id },
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({ message: "Bạn đã cập mật khẩu thành công" });
  } catch (error) {
    res.status(500).json(error);
  }
};
