import React from "react";
import chai from "chai";
import { step } from "mocha-steps";
import { render } from "react-testing-library";

import Renderer from "../../../../../packages/client/src/testHelpers/Renderer";
import { COUNTER_SUBSCRIPTION } from "@gqlapp/counter-common";
import CartCounter from "../containers/CartCounter";

chai.should();

const COUNTER_APOLLO_VALUE = 11;
const COUNTER_SUBSCRIPTION_VALUE = 17;

const mocks = {
  Counter: () => ({
    amount: COUNTER_APOLLO_VALUE,
    __typename: "Counter"
  })
};

describe("Cart counter example UI works", () => {
  const renderer = new Renderer(mocks, {});
  let app: any;
  let container: any;
  let content: any;

  beforeEach(() => {
    if (app) {
      container = app.container;
      content = container.firstChild;
    }
  });

  step("Counter section renders without data", () => {
    app = render(renderer.withApollo(<CartCounter />));
    container = app.container;
    content = container.firstChild;
    content.textContent.should.has.string("loading");
  });

  step("Counter section renders with queries data", () => {
    content.textContent.should.has.string(
      `The current counter value is ${COUNTER_APOLLO_VALUE}.`
    );
  });

  step("Check subscribed to counter updates", () => {
    renderer.getSubscriptions(COUNTER_SUBSCRIPTION).should.has.lengthOf(1);
  });

  step("Updates counter on data from subscription", () => {
    const subscription = renderer.getSubscriptions(COUNTER_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        counterUpdated: {
          amount: COUNTER_SUBSCRIPTION_VALUE,
          __typename: "Counter"
        }
      }
    });
    content.textContent.should.has.string(
      `The current counter value is ${COUNTER_SUBSCRIPTION_VALUE}.`
    );
  });

  step("Unmount section and check unsubscription", () => {
    app.unmount();
    renderer.getSubscriptions(COUNTER_SUBSCRIPTION).should.has.lengthOf(0);
  });
});
