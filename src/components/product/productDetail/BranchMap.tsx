type Branch = { name: string; lat: number; lng: number };
type Props = { title: string; branches: Branch[] };

export default function BranchMap({ title, branches }: Props) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm">
      <div className="p-5">
        <div className="mb-3 text-base font-semibold">{title}</div>
        <div className="  border-t border-b border-gray-300 bg-base-200/60">
          {/* 지도 위치: Kakao 컴포넌트로 교체 */}
          <div className="h-72 w-full rounded-xl bg-base-300"></div>
        </div>
        {branches.length > 0 && (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {branches.map((b, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-base-200 px-3 py-2"
              >
                <span className="text-sm">{b.name}</span>
                <button
                  className="btn btn-xs"
                  onClick={() => console.log("내 위치와 길찾기")}
                >
                  내 위치 찾기
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
