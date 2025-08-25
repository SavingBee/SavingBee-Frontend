import Button from "../common/button/Button";
import InputField1 from "../common/input/InputField1";
import Modal from "../common/modal/Modal";

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserEditModal = ({ isOpen, onClose }: UserEditModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} modalTitle="회원정보수정">
            <InputField1
                type="text"
                label="이메일"
                id="userEmail"
                name="userEmail"
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1"
                required
            />
            <InputField1
                type="text"
                label="닉네임"
                id="userNickname"
                name="userNickname"
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
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
                    type="submit"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-primary"
                >
                    수정하기
                </Button>
            </div>
        </Modal>
    );
};

export default UserEditModal;