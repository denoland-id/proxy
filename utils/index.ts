import { HandleError } from "../types";

export const withHandleError: HandleError = (handler) => (req, res) => {
  try {
    return handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
