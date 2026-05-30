import api from "../utils/api";

export const getCurrentUserProfile = async () => {
  try {
    const response = await api.get(`/me`);
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch user profile", { cause: error });
  }
};
