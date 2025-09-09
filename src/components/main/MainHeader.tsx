interface MainHeaderProps {
  title?: string;
  subTitle?: string;
  contentTxt?: string;
  titleClassName?: string;
}

const MainHeader = ({
  title,
  subTitle,
  contentTxt,
  titleClassName,
}: MainHeaderProps) => {
  const hasTitle = Boolean(title);
  const hasSubTitle = Boolean(subTitle);
  const hasContentTxt = Boolean(contentTxt);

  if (!hasSubTitle && !hasTitle) return null;

  return (
    <div className="mb-[20px]">
      {/* subTitle */}
      {hasSubTitle && (
        <span
          className={`block mt-[12px] gmarket text-xl font-bold text-primary ${titleClassName}`}
        >
          {subTitle}
        </span>
      )}
      {/* Title */}
      {hasTitle && (
        <h2 className="mt-[12px] gmarket text-4xl font-bold">{title}</h2>
      )}
      {hasContentTxt && (
        <p className="mt-[12px] font-medium">{contentTxt}</p>
      )}
    </div>
  );
};
export default MainHeader;
