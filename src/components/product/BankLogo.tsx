import { useMemo } from "react";

type Props = {
  korCoName: string;
  className?: string;
  variant?: "random" | "hash";
};

/** 공백/기호 제거 + 소문자 */
function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[()/\-_.·]/g, "");
}

const BANK_RULES: Array<{ re: RegExp; src: string }> = [
  { re: /(kb|국민)/, src: "/images/banks/kb.png" },
  { re: /(ibk기업|기업|ibk)/, src: "/images/banks/ibk.png" },
  { re: /(hana|하나)/, src: "/images/banks/keb.png" },
  { re: /(nh농협|농협|nh)/, src: "/images/banks/nh.png" },
  { re: /(shinhan|신한|sh은행?)/, src: "/images/banks/shinhan.png" },
  { re: /(woori|우리)/, src: "/images/banks/woori.png" },
];

function resolveByName(name: string): string {
  const n = normalize(name);
  for (const { re, src } of BANK_RULES) {
    if (re.test(n)) return src;
  }
  return "/images/banks/etc.png"; // 기본 로고 경로
}


export default function BankLogo({
  korCoName,
  className,
}: Props) {
  const chosenSrc = useMemo(() => resolveByName(korCoName), [korCoName]);

  const alt = korCoName || "은행 로고";
  const classes = ["object-cover", "ring-1", "ring-gray-200", className]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      src={chosenSrc}
      alt={alt}
      className={classes}
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        img.src = "/images/banks/etc.png"; //default
      }}
    />
  );
}
