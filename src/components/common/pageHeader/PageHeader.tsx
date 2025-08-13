import { Link } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    to?: string; // to 없으면 마지막 active
}

interface PageHeaderProps {
    title?: string;
    breadcrumb?: BreadcrumbItem[];
}

const PageHeader = ({ title, breadcrumb = [] }: PageHeaderProps) => {
    const hasBreadcrumb = breadcrumb.length > 0;
    const hasTitle = Boolean(title);

    if (!hasBreadcrumb && !hasTitle) return null; // 둘 다 없으면 렌더링 안 함

    return (
        <div className="mb-[20px]">
            {/* Breadcrumb */}
            {hasBreadcrumb && (
                <ul className="flex items-center gap-[5px]">
                    {breadcrumb.map((item, index) => {
                        const isFirst = index === 0;
                        const isLast = index === breadcrumb.length - 1;
                        return (
                            <li key={index} className="flex items-center gap-[5px] text-sm">
                                {isFirst ? (
                                    <Link to="/" className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.8576 5.2L7 1.29914L3.1424 5.2H3.14326V11.7H10.8568V5.2H10.8576ZM12.1423 6.49915V11.7C12.1423 12.418 11.5668 13 10.8568 13H3.14326C2.43325 13 1.85768 12.418 1.85768 11.7V6.49913L0.908392 7.45906L0 6.54048L6.09173 0.380438C6.59335 -0.126813 7.40665 -0.126813 7.90827 0.380438L14 6.54048L13.0916 7.45906L12.1423 6.49915Z" fill="#666666"/>
                                        </svg>
                                    </Link>
                                    ) : isLast ? (
                                        <span className="font-bold text-primary">{item.label}</span>
                                    ) : (
                                        <span className="text-black6">{item.label}</span>
                                )}
                                {/* 구분자 */}
                                {!isLast && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9" fill="none">
                                        <path d="M0 1.31L0.841146 0.5L5 4.5L0.841146 8.5L0 7.69L3.3151 4.5L0 1.31Z" fill="#666666"/>
                                    </svg>
                                )}
                            </li>
                        )
                    })}
                </ul>
            )}

            {/* Title */}
            {hasTitle && (
                <h2 className="mt-[12px] gmarket text-4xl font-bold">{title}</h2>
            )}
        </div>
    )
}
export default PageHeader;