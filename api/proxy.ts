import {
  FILTER_REQUEST_HEADERS,
  FILTER_RESPONSE_HEADERS,
  getBaseUrl,
  withHandleError,
} from "../utils";

import { NowApiHandler } from "@vercel/node";
import fetch from "node-fetch";

const handler: NowApiHandler = async (req, res) => {
  const baseUrl = getBaseUrl();

  const isHtml = req.headers.accept!.indexOf("html") >= 0;
  const isModulePath = /^\/x\/([a-z]+)(?:@(.+))?\/.*/.test(req.url!);

  let dest: string;
  if (isModulePath && !isHtml) {
    dest = `${baseUrl}/api${req.url}`;
  } else {
    dest = `${baseUrl}${req.url}`;
  }

  const headers: {} = Object.fromEntries(
    Object.entries(req.headers).filter(([k]) => {
      return !FILTER_REQUEST_HEADERS.some((h) => h == k);
    }),
  );

  const resp = await fetch(dest, { headers });
  const html = await resp.text();

  resp.headers.forEach((v, k) => {
    if (!FILTER_RESPONSE_HEADERS.some((h) => h == k)) {
      res.setHeader(k, v);
    }
  });

  res.status(resp.status).end(html);
};

export default withHandleError(handler);
