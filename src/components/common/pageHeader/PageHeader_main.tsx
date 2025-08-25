interface PageHeaderMainProps {
  title?: string;
  subTitle?: string;

  titleClassName?: string;
}

const PageHeader_main = ({ title, subTitle }: PageHeaderMainProps) => {
  const hasTitle = Boolean(title);
  const hasSubTitle = Boolean(subTitle);

  if (!hasSubTitle && !hasTitle) return null;

  return (
    <div className="mb-[20px]">
      {/* subTitle */}
      {hasSubTitle && (
        <h4 className="mt-[12px] gmarket text-xl font-bold text-primary">
          {subTitle}
        </h4>
      )}
      {/* Title */}
      {hasTitle && (
        <h2 className="mt-[12px] gmarket text-4xl font-bold">{title}</h2>
      )}
    </div>
  );
};
export default PageHeader_main;
