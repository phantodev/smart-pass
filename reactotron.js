// import Reactotron from "reactotron-react-native";
// import reactotronZustand from "reactotron-plugin-zustand";
// import { useTicketStore } from "./store/index";

// Reactotron.configure({ name: "Project name" })
//   .useReactNative()
//   .use(
//     reactotronZustand({
//       stores: [{ name: "ticketStore", store: useTicketStore }],
//     })
//   )
//   .connect();

// console.tron = Reactotron;

import Reactotron from "reactotron-react-native";
import {
  QueryClientManager,
  reactotronReactQuery,
} from "reactotron-react-query";
import { queryClient } from "./queryClient";

const queryClientManager = new QueryClientManager({
  // @ts-ignore
  queryClient,
});

Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .connect();

console.tron = Reactotron;
