import { Link } from "react-router-dom";

import { RiHome2Line } from "react-icons/ri";
import { MdArrowForwardIos } from "react-icons/md";

export interface BreadcrumbItem {
    label: string;
    to?: string; // to 없으면 마지막 active
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
    if (items.length === 0) return null;

    return (
        <ul className="flex items-center gap-[5px]">
            {items.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === items.length - 1;
                return (
                    <li key={index} className="flex items-center gap-[5px] text-sm">
                        {isFirst ? (
                            <Link to="/" className="flex items-center">
                                <RiHome2Line size={16} color="#666" />
                            </Link>
                            ) : isLast ? (
                                <span className="font-bold text-primary">{item.label}</span>
                            ) : (
                                <span className="text-black6">{item.label}</span>
                        )}
                        {/* 구분자 */}
                        {!isLast && (
                            <MdArrowForwardIos size={12} color="#666" />
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
export default Breadcrumb;