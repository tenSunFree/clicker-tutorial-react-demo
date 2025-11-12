import React, { useState } from "react";
import flame from "../assets/flame.png";
import stars from "../assets/stars.png";

export default function FeaturedMenuSection({
  title = "人氣精選",
  subtitle = "目前最多人訂購的餐點",
  items = DEFAULT_ITEMS,
}) {
  const [modalItem, setModalItem] = useState(null);

  return (
    <section className="w-full pl-[140px] pt-2 bg-red-000">
      {/* 人氣精選 */}
      <div className="mb-1 flex items-center bg-yellow-00">
        <img src={flame} alt="logo" className="h-[15px]" />
        <div className="w-[5px]" />
        <h2 className="text-[20px] font-[1000] tracking-tight text-[#111827]">
          {title}
        </h2>
        <div className="w-[5px]" />
        <img src={stars} alt="logo" className="h-[16px]" />
      </div>

      {/* 目前最多人訂購的餐點 */}
      <p className="mb-5 text-[12px] text-[#6B7182] font-[500] bg-green-00">
        {subtitle}
      </p>

      {/* Grid 2x2 */}
      <div className="grid grid-cols-2 gap-4 bg-blue-000">
        {items.map((it) => (
          <Card key={it.id} {...it} onOpen={() => setModalItem(it)} />
        ))}
      </div>

      {/* Modal */}
      {modalItem && (
        <QuickModal onClose={() => setModalItem(null)}>
          <div className="flex gap-4 -bg-blue-100">
            {modalItem.img && (
              <img
                src={modalItem.img}
                alt={modalItem.title}
                className="h-24 w-24 rounded-lg object-cover"
              />
            )}
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-[#111827] line-clamp-2">
                {modalItem.title}
              </h3>
              <p className="mt-1 text-sm text-[#71777B] line-clamp-3">
                {modalItem.desc}
              </p>
              <p className="mt-2 font-medium text-[#111827]">
                從 $ {modalItem.price}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setModalItem(null)}
              className="rounded-lg px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200"
            >
              關閉
            </button>
            <button
              onClick={() => {
                // 這裡接你的加入購物車/加購邏輯
                setModalItem(null);
              }}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-[#111827] hover:bg-black"
            >
              加入
            </button>
          </div>
        </QuickModal>
      )}
    </section>
  );
}

function Card({ title, price, desc, img, qty, onOpen }) {
  const isSelected = typeof qty === "number" && qty > 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      className={[
        "group relative overflow-hidden rounded-2xl border border-[#E7EAEB] bg-white p-4",
        "shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-pointer",
        "transition-all duration-300 ease-out will-change-transform transform-gpu",
        "hover:scale-[1.05] hover:bg-[#ffebeb] hover:shadow-md hover:z-10 focus:outline-none focus:ring-2 focus:ring-red-300",
      ].join(" ")}
      style={{ minHeight: 168, transformOrigin: "center" }}
      aria-label={`${title}，點擊查看詳情`}
    >
      {/* 2/3 文案 + 1/3 圖片 */}
      <div className="grid grid-cols-3 items-start gap-3 bg-green-00">
        {/* 文案區：2/3 */}
        <div className="col-span-2 min-w-0 pr-2">
          <h3 className="truncate line-clamp-2 text-[13px] font-semibold leading-6 text-[#111827]">
            {title}
          </h3>
          <p className="line-clamp-2 text-[13px] font-medium text-[#111827]">
            從 $ {price}
          </p>
          <p className="line-clamp-2 text-[13px] leading-6 text-[#71777B]">
            {desc}
          </p>
        </div>

        {/* 圖片區：1/3（固定寬高、白色圓角背景，圖置中顯示） */}
        {img ? (
          <div className="justify-self-end">
            <div
              className="h-[96px] w-[96px] rounded-[6px] bg-white
                   flex items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover pointer-events-none select-none"
                draggable="false"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* 漂浮數量/加入按鈕 */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // 避免冒泡直接開彈窗
          onOpen();
        }}
        className={[
          "absolute bottom-4 right-4 inline-flex h-6 w-6 items-center justify-center rounded-full text-[16px] font-semibold shadow-sm transition-all",
          isSelected
            ? "bg-[#111827] text-white"
            : "bg-[#F3F4F6] text-[#111827]",
          "group-hover:scale-110",
        ].join(" ")}
        aria-label={isSelected ? `數量 ${qty}` : "加入"}
      >
        {isSelected ? qty : "+"}
      </button>
    </div>
  );
}

/** 超輕量 Modal（含 ESC / 背景點擊關閉） */
function QuickModal({ children, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-[min(92vw,560px)] rounded-2xl bg-white p-5 shadow-xl">
        {children}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// 範例資料
export const DEFAULT_ITEMS = [
  {
    id: "1",
    title: "套餐-勁辣雞腿堡 Spicy Chicken Filet …",
    price: 169,
    desc: "套餐含勁辣雞腿堡一份（中辣）、配餐選擇與 NT$38 飲料選擇。Comes with Side…",
    img: "https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mcd_taiwan/06f5043288e1cd5157f606c28d5ecf1d.jpg?width=500",
    qty: 0,
  },
  {
    id: "2",
    title: "套餐-雙層牛肉吉事堡 Double Cheese…",
    price: 163,
    desc: "套餐含雙層牛肉吉事堡一份、配餐選擇與 NT$38 飲料選擇。Comes with Side…",
    img: "https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mcd_taiwan/08aa42b6273761748453abc430917492.jpg?width=500",
    qty: 0,
  },
  {
    id: "3",
    title: "套餐-麥克雞塊(6塊) Chicken McNuggets…",
    price: 151,
    desc: "套餐含麥克雞塊(6塊)一份、配餐選擇與 NT$38 飲料選擇。Comes with Side…",
    img: "https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mcd_taiwan/4393cc9677ec0126f2f18ecde472e739.jpg?width=500",
    qty: 0,
  },
  {
    id: "4",
    title: "套餐-麥香雞 McChicken Meal",
    price: 139,
    desc: "套餐含麥香雞一份、配餐選擇與 NT$38 飲料選擇。Comes with Side choice…",
    img: "https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mcd_taiwan/e84e103b2aecb5325706b40157b580cb.jpg?width=500",
    qty: 0,
  },
];
