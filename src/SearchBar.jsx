import { useEffect, useRef, useState } from "react";
import people from "./assets/ic_people.png";
import left from "./assets/left.png";
import right from "./assets/right.png";
import search from "./assets/search.png";

export const DEFAULT_ITEMS = [
  /* 同上 */
];

export default function SearchBar({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  onChange,
  onSearch,
}) {
  const [active, setActive] = useState(defaultIndex);
  const [q, setQ] = useState("");
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => setActive(defaultIndex), [defaultIndex]);
  useEffect(() => void onChange?.(active), [active, onChange]);

  const tabs = items ?? DEFAULT_ITEMS;

  // 依滾動位置決定 canLeft/canRight
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanLeft(scrollLeft > 0);
      setCanRight(scrollLeft + clientWidth < scrollWidth - 1); // -1 抗浮點誤差
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [tabs.length]);

  function handleTabClick(i) {
    setActive(i);
    const el = scrollerRef.current?.querySelector(`[data-tab-index="${i}"]`);
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  // 點左右箭頭時，水平捲動一段距離
  function scrollByStep(dir /* -1: 左, +1: 右 */) {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(120, Math.round(el.clientWidth * 0.5)); // 半個可視寬 or 至少 120px
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="flex w-full items-center adjust-center gap-4 px-3  px-[140px] bg-white [box-shadow:0_4px_12px_rgba(0,0,0,0.08)]">
      <label className="flex min-w-[50px] h-[28px] items-center gap-4 rounded-full bg-[#F6F7F7] px-4  grow sm:grow-0">
        <img src={search} alt="logo" className="h-[14px]" />
        <input
          className="w-[115px] bg-transparent outline-none text-[12px] placeholder:text-gray-400
             placeholder:text-[#71777B]
             placeholder:font-medium
             placeholder:opacity-100
          "
          placeholder="店內搜尋"
          value={q}
          onChange={(e) => {
            const v = e.target.value;
            setQ(v);
            onSearch?.(v);
          }}
        />
      </label>

      {/* ← 左箭頭：只有 canLeft 才顯示 */}
      {canLeft && (
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          aria-label="向左捲動分類"
          className="shrink-0 grid place-items-center size-8 rounded-full hover:bg-gray-100 active:scale-95 transition text-gray-700"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6" // 由 size-5 改成 size-6 = 1.2x
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#E5E7EA"
              strokeWidth="1.0"
            />
            <path
              d="M13.5 8.5 L9.5 12 L13.5 15.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Tabs 可橫向滾動 */}
      <div
        ref={scrollerRef}
        role="tablist"
        aria-label="分類選單"
        className="flex gap-3 h-[40px] overflow-x-auto whitespace-nowrap flex-1 overflow-y-hidden no-scrollbar"
      >
        {tabs.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={`${t.label}-${i}`}
              data-tab-index={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(i)}
              className={
                "group relative px-3 pb-3 pt-3 text-[12px] transition-colors focus:outline-none rounded-md " +
                "cursor-pointer select-none " +
                (isActive
                  ? // 已選中：字深色、粗一點、背景透明（且禁用 hover 灰底）
                    "text-gray-900 font-medium bg-transparent hover:bg-transparent"
                  : // 未選中：字灰、hover 時變深＋出現灰底
                    "text-[#71777B] font-medium hover:text-gray-800 hover:bg-gray-100")
              }
            >
              <span>{t.label}</span>
              {typeof t.count === "number" && (
                <span className={isActive ? "opacity-80" : "opacity-70"}>
                  {" "}
                  ({t.count})
                </span>
              )}

              {/* 底部黑線：未選中時 hover 出現 1/4 寬；已選中時佔滿整個 item */}
              <span
                aria-hidden="true"
                className={
                  "pointer-events-none absolute bottom-0 left-0 right-0 mx-auto h-[3.5px] rounded-full bg-black " +
                  "transition-all duration-200 " +
                  (isActive
                    ? // 已選中：滿寬且可見
                      "w-full opacity-100"
                    : // 未選中：預設不顯示，hover 才顯示 1/4 寬
                      "w-0 opacity-0 group-hover:w-1/4 group-hover:opacity-100")
                }
              />
            </button>
          );
        })}
      </div>

      {/* → 右箭頭：只有 canRight 才顯示 */}
      {canRight && (
        <button
          type="button"
          onClick={() => scrollByStep(1)}
          aria-label="向右捲動分類"
          className="shrink-0 grid place-items-center size-8 rounded-full hover:bg-gray-100 active:scale-95 transition text-gray-700"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="#E5E7EA"
              strokeWidth="1.0"
            />
            <path
              d="M10.5 8.5 L14.5 12 L10.5 15.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
