const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      min: 6,
    },

    role: {
      type: [String],
      enum: ["usuario", "profesor", "director", "admin"],
      default: "usuario",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al encriptar la contraseña" });
  }
});

userSchema.methods.comparePassword = async function (passwordPlain) {
  return await bcryptjs.compare(passwordPlain, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
