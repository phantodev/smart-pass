import Reactotron from "reactotron-react-native";
import {
  QueryClientManager,
  reactotronReactQuery,
} from "reactotron-react-query";
import { queryClient } from "./configs/queryClient";

const queryClientManager = new QueryClientManager({ queryClient });

Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .connect(); // controls connection & communication settings

Reactotron.clear(); // clear if we want to clear the logs

console.tron = Reactotron; // add tron to console
