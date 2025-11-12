import React, { useState } from "react";
import emptyShopCart from "../assets/empty_shop_cart.png";
import freeDelivery from "../assets/free_delivery.png";

/**
 * EmptyCartPanel — 仿圖示購物車側欄（行動版樣式）
 * Tailwind: ^4.1.13  / tailwindcss-animate: ^1.0.7
 *
 * 用法：
 * <EmptyCartPanel />
 */
export default function EmptyCartPanel({
  deliveryLabel = "外送", // 上方分頁：外送
  pickupLabel = "外帶自取", // 上方分頁：外帶自取
  pickupHint = "尚未提供服務", // 外帶自取停用時顯示的小提示
  pickupEnabled = true, // 是否開放外帶
  title = "購物車目前空空的", // 主標題
  lines = ["快將美食、⽣鮮雜貨加入購物", "車讓foodpanda幫你『送』～"], // 說明段落
  minFree = 179, // 免運門檻
  total = 0, // 總金額（下方 footer 會用到）
  onViewDetails, // 查看明細 callback
  onCheckout, // 結帳 callback
  illu, // 替換預設插畫的圖片路徑
}) {
  const canCheckout = total > 0; // 金額大於 0 才能按結帳

  // JS: 直接給字串，沒有 <...> 泛型
  const [tab, setTab] = useState("delivery"); // "delivery" | "pickup"

  const base =
    "rounded-lg py-[10px] text-center text-xs font-medium transition";
  const selected = "bg-white border border-zinc-300 text-zinc-900 shadow-sm";
  const unselected = "bg-transparent text-zinc-500 hover:bg-white/40";

  return (
    <aside
      className="
        w-[260px]    // 固定寬度 380px（行動版側欄感）
        max-w-full   // 在小螢幕時不要超出畫面寬
        rounded-xl   // 外框 12px 圓角
        border border-zinc-200 // 淺灰邊框
        bg-white     // 白底
        shadow-sm    // 輕微陰影
        p-[10px] 
        relative   // 供內部絕對定位使用
      "
    >
      {/* Scrollable body */}
      <div className="h-[300px] overflow-y-scroll pr-2 custom-scrollbar">
        {/* Tabs */}
        <div
          className="
          grid grid-cols-2 // 兩欄格線：左「外送」右「外帶自取」
          rounded-t-xl     // 上邊緣 12px 圓角（和外框對齊）
          bg-zinc-50       // 很淺的灰底，凸顯 tabs 與內容區分
          p-1              // 內距 4px，讓按鈕有間距
          items-center   // 垂直置中
        "
        >
          {/* 外送 */}
          <button
            type="button"
            role="tab"
            aria-selected={tab === "delivery"}
            aria-current={tab === "delivery" ? "page" : undefined}
            onClick={() => setTab("delivery")}
            className={`${base} ${tab === "delivery" ? selected : unselected}`}
          >
            {deliveryLabel}
          </button>

          {/* 外帶自取 */}
          <button
            type="button"
            role="tab"
            aria-selected={tab === "pickup"}
            aria-current={tab === "pickup" ? "page" : undefined}
            onClick={() => setTab("pickup")}
            disabled={!pickupEnabled}
            className={`${base} ${tab === "pickup" ? selected : unselected} ${
              !pickupEnabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title={!pickupEnabled ? "尚未提供服務" : undefined}
          >
            {pickupLabel}
          </button>
        </div>

        {/* 臨時塞個高區塊，確認一定會出現捲軸 */}
        <div className="h-[50px]" />

        {/* <Illustration illu={illu} />{" "} */}
        <img
          src={emptyShopCart}
          alt="emptyShopCart"
          className="mx-auto w-[60px]"
        />

        {/* 上方插畫：預設熊貓 + 籃子，或使用傳入圖片 */}
        <h2
          className="
            mt-4             // 上邊距 16px
            text-center      // 置中
            text-[14px]      // 18px
            font-[1000]     // 特粗字
            text-zinc-900    // 深灰字
          "
        >
          {title}
        </h2>
        <div
          className="
            mt-2               // 與標題距離 8px
            space-y-1          // 內部 <p> 垂直間距 4px
            text-center        // 置中
            text-[11px]        // 12px 字級
            leading-relaxed    // 行高略鬆
            text-zinc-600      // 次要內文顏色
            font-[600]         // 中粗字
          "
        >
          {lines.map((t, i) => (
            <p key={i}>{t}</p> // 多段文字說明
          ))}
        </div>
        {/* 提示列 */}
        <div
          className="
            mt-3                 // 與上方內容距離 24px
            flex items-start gap-2 // 橫排、上對齊、元素間距 8px
            px-1 py-1            // 內距（左右 12px、上下 8px）
          "
        >
          <img
            src={freeDelivery}
            alt="freeDelivery"
            className="mx-auto w-[17px]"
          />
          <p className="text-[10px] text-zinc-700 font-[700]">
            {/* 12px 字，深一點的灰，提升可讀性 */}${minFree} 以上訂單{" "}
            免費外送，趕緊點起來！
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          sticky bottom-0       // 黏在容器底部（內容捲動時，footer 固定於底）
          border-t border-zinc-200 // 上邊框，區隔內容與底部
          bg-white              // 白底（遮住下方內容）
          p-2                   // 內距 16px
        "
      >
        <div
          className="
            flex items-center justify-between // 左右對齊：左「總計」右金額
            text-[15px]                       // 15px 中間字級
            bg-yellow-0                       // 背景色（測試用）
          "
        >
          <span className="text-[12px] font-[700] text-zinc-800">總計</span>{" "}
          {/* 深灰字 */}
          <span className="text-[12px] font-[700] text-zinc-800">
            {/* 半粗、深灰，數字以 toLocaleString 加千分位 */}$
            {total.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          onClick={onViewDetails}
          className="
            w-max              // 寬度以內容為準
            text-left          // 文字靠左（在 w-max 下主要是語意）
            text-[12px] font-[700] text-zinc-800  // 12px、半粗、深灰字
            underline decoration-black underline-offset-2 // 底線樣式
            bg-green-50        // 背景色（測試用）
          "
        >
          查看明細
        </button>

        <button
          type="button"
          onClick={onCheckout}
          disabled={!canCheckout} // 無法結帳時停用
          className="
            mt-3               // 與上方元素距離 12px
            w-full              // 主 CTA 滿寬
            rounded-[6px]          // 10px 圓角
            py-2                // 垂直內距 12px
            text-center         // 文字置中
            text-sm             // 14px
            font-semibold       // 半粗
            text-[#B9BCBE]       // 預設淺灰字（停用時）
            disabled:cursor-not-allowed // 停用時禁止游標
            disabled:opacity-100        // 停用仍維持 100% 不透明（避免灰底太淡）
            aria-disabled:opacity-100   // 輔助（若用 aria-disabled 也保持同視覺）
            data-[active=true]:bg-pink-600 // 當 data-active=true 時轉粉紅底（主色）
            data-[active=true]:text-white  // 並切換白字
            bg-[#D3D5D7]          // 預設灰底
          "
          aria-disabled={!canCheckout} // 無障礙語意：不可互動
          data-active={canCheckout ? "true" : "false"} // 用 data 屬性切換樣式（如上兩行）
        >
          查看付款方式及地址
        </button>
      </div>
    </aside>
  );
}

/* --------------------------------------------------------- */
// 小插畫：熊貓 + 購物籃（可用自定圖片覆蓋）
function Illustration({ illu }) {
  if (illu)
    return (
      <div className="flex items-center justify-center">
        {/* 外圍容器：置中 */}
        <img
          src={illu}
          alt="空購物車"
          className="
          h-44 w-44  // 固定 176x176
          object-contain // 保持比例完整顯示
        "
        />
      </div>
    );

  return (
    <div
      className="
        relative      // 供內部絕對定位使用
        mx-auto       // 水平置中
        h-44 w-44     // 176x176 畫布
      "
    >
      {/* 籃子（SVG） */}
      <svg
        viewBox="0 0 120 120" // 定義內部座標系
        className="absolute inset-0 h-full w-full" // 絕對鋪滿容器
        aria-hidden // 純裝飾
      >
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            {/* 垂直線性漸層：上粉淺、下粉深 */}
            <stop offset="0%" stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>

        {/* 籃身：有圓角的矩形，使用漸層填色 */}
        <rect x="18" y="62" width="84" height="34" rx="6" fill="url(#g)" />

        {/* 籃緣條：上方實心條 */}
        <rect x="24" y="56" width="72" height="8" rx="4" fill="#f472b6" />

        {/* 直立籃條：用 7 根直條陣列產生（顏色稍深，增加層次） */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={28 + i * 10} // 每根相隔 10px，從 28 開始
            y="66"
            width="4"
            height="26"
            rx="2"
            fill="#fb7185"
          />
        ))}
      </svg>

      {/* 熊貓（表情符號 + 圓底） */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
        {/* 白色圓底：做出熊貓的臉背景 */}
        <div
          className="
            mx-auto
            h-20 w-20                     // 80x80 圓
            rounded-full                  // 圓形
            bg-white                      // 白底
            shadow-[0_2px_8px_rgba(0,0,0,0.08)] // 自訂陰影
            ring-1 ring-zinc-200          // 細邊描邊
          "
        />
        {/* 熊貓符號：放在圓底中央（微向上 1px，視覺更貼合） */}
        <div
          className="
            absolute inset-0 -top-1 // 與白圓重疊並微往上
            flex items-center justify-center // 完全置中
            h-20 w-20                 // 尺寸與白圓相同
            text-5xl                  // 48px 字級（🐼）
          "
        >
          🐼
        </div>
      </div>
    </div>
  );
}
