import axios from "axios";

export const axiosWithError = async (...args: Parameters<typeof axios>) => {
  try {
    const response = await axios(...args);
    return {
      isError: false,
      data: response.data,
    };
  } catch (error) {
    return {
      isError: true,
      data: null,
    };
  }
};
