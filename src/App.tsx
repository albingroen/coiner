import { Component, createResource, For, Show } from "solid-js";

const API_URL = "http://localhost:1337";

async function getCoins(...params: any) {
  const search = params[1]?.refetching?.search ?? "";
  return (await fetch(`${API_URL}/coins?search=${search}`)).json();
}

const App: Component = () => {
  const [coins, { refetch }] = createResource("coins", getCoins);

  return (
    <main className="p-6">
      <div className="flex justify-between items-baseline">
        <h1 className="text-2xl">Welcome back</h1>
        <span>🪙</span>
      </div>
      <div class="mt-2">
        <label class="text-sm text-gray-400" htmlFor="search">
          Search a coin
        </label>
        <input
          className="shadow shadow-black/20 mt-1 bg-transparent placeholder:text-gray-700 w-full border-gray-800 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-0 focus:border-gray-700 transition focus:placeholder-gray-800/90"
          placeholder="Ethereum"
          onkeydown={(e) => {
            if (e.key === "Enter") {
              refetch({ search: e.currentTarget.value });
            }
          }}
          id="search"
          type="text"
        />
      </div>

      <Show when={coins()}>
        <ul className="mt-4 space-y-3">
          <For each={coins().coins}>
            {(coin: any) => (
              <li
                role="button"
                class="rounded-md bg-gray-800 flex shadow-sm shadow-gray-700 overflow-hidden group cursor-pointer"
              >
                <div className="py-3 px-4 bg-gray-900/30 group-hover:bg-emerald-800 flex items-center justify-center">
                  <img
                    class="w-6 block grayscale group-hover:filter-none"
                    alt={`${coin.name} icon`}
                    src={coin.iconUrl}
                  />
                </div>
                <div class="p-3 bg-gray-800 group-hover:bg-emerald-700 flex-1 flex flex-col justify-center">
                  <h4>{coin.name}</h4>
                  <Show when={coin.price}>
                    <p class="text-sm leading-none text-gray-500 mt-1 group-hover:text-white/70">
                      ${coin.price}
                    </p>
                  </Show>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </main>
  );
};

export default App;
