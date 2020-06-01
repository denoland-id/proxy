import { HandleError } from "../types";

export const BASE_URLS = {
  production: "https://web.denoland.id",
  prod: "https://web.denoland.id",
  development: "https://web-staging.denoland.id",
  dev: "https://web-staging.denoland.id",
};

export const FWD_REQUEST_HEADERS = [
  "accept-encoding",
  "accept-language",
  "accept",
  "cache-control",
  "referer",
  "upgrade-insecure-requests",
  "user-agent",
];

export const FWD_RESPONSE_HEADERS = [
  "accept-ranges",
  "access-control-allow-origin",
  "age",
  "cache-control",
  "content-disposition",
  "content-type",
  "etag",
  "strict-transport-security",
];

export const getBaseUrl = () => {
  return process.env.PROXY_BASE_URL || BASE_URLS[process.env.NODE_ENV];
};

export const withHandleError: HandleError = (handler) => (req, res) => {
  try {
    return handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
