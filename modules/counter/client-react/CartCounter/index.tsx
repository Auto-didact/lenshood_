import React from "react";
import CounterModule from "../CounterModule";
import CartCounter from "./containers/CartCounter";

export default new CounterModule({
  counterComponent: [<CartCounter />]
});
