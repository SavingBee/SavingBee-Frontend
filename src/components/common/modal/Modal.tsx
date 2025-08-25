import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, modalTitle, children }: ModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            setTimeout(() => setVisible(true), 10);
        } else {
            setVisible(false);
            setTimeout(() => setMounted(false), 200);
        }
    }, [isOpen]);

    if (!mounted) return null;


    return (
        <div
            className={`
                fixed inset-0 z-50 flex items-center justify-center 
                transition-opacity duration-200 bg-black/30
                ${visible ? "opacity-100" : "opacity-0"}
            `}
        >
            <div
                className={`
                    relative z-10 max-w-[420px] w-full bg-white rounded-md overflow-hidden shadow-lg
                    transform transition-all duration-200 ease-out
                    ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"}
                `}
            >
                <div className="flex justify-between py-[20px] px-[20px] bg-primary">
                    <strong className="block text-lg text-white">
                        {modalTitle}
                    </strong>
                    <button type="button" onClick={onClose}>
                        <RiCloseLine size={23} color="#fff" />
                    </button>
                </div>
                <div className="py-[20px] px-[20px]">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Modal;