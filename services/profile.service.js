import { profileModel } from "../models/profile.model.js";

const createProfile = async (body) => {
  const { userId, skill, hobby, aim } = body;
  const profile = profileModel.create({
    userId,
    skill,
    hobby,
    aim,
  });
  return profile;
};

const updateProfile = async (id, body) => {
  const { email, skill, hobby, aim } = body;
  const profile = await profileModel.findByIdAndUpdate(id, {
    skill,
    hobby,
    aim,
  });
  return profile;
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

export { deleteProfile, updateProfile, createProfile };
