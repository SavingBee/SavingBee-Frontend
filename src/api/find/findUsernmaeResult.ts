import api from "../api";

export const findUsernmaeResult = async (email: string) => {
    return api.post<{ username: string }>("/user/find-username/result", { email });
}