import { useState } from "react";
import UserEditModal from "./UserEditModal";

import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlineBank } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { HiMiniBell } from "react-icons/hi2";
import { IoMdPerson } from "react-icons/io";
import AlertModal from "./alert/AlertModal.tsx";

type ActiveModal = "none" | "alert" | "edit";

const UserHeader = () => {
    const [activeModal, setActiveModal] = useState<ActiveModal>("none");

    const open = (m: ActiveModal) => setActiveModal(m);
    const close = () => setActiveModal("none");

    return (
        <div>
            <div className="flex items-center justify-between border border-graye5 rounded-lg px-7 py-8 rounded-b-none">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-[70px] h-[70px] bg-grayf5 rounded-full">
                        <GoPerson size={30} color="#999" />
                    </div>
                    <div>
                        <strong className="block text-lg font-bold">
                            닉네임
                        </strong>
                        <p className="text-sm text-black6">
                            email@gmail.com
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mr-5">
                    <div className="flex items-center justify-center w-[50px] h-[50px] bg-grayf9 border border-graye9 rounded-full">
                        <AiOutlineBank size={22} color="#666" />
                    </div>
                    <div className="flex items-center gap-8">
                        <strong className="leading-[20px] font-semibold text-black6">
                            현재 <br />보유 상품
                        </strong>
                        <span className="block font-bold  text-primary text-2xl underline">
                            4
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex bg-grayf9 rounded-b-lg border border-graye5 border-t-0">
                {/* 알림설정 */}
                <button
                    type="button"
                    onClick={() => open("alert")}
                    className="flex items-center justify-center gap-1 flex-auto py-3 font-medium text-sm text-black6 border-r border-graye5"
                >
                    <HiMiniBell color="#666" />
                    알림설정
                </button>
                <AlertModal isOpen={activeModal === "alert"} onClose={close} />

                {/* {openAlert && (
                    <AlertModal closeAlert={() => setOpenAlert((prev) => !prev)} />
                )} */}

                {/* 회원정보수정 */}
                <button
                    type="button"
                    onClick={() => open("edit")}
                    className="flex items-center justify-center gap-1 flex-auto py-3 font-medium text-sm text-black6 border-r border-graye5"
                >
                    <RiEdit2Fill color="#666" />
                    회원정보수정
                </button>
                <UserEditModal isOpen={activeModal === "edit"} onClose={close} />

                {/* 회원탈퇴 */}
                <button
                    type="button"
                    className="flex items-center justify-center gap-1 flex-auto py-3 font-medium text-sm text-black6"
                >
                    <IoMdPerson color="#666" />
                    회원탈퇴
                </button>
            </div>
        </div>
    )
}
export default UserHeader;