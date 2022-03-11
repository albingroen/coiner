import { Accessor, Component, For, Resource, Show } from "solid-js";
import { search as searchIcon } from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";
import Spinner from "./Spinner";

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
          id="search"
          className="shadow shadow-stone-300/20 dark:shadow-black/20 mt-1 bg-transparent placeholder-stone-300 dark:placeholder-stone-600 w-full border-stone-300 dark:border-stone-700 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-0 focus:border-stone-400 dark:focus:border-stone-500 transition"
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
          type="text"
        />

        <Icon
          class="w-4 text-stone-500 absolute top-1/2 right-2 transform -translate-y-1.5"
          path={searchIcon}
        />
      </div>

      <Show
        when={coins()}
        fallback={
          <div class="flex justify-center mt-5">
            <Spinner />
          </div>
        }
      >
        <ul className="fade-in space-y-3 flex-1 overflow-y-auto relative pb-12 mt-2">
          <div className="fixed pointer-events-none inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900/50" />

          <For each={coins()?.coins}>
            {(coin: {
              iconUrl: string;
              price: number;
              uuid: string;
              name: string;
            }) => (
              <li
                role="button"
                class="border shadow-stone-100 border-stone-200 dark:border-transparent rounded-md bg-white dark:bg-stone-800 flex dark:shadow-stone-700 overflow-hidden group cursor-pointer focus:outline-none"
                onClick={() => {
                  onClickCoin(coin.uuid);
                }}
              >
                <div className="py-3 px-4 bg-stone-100 dark:bg-stone-900/30 group-hover:bg-emerald-600/90 dark:group-hover:bg-emerald-800 flex items-center justify-center border-r border-stone-200 dark:border-transparent">
                  <img
                    alt={`${coin.name} icon`}
                    src={coin.iconUrl}
                    class="w-6 block"
                  />
                </div>
                <div class="p-3 bg-white dark:bg-stone-800 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-700 flex-1 flex flex-col justify-center">
                  <h4 class="font-medium group-hover:text-white">
                    {coin.name}
                  </h4>
                  <Show when={coin.price}>
                    <p class="text-sm font-medium leading-none text-stone-400 dark:text-stone-400 mt-1 group-hover:text-white/70">
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
