import { NowApiHandler } from "@vercel/node";
import fetch from "node-fetch";
import { withHandleError } from "../utils";

const baseUrl = "https://denoland.id";

const handler: NowApiHandler = async (req, res) => {
  const isHtml = req.headers.accept.indexOf("html") >= 0;

  const dest = isHtml ? `${baseUrl}${req.url}` : `${baseUrl}/api${req.url}`;
  const resp = await fetch(dest);
  const html = await resp.text();

  return res.end(html);
};

export default withHandleError(handler);
