import { http, HttpResponse } from "msw";
import { savingsListData } from "@/mocks/data/savingListData";

export const savingsHandlers = [
  http.get("/api/savings", () => {
    return HttpResponse.json(savingsListData);
  }),
];
