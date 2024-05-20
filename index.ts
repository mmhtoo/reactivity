import { reactive } from "./packages/reactive";

async function main() {
  const count = reactive(0);

  const unsubscribeNow = count.subscribe((newValue) => {
    console.log("Now is ", newValue);
  });
  count.subscribe((newValue) => {
    console.log("Value is ", newValue);
  });

  count.value++;
  count.value--;
  count.value = 10;
  unsubscribeNow();
  count.value = 100;
}

main();
