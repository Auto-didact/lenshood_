import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../../settings';
import { Button, Divider, Card } from 'antd';

interface HomeHeadProps {
  t: TranslateFunction;
  image: string;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${'Home'}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const HomeHead = ({ t, image }: HomeHeadProps) => {
  return (
    <div className="home-head-container">
      {renderMetaData(t)}
      <div className="home-head">
        <img className="home-head-image" src={image} alt="" />
        <div className="home-image-content">
          <div className="home-image-contentText">Earn Money By Lending.</div>
          <div className="home-image-divider-1 home-content-divider-margin">
            <Divider />
          </div>
          <div className="home-image-contentText2">
            The safest way to lend and rent your cameras within a trusted community of like minded people.
          </div>
          <div className="home-image-divider-2 home-content-divider-margin">
            <Divider />
          </div>
          <Button type="primary" className="home-image-content-button " size="large">
            SignUp
          </Button>
          <div className="home-image-divider-3 home-content-divider-margin">
            <Divider />
          </div>
          <div className="home-image-content-question">Already Have An Account?</div>
          <Button
            type="default"
            className="home-image-content-button home-image-content-button-login"
            size="default"
            style={{ display: 'block' }}
          >
            Login
          </Button>
        </div>
      </div>
      <img className="waves wave1" src={require('../../images/home/waves.png')} />
      <img className="waves wave2" src={require('../../images/home/waves.png')} />
      <img className="waves wave3" src={require('../../images/home/waves.png')} />
    </div>
  );
};

export default HomeHead;
