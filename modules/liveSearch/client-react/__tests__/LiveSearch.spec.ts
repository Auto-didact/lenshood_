import { expect } from 'chai';
import { step } from 'mocha-steps';

import Renderer from '../../../../packages/client/src/testHelpers/Renderer';
import { updateContent } from '../../../../packages/client/src/testHelpers/testUtils';

describe('LiveSearch UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/LiveSearch');
  const content = updateContent(app.container);

  step('LiveSearch page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  step('LiveSearch page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the LiveSearch module');
  });
});
