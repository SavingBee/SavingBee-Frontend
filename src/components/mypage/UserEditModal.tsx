import useMyProfile from "@/hooks/mypage/useMyProfile";
import Button from "../common/button/Button";
import InputField1 from "../common/input/InputField1";
import Modal from "../common/modal/Modal";
import { useUpdateProfile } from "@/hooks/mypage/useUpdateProfile";
import { useEffect, useState } from "react";
import { useUpdatePassword } from "@/hooks/mypage/useUpdatePassword";

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserEditModal = ({ isOpen, onClose }: UserEditModalProps) => {
    // 회원정보 가져오기
    const { data: profile, error } = useMyProfile();

    // 회원정보수정
    const { update: profileUpdate } = useUpdateProfile();

    // 비밀번호 변경
    const { update: passwordUpdate } = useUpdatePassword();
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // 프로필 정보 로드 시 닉네임 초기화
    const [editNickname, setEditNickname] = useState("");
    useEffect(() => {
        if (profile?.nickname) {
            setEditNickname(profile.nickname);
        }
    }, [profile]);

    // 회원정보 수정 핸들러
    const handleEditProfile = async () => {
        await profileUpdate({ email: profile?.email, nickname: editNickname });
        alert("회원정보가 수정되었습니다.");
        if (!error) {
            onClose(); // 모달 닫기
            window.location.reload(); // 페이지 새로고침
        }
    }

    // 비밀번호 변경 핸들러
    const handleEditPassword = async () => {
        // 입력 칸 없을 떄
        if (!currentPassword || !password || !passwordConfirm) {
            alert("모든 비밀번호 입력 칸을 채워주세요.");
            return;
        }

        // 새 비밀번호랑 새 비밀번호 확인이랑 일치하지 않을 때
        if (password !== passwordConfirm) {
            alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const { ok, message } = await passwordUpdate({ currentPassword, password, passwordConfirm });
        if (ok) {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            // 초기화
            setCurrentPassword("");
            setPassword("");
            setPasswordConfirm("");

            onClose(); // 모달 닫기
            window.location.reload(); // 페이지 새로고침
        } else {
            alert(message); // 여기서 즉시 오류 메시지 출력 가능
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} modalTitle="회원정보수정">
            <InputField1
                type="text"
                label="이메일"
                id="userEmail"
                name="userEmail"
                value={profile?.email}
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1"
                disabled
            />
            <InputField1
                type="text"
                label="닉네임"
                id="userNickname"
                name="userNickname"
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
            />
            <InputField1
                type="password"
                label="현재 비밀번호"
                id="currentPassword"
                name="currentPassword"
                onChange={(e) => setCurrentPassword(e.target.value)}
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
            />
            <InputField1
                type="password"
                label="새로운 비밀번호"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
            />
            <InputField1
                type="password"
                label="새로운 비밀번호 확인"
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
            />
            <Button
                type="button"
                styleVariant="border"
                className="text-primary border-primary mt-2"
                onClick={handleEditPassword}
            >
                비밀번호 변경
            </Button>
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
                    onClick={handleEditProfile}
                >
                    수정하기
                </Button>
            </div>
        </Modal>
    );
};

export default UserEditModal;