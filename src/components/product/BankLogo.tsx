import { useRef } from "react";

type Props = {
  korCoName: string;
  className?: string;
  variant?: "random" | "hash";
};

const LOGOS = [
  "/images/banks/hana.png",
  "/images/banks/woori.png",
  "/images/banks/kb.png",
  "/images/banks/sc.png",
  "/images/banks/sh.png",
];

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function BankLogo({
  korCoName,
  className,
  variant = "random",
}: Props) {
  const chosenSrc = useRef<string>("");

  if (!chosenSrc.current) {
    if (variant === "hash" && korCoName) {
      const idx = hashString(korCoName) % LOGOS.length;
      chosenSrc.current = LOGOS[idx];
    } else {
      const idx = Math.floor(Math.random() * LOGOS.length);
      chosenSrc.current = LOGOS[idx];
    }
  }

  const alt = `${korCoName}`;
  const classes = ["object-cover", "ring-1", "ring-gray-200", className]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      src={chosenSrc.current}
      alt={alt}
      className={classes}
      loading="lazy"
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        img.src = "/images/banks/woori.png"; //default
      }}
    />
  );
}
