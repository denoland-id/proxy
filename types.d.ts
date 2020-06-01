import { NowApiHandler } from "@vercel/node";

export type HandleError = (h: NowApiHandler) => NowApiHandler;
