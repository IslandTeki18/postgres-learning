import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id,
      },
      "tokenSecret",
      { expiresIn: "3d" }
    );
    return token;
  },
};