import { API_URL } from "./config";
import { Component, createResource, onMount, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import { x } from "solid-heroicons/solid";

type CoinProps = {
  initialCoin: {
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

async function getCoin(id: string) {
  return (await fetch(`${API_URL}/coins/${id}`)).json();
}

const Coin: Component<CoinProps> = ({ coinId, onClose, initialCoin }) => {
  const [coin] = createResource(coinId, () => getCoin(coinId));

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
      {() => {
        const c = coin();

        return (
          <div>
            <div className="flex items-start justify-between">
              <h2 class="text-2xl font-medium flex flex-wrap gap-1.5">
                <span>{initialCoin.name}</span>
                <span className="text-gray-500">({initialCoin.symbol})</span>
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
                  {typeof initialCoin.price === "string"
                    ? `$${Number(initialCoin.price).toLocaleString()}`
                    : "No data"}
                </h3>
              </div>

              <div className="p-3 bg-gray-700/40 rounded-lg ">
                <p className="text-gray-400 font-medium text-xs tracking-wide uppercase">
                  Change (30 days)
                </p>
                <h3
                  class={`text-xl mt-1 font-medium ${
                    typeof initialCoin.change === "string"
                      ? Number(initialCoin.change) > 0
                        ? "text-green-300"
                        : "text-red-400"
                      : ""
                  }`}
                >
                  {typeof initialCoin.change === "string"
                    ? `${initialCoin.change}%`
                    : "No data"}
                </h3>
              </div>

              <div className="p-3 bg-gray-700/40 rounded-lg ">
                <p className="text-gray-400 font-medium text-xs tracking-wide uppercase">
                  Market cap
                </p>
                <h3 class="text-xl mt-1 font-medium">
                  {typeof initialCoin.marketCap === "string"
                    ? Number(initialCoin.marketCap).toLocaleString()
                    : "No data"}
                </h3>
              </div>
            </div>
          </div>
        );
      }}
    </div>
  );
};

export default Coin;
