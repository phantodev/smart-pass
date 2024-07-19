import Reactotron from "reactotron-react-native";

Reactotron.configure().useReactNative().connect(); // controls connection & communication settings

Reactotron.clear(); // clear if we want to clear the logs

console.tron = Reactotron; // add tron to console
