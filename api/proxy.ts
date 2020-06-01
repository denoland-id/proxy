import {
  FWD_REQUEST_HEADERS,
  FWD_RESPONSE_HEADERS,
  getBaseUrl,
  withHandleError,
} from "../utils";

import { NowApiHandler } from "@vercel/node";
import fetch from "node-fetch";

const handler: NowApiHandler = async (req, res) => {
  const baseUrl = getBaseUrl();

  const isHtml = req.headers.accept.indexOf("html") >= 0;
  const isModulePath = /^\/x\/([a-z]+)(?:@(.+))?\/.*/.test(req.url);

  let dest: string;
  if (isModulePath && !isHtml) {
    dest = `${baseUrl}/api${req.url}`;
  } else {
    dest = `${baseUrl}${req.url}`;
  }

  let headers = FWD_REQUEST_HEADERS.reduce(
    (hs, h) => ({ ...hs, [h]: req.headers[h] }),
    {},
  );

  const resp = await fetch(dest, { headers });
  const html = await resp.text();

  for (const header of FWD_RESPONSE_HEADERS) {
    res.setHeader(header, resp.headers.get(header));
  }

  res.end(html);
};

export default withHandleError(handler);