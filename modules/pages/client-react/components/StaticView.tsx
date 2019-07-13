import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutUs from '../containers/AboutUs';
import Blog from '../containers/Blog';
import FAQ from '../containers/FAQ';
import BorrowingAndLending from '../containers/BorrowingAndLending';
import Mission from '../containers/Mission';
// import Pages from '../containers/Pages';
import PrivacyRules from '../containers/PrivacyRules';
import TermsOfService from '../containers/TermsOfService';
import TrustAndSafety from '../containers/TrustAndSafety';
// import { Layout, Menu, Breadcrumb, Icon, Row } from 'antd';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';
import FeautredUsers from '../containers/FeautredUsers';

// import SiderC from './Sider';

// const { Content } = Layout;

interface StaticViewProps {
  t: TranslateFunction;
  match: any;
}

class StaticView extends React.Component<StaticViewProps> {
  public state = {
    data: this.props
  };
  public path = this.state.data.match.path;

  public render() {
    return (
      <PageLayout>
        <Switch>
          {/* <Route exact path="/featured-listing" component={FeaturedListing} />, */}
          <Route exact path="/featured-users" component={FeautredUsers} />,
          <Route exact path="/mission" component={Mission} />,
          <Route exact path="/about-us" component={AboutUs} />,
          <Route exact path="/terms-of-service" component={TermsOfService} />,
          <Route exact path="/privacy-rules" component={PrivacyRules} />,
          <Route exact path="/renting" component={BorrowingAndLending} />,
          <Route exact path="/lending" component={BorrowingAndLending} />,
          <Route exact path="/TrustAndSafety" component={TrustAndSafety} />,
          <Route exact path="/faq" component={FAQ} />,
          <Route exact path="/blog" component={Blog} />
        </Switch>
      </PageLayout>
    );
  }
}

export default StaticView;
