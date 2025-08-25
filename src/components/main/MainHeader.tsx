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
        <h4
          className={`mt-[12px] gmarket text-xl font-bold text-primary ${titleClassName}`}
        >
          {subTitle}
        </h4>
      )}
      {/* Title */}
      {hasTitle && (
        <h2 className="mt-[12px] gmarket text-4xl font-bold">{title}</h2>
      )}
      {hasContentTxt && (
        <p className="mt-[12px] gmarket font-bold">{contentTxt}</p>
      )}
    </div>
  );
};
export default MainHeader;
