import address from "./assets/ic_address.png";
import downArrow from "./assets/ic_down_arrow.png";
import language from "./assets/ic_language.png";
import logo from "./assets/ic_logo.png";
import love from "./assets/ic_love.png";
import people from "./assets/ic_people.png";
import shopping from "./assets/ic_shopping.png";
import time from "./assets/ic_time.png";

const IMG = {
  logo: "srcassetsic_logo.png",
  map: "https://img.icons8.com/?size=24&id=85474&format=png",
  clock: "https://img.icons8.com/?size=24&id=85036&format=png",
  user: "https://img.icons8.com/?size=24&id=23264&format=png",
  chevron: "https://img.icons8.com/?size=16&id=81142&format=png",
  globe: "https://img.icons8.com/?size=24&id=59739&format=png",
  heart: "https://img.icons8.com/?size=28&id=86816&format=png",
  bag: "https://img.icons8.com/?size=24&id=85170&format=png",
};

const LogoBar = () => (
  <header className="flex w-full h-[50px] bg-white items-center gap-2 px-[140px] [box-shadow:0_4px_12px_rgba(0,0,0,0.08)]">
    <img src={logo} alt="logo" className="h-[22px]" />

    <div className="flex-[1_1_0%]" />

    <div className="hidden md:flex items-center gap-2 text-gray-700 background[#ff2d87]">
      <img src={address} alt="logo" className="h-[14px]" />
      <span className="text-[11px] font-bold">
        家 106 台北市 大安區 仁愛路四段 123 號 5 樓
      </span>
    </div>

    <div className="hidden sm:flex items-center gap-2 text-gray-700">
      <img src={time} alt="logo" className="h-[14px]" />
      <span className="text-[11px] font-bold">時間 標準</span>
    </div>

    <div className="flex-[1_1_0%]" />

    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-[4px] px-2 py-1 text-gray-800 
        hover:shadow-md hover:shadow-gray-900/10 hover:bg-gray-50"
    >
      <img src={people} alt="logo" className="h-[14px]" />
      <span className="text-[11px] font-bold">Sun</span>
      <img src={downArrow} alt="logo" className="h-[6px]" />
    </button>

    <button
      type="button"
      className="hidden sm:inline-flex items-center gap-1 rounded-full px-2 py-1 text-gray-800 hover:bg-gray-50"
    >
      <img src={language} alt="logo" className="h-[14px]" />
      <span className="text-[11px] font-bold">ZH</span>
      <img src={downArrow} alt="logo" className="h-[6px]" />
    </button>

    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-50"
      aria-label="收藏"
    >
      <img src={love} alt="logo" className="h-[14px]" />
    </button>

    {/* 購物袋按鈕
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-300"
      aria-label="購物袋"
      disabled
      title="購物袋目前為空"
    >
      <img src={shopping} alt="logo" className="h-[14px]" />
    </button>
    */}
  </header>
);

export default LogoBar;
