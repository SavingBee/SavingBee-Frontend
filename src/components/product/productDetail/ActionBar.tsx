type Props = {
  onPrev: () => void;
  onShare: () => void;
  onCompare: () => void;
};
export default function ActionBar({ onPrev, onShare, onCompare }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-base-200 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-4 py-3">
        <button className="btn" onClick={onPrev}>
          이전
        </button>
        <button className="btn btn-outline" onClick={onShare}>
          공식홈 바로가기
        </button>
        <button className="btn btn-primary" onClick={onCompare}>
          비교함 담기
        </button>
      </div>
    </div>
  );
}
