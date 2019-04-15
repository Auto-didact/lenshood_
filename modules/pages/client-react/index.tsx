import React from 'react';

import ClientModule from '@gqlapp/module-client-react';

import { Route } from 'react-router-dom';

import Static from './containers/Static';

import resources from './locales';

export default new ClientModule({
  route: [
    <Route exact path="/mission" component={Static} />,
    <Route exact path="/about-us" component={Static} />,
    <Route exact path="/terms-of-service" component={Static} />,
    <Route exact path="/privacy-rules" component={Static} />,
    <Route exact path="/renting" component={Static} />,
    <Route exact path="/lending" component={Static} />,
    <Route exact path="/faq" component={Static} />,
    <Route path="/staticview" component={Static} />,
    <Route exact path="/blog" component={Static} />
  ],
  localization: [
    {
      ns: 'pages',
      resources
    }
  ]
});
