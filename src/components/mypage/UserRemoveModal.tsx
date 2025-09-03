import { useState } from "react";
import InputField1 from "../common/input/InputField1";
import Modal from "../common/modal/Modal";
import Button from "../common/button/Button";
import { useDeleteAccount } from "@/hooks/mypage/useDeleteAccount";
import api from "@/api/api";

interface UserRemoveMoalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserRemoveModal = ({ isOpen, onClose }: UserRemoveMoalProps) => {
    const { remove } = useDeleteAccount();
    const [password, setPassword] = useState("");

    // 회원탈퇴 핸들러
    const handleDeleteAccount = async () => {
        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const check = confirm("탈퇴하시겠습니까?");
        if (check) {
            const { ok, message } = await remove(password);
            if (ok) {
                alert("탈퇴되었습니다.");

                // 토큰 제거
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                /* 로그아웃 API */
                delete api.defaults.headers.common["Authorization"];

                window.location.href = "/"; // 홈으로 이동
            } else {
                alert(message);
            }
        } else {
            return;
        }

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} modalTitle="회원탈퇴">
            <InputField1
                type="password"
                label="현재 비밀번호"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1"
                required
            />
            <div className="flex gap-2 mt-4">
                <Button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                >
                    닫기
                </Button>
                <Button
                    type="button"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-primary"
                    onClick={handleDeleteAccount}
                >
                    탈퇴하기
                </Button>
            </div>
        </Modal>
    )
}
export default UserRemoveModal;