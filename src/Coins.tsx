import { Accessor, Component, For, Resource, Show } from "solid-js";
import { search as searchIcon } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";

type CoinsProps = {
  onChangeSearch: (value: string) => void;
  onClickCoin: (id: string) => void;
  onRefetch: (info: any) => void;
  search: Accessor<string>;
  coins: Resource<any>;
};

const Coins: Component<CoinsProps> = ({
  onChangeSearch,
  onClickCoin,
  onRefetch,
  search,
  coins,
}) => {
  return (
    <div class="flex flex-col h-screen">
      <div className="flex justify-between items-end mt-3">
        <h1 className="text-2xl font-semibold leading-none">All Coins</h1>
      </div>

      <div className="relative mt-3">
        <input
          className="shadow shadow-gray-300/20 dark:shadow-black/20 mt-1 bg-transparent placeholder-gray-300 dark:placeholder-gray-600 w-full border-gray-300 dark:border-gray-700 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-0 focus:border-gray-400 dark:focus:border-gray-500 transition"
          oninput={(e) => {
            onChangeSearch(e.currentTarget.value);
          }}
          placeholder="Ethereum"
          onkeydown={(e) => {
            if (e.key === "Enter") {
              onRefetch({ search: search() });
            }
          }}
          value={search()}
          id="search"
          type="text"
        />

        <Icon
          class="w-4 text-gray-500 absolute top-1/2 right-2 transform -translate-y-1.5"
          path={searchIcon}
        />
      </div>

      <Show when={coins}>
        <ul className="mt-4 space-y-3 flex-1 overflow-y-auto relative">
          <div className="fixed pointer-events-none inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />

          <For each={coins()?.coins}>
            {(coin: {
              iconUrl: string;
              price: number;
              uuid: string;
              name: string;
            }) => (
              <li
                role="button"
                class="border shadow-gray-100 border-gray-200 dark:border-transparent rounded-md bg-white dark:bg-gray-800 flex dark:shadow-gray-700 overflow-hidden group cursor-pointer focus:outline-none"
                onClick={() => {
                  onClickCoin(coin.uuid);
                }}
              >
                <div className="py-3 px-4 bg-gray-100 dark:bg-gray-900/30 group-hover:bg-blue-600/90 dark:group-hover:bg-blue-800 flex items-center justify-center border-r border-gray-200 dark:border-transparent">
                  <img
                    alt={`${coin.name} icon`}
                    src={coin.iconUrl}
                    class="w-6 block"
                  />
                </div>
                <div class="p-3 bg-white dark:bg-gray-800 group-hover:bg-blue-500 dark:group-hover:bg-blue-700 flex-1 flex flex-col justify-center">
                  <h4 class="font-medium group-hover:text-white">
                    {coin.name}
                  </h4>
                  <Show when={coin.price}>
                    <p class="text-sm font-medium leading-none text-gray-400 dark:text-gray-400 mt-1 group-hover:text-white/70">
                      ${coin.price}
                    </p>
                  </Show>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default Coins;
