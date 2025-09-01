import api from "./api";
import type { AlertSettingsBody, AlertSettingsResponse } from "@/types/alert";

export async function getAlert() {
  const res = await api.get<AlertSettingsResponse>("/api/alerts/settings");
  return res.data;
}

export async function createAlert(body: AlertSettingsBody) {
  const res = await api.post<AlertSettingsResponse>(
    "/api/alerts/settings",
    body,
  );
  return res.data;
}

export async function patchAlert(body: Partial<AlertSettingsBody>) {
  const res = await api.patch<AlertSettingsResponse>(
    "/api/alerts/settings",
    body,
  );
  return res.data;
}
