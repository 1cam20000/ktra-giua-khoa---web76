import { profileModel } from "../models/profile.model.js";

const updateProfile = async (id, body) => {
  const profile = await profileModel.findByIdAndUpdate(id, {
    skill,
    hobby,
    aim,
  });
};

const deleteProfile = async (profileId, callback) => {
  const index = profileModel.findIndex(
    (profile) => profile.id === parseInt(profileId)
  );
  if (index) {
    profileModel.splice(index, 1);
    callback(null, { success: true });
  } else {
    callback("user not found", null);
  }
};

export { deleteProfile, updateProfile };
