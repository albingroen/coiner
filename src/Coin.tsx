import { Component, onMount } from "solid-js";
import { Icon } from "solid-heroicons";
import { x } from "solid-heroicons/solid";

type CoinProps = {
  coin: {
    marketCap: string;
    change: string;
    symbol: string;
    price: string;
    name: string;
    uuid: string;
  };
  onClose: () => void;
  coinId: string;
};

const Coin: Component<CoinProps> = ({ onClose, coin }) => {
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
  });

  return (
    <div>
      <div>
        <div className="flex items-start justify-between">
          <h2 class="text-2xl font-medium flex flex-wrap gap-1.5">
            <span>{coin.name}</span>
            <span className="text-gray-500">({coin.symbol})</span>
          </h2>

          <button
            class="text-gray-500 hover:text-gray-300 transition items-center"
            onClick={onClose}
          >
            <Icon class="w-6" path={x} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div className="p-3 bg-gray-700/40 rounded-lg ">
            <p className="text-gray-400 font-medium text-xs tracking-wide uppercase">
              Current price
            </p>
            <h3 class="text-xl mt-1 font-medium">
              {typeof coin.price === "string"
                ? `$${Number(coin.price).toLocaleString()}`
                : "No data"}
            </h3>
          </div>

          <div className="p-3 bg-gray-700/40 rounded-lg ">
            <p className="text-gray-400 font-medium text-xs tracking-wide uppercase">
              Change (30 days)
            </p>
            <h3
              class={`text-xl mt-1 font-medium ${
                typeof coin.change === "string"
                  ? Number(coin.change) > 0
                    ? "text-green-300"
                    : "text-red-400"
                  : ""
              }`}
            >
              {typeof coin.change === "string" ? `${coin.change}%` : "No data"}
            </h3>
          </div>

          <div className="p-3 bg-gray-700/40 rounded-lg ">
            <p className="text-gray-400 font-medium text-xs tracking-wide uppercase">
              Market cap
            </p>
            <h3 class="text-xl mt-1 font-medium">
              {typeof coin.marketCap === "string"
                ? Number(coin.marketCap).toLocaleString()
                : "No data"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
