import { expect } from 'chai';
import { step } from 'mocha-steps';

import Renderer from '../../../../packages/client/src/testHelpers/Renderer';
import { updateContent } from '../../../../packages/client/src/testHelpers/testUtils';

describe('Referral UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Referral');
  const content = updateContent(app.container);

  step('Referral page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  step('Referral page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Referral module');
  });
});
