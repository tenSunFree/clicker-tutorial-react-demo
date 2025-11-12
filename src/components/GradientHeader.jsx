const GradientHeader = () => (
  <header className="relative w-full">
    {/* 上半部：你原本的淡灰 → 白漸層 */}
    <div className="h-10 w-full bg-[linear-gradient(180deg,#ededed_0%,#f7f7f7_45%,#ffffff_100%)]" />

    {/* 下半部：往下淡出的陰影，營造「沒有硬分隔」 */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-b from-black/10 to-transparent" />
  </header>
);

export default GradientHeader;
