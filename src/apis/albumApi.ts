import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import type { GetNewReleasesResponse } from "../models/albums";
export const getNewReleases = async (
  clientCredentialToken: string,
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      },
    );
    console.log("ddd:", response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      console.log(error.response?.status);
      console.log(error.response?.data);
    }

    throw error;
  }
};
