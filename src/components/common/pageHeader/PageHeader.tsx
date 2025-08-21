import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";

interface PageHeaderProps {
    title?: string;
    breadcrumb?: BreadcrumbItem[];
    titleClassName?: string;
}

const PageHeader = ({ title, breadcrumb = [], titleClassName="" }: PageHeaderProps) => {
    const hasBreadcrumb = breadcrumb.length > 0;
    const hasTitle = Boolean(title);

    if (!hasBreadcrumb && !hasTitle) return null; // 둘 다 없으면 렌더링 안 함

    return (
        <div className="mb-[20px]">
            {/* Breadcrumb */}
            {hasBreadcrumb && <Breadcrumb items={breadcrumb}/>}
            {/* Title */}
            {hasTitle && (
                <h2 className={`mt-[12px] gmarket text-4xl font-bold ${titleClassName}`}>{title}</h2>
            )}
        </div>
    )
}
export default PageHeader;