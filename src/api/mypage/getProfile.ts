import { MyProfile } from "@/types/user";
import api from "../api";

export const getMyProfile = () => api.get<MyProfile>("/api/mypage/profile");