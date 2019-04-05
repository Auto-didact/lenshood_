import { expect } from 'chai';
import { step } from 'mocha-steps';

import Renderer from '../../../../packages/client/src/testHelpers/Renderer';
import { updateContent } from '../../../../packages/client/src/testHelpers/testUtils';

describe('Listing UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Listing');
  const content = updateContent(app.container);

  step('Listing page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  step('Listing page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Listing module');
  });
});
