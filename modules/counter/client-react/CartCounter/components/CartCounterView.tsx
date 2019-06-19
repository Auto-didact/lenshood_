import React from "react";

import CartCount from "./CartCount";

interface ViewProps {
  counter: any;
  loading: boolean;
}

export const CartCounterView = ({ counter, loading }: ViewProps) => {
  if (loading) {
    return <CartCount count={0} />;
  } else {
    return <CartCount count={counter.amount} />;
  }
};
