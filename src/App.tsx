import Coin from "./Coin";
import Coins from "./Coins";
import { API_URL } from "./config";
import { Component, createResource, createSignal, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import Spinner from "./Spinner";

async function getCoins(...params: any) {
  const search = params[1]?.refetching?.search ?? "";
  return (await fetch(`${API_URL}/coins?search=${search}`)).json();
}

const App: Component = () => {
  const [coins, { refetch }] = createResource("coins", getCoins);

  const [search, setSearch] = createSignal<string>("");
  const [coinId, setCoinId] = createSignal<string>();

  return (
    <main className="dark antialiased">
      <div class="bg-gradient-to-b dark:from-stone-900 dark:via-stone-900 dark:to-stone-800 dark:text-white p-6 h-screen overflow-hidden">
        <Transition
          onEnter={(el, done) => {
            const a = el.animate(
              [
                { transform: "translateY(500px)" },
                { transform: "translateY(0px)" },
              ],
              {
                duration: 300,
                easing: "ease-in-out",
              }
            );
            a.finished.then(done);
          }}
          onExit={(el, done) => {
            const a = el.animate(
              [
                { transform: "translateY(0px)" },
                { transform: "translateY(1000px)" },
              ],
              {
                duration: 300,
                easing: "ease-in-out",
              }
            );
            a.finished.then(done);
          }}
        >
          <Show when={coinId()}>
            <div class="fixed inset-0 z-20 pt-20">
              <div
                className="inset-0 z-10 absolute"
                onClick={() => {
                  setCoinId(undefined);
                }}
              />

              <div class="bg-stone-800 z-20 absolute rounded-tl-2xl rounded-tr-2xl h-full w-full p-6 overflow-auto pb-32">
                <Coin
                  coinId={coinId()!}
                  coin={coins()?.coins.find((c) => c.uuid === coinId())}
                  onClose={() => {
                    setCoinId(undefined);
                  }}
                />
              </div>
            </div>
          </Show>
        </Transition>

        <Coins
          onChangeSearch={setSearch}
          onClickCoin={setCoinId}
          onRefetch={refetch}
          search={search}
          coins={coins}
        />
      </div>
    </main>
  );
};

export default App;
