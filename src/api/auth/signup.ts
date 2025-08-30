import api from "../api";

export const signup = async (signupData: {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
}) => {
    return api.post("/user/signup/complete", signupData);
}