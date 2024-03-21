import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: String,
    birth: String,
    address: String,
    nation: String,
    password: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
    profileId: [{ type: mongoose.Types.ObjectId, ref: "Profile" }],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export { userModel, userSchema };
