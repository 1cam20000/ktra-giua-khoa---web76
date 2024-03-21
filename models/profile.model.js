import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    skill: {
      type: Array,
      item: {
        type: Array,
      },
    },
    hobby: String,
    aim: {
      type: Array,
      item: {
        type: Array,
      },
    },
  },
  {
    timestamps: true,
  }
);
const profileModel = mongoose.model("Profile", profileSchema);

export { profileModel, profileSchema };
