import { HandleError } from "../types";

export const BASE_URLS = {
  production: "https://web.denoland-id.now.sh",
  prod: "https://web.denoland-id.now.sh",
  development: "https://web-staging.denoland-id.now.sh",
  dev: "https://web-staging.denoland-id.now.sh",
};

export const FILTER_REQUEST_HEADERS = [
  //
  "host",
];

export const FILTER_RESPONSE_HEADERS = [
  //
  "content-encoding",
];

export const getBaseUrl = () => {
  // @ts-ignore
  return BASE_URLS[process.env.NODE_ENV];
};

export const withHandleError: HandleError = (handler) => (req, res) => {
  try {
    return handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
