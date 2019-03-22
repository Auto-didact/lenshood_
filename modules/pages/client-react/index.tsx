import React from 'react';

import ClientModule from '@gqlapp/module-client-react';

import { Route } from 'react-router-dom';
import Pages from './containers/Pages';
import resources from './locales';

export default new ClientModule({
  route: [<Route exact path="/pages" component={Pages} />],
  localization: [{ ns: 'pages', resources }]
});
