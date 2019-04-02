import React from 'react';

import ClientModule from '@gqlapp/module-client-react';

import { Route } from 'react-router-dom';
import Pages from './containers/Pages';
import FAQ from './containers/FAQ';
import Mission from './containers/Mission';
import AboutUs from './containers/AboutUs';
import PrivacyRules from './containers/PrivacyRules';
import TermsOfService from './containers/TermsOfService';
import Renting from './containers/Renting';
import Lending from './containers/Lending';
import Blog from './containers/Blog';
import resources from './locales';

export default new ClientModule({
  route: [
    <Route exact path="/mission" component={Mission} />,
    <Route exact path="/about-us" component={AboutUs} />,
    <Route exact path="/terms-of-service" component={TermsOfService} />,
    <Route exact path="/privacy-rules" component={PrivacyRules} />,
    <Route exact path="/renting" component={Renting} />,
    <Route exact path="/lending" component={Lending} />,
    <Route exact path="/faq" component={FAQ} />,
    <Route exact path="/pages" component={Pages} />,
    <Route exact path="/blog" component={Blog} />
  ],
  localization: [
    {
      ns: 'pages',
      resources
    }
  ]
});
