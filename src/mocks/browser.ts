import { setupWorker } from "msw/browser";
// import { handlers } from "./handlers";
import { searchHandler } from "./handlers/search";

//handler 추가
export const worker = setupWorker(searchHandler);
