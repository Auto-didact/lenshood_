import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { Tabs } from 'antd';
import Borrowing from './components/Borrowing';
import Lending from './components/Lending';
import settings from '../../../../settings';

const { TabPane } = Tabs;

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('lending.title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const BorrowingAndLendingView = props => {
  useEffect(() => {
    global.window.scrollTo(0, 0);
  });
  const keyParser = () => {
    if (props.match.path === '/renting') {
      return 1;
    } else {
      return 2;
    }
  };
  const t = props.t;

  return (
    <div
      style={{
        width: '100%',
        alignItems: 'center',

        display: 'flex',
        flexDirection: 'column',
        border: 'none'
      }}
    >
      {renderMetaData(t)}
      <div
        className="TermsContainer"
        style={{
          left: '50%',
          width: '100%',
          marginBottom: '32px',
          marginTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          maxWidth: '1000px',
          display: 'flex',
          flexDirection: 'column',
          border: 'none'
        }}
      >
        <h1
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          {t('lending.title')}
        </h1>
        <Tabs
          defaultActiveKey={`${keyParser()}`}
          size="large"
          tabBarStyle={{
            maxWidth: '1000px',
            display: 'flex',
            justifyContent: 'center',
            color: '#111'
          }}
        >
          <TabPane tab="For Borrowers" key="1">
            <Borrowing t={t} />
          </TabPane>

          <TabPane tab="For Lenders" key="2">
            <Lending t={t} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default BorrowingAndLendingView;
