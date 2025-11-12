import { useEffect, useRef, useReducer } from "react";
import LogoBar from "./LogoBar";
import { reducer, initialState } from "./reducer";
import Clicker from "./Clicker";
import Autoclicker from "./Autoclicker";
import GradientHeader from "./components/GradientHeader";
import SearchBar from "./SearchBar";
import FeaturedMenuSection, {
  DEFAULT_ITEMS,
} from "./components/FeaturedMenuSection";
import EmptyCartPanel from "./components/EmptyCartPanel";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const callback = useRef();

  useEffect(() => {
    callback.current = () => {
      const currentClics = state.clicks.amount;
      const totalCount = Object.keys(state).reduce(
        (acc, cur, idx) =>
          idx === 0 ? acc : acc + state[cur].amount * (state[cur].cost * 0.1),
        currentClics
      );

      dispatch({ type: "update", payload: totalCount });
    };
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => callback.current(), 1000);
    return () => clearInterval(interval);
  }, [callback]);
  ///
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* 兩段 header 包在同一個 sticky 容器 */}
      <header className="sticky top-0 z-50">
        <LogoBar />
        {/* 
        <GradientHeader />
         */}
        <SearchBar
          items={[
            { label: "人氣精選 ✨", count: 7 },
            { label: "優惠推薦 Offers", count: 4 },
            { label: "麥當勞分享餐 Happy Sharing Meal", count: 6 },
            { label: "套餐 Combo Meal", count: 18 },
            { label: "Happy Meal", count: 3 },
            { label: "單點 A La Carte", count: 6 },
            { label: "飲料 Beverage", count: 22 },
            { label: "購物袋專區 Bag", count: 4 },
            { label: "客製訂單(請勿下訂)", count: 1 },
            { label: "注意事項(請勿下訂)", count: 10 },
            { label: "產品標示(請勿下訂)", count: 19 },
          ]}
          defaultIndex={0}
          onChange={(idx) => console.log("active:", idx)}
          onSearch={(q) => console.log("q:", q)}
        />
      </header>

      {/* 手機直排 / ≥lg 橫排 */}
      <div className="flex flex-col gap-6 lg:flex-row mt-2">
        <div className="flex-203">
          <FeaturedMenuSection
            title="人氣精選"
            subtitle="目前最多人訂購的餐點"
            items={DEFAULT_ITEMS} // 換成你的資料即可
          />
        </div>
        <div className="flex-97 bg-yellow-0 mt-[8px]">
          <EmptyCartPanel
            onViewDetails={() => alert("查看明細")}
            onCheckout={() => alert("結帳流程")}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
