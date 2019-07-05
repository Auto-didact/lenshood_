import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../../settings';
import { Button } from 'antd';

interface HomeHeadProps {
  t: TranslateFunction;
  image: string;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const HomeHead = ({ t, image }: HomeHeadProps) => {
  return (
    <>
      <div className="home-head">
        <img className="home-head-image" src={image} alt="" />
        <div className="home-image-content">
          <div className="home-image-contentText">Earn Money By Lending.</div>
          <div className="home-image-contentText2">
            The safest way to lend and rent your cameras within a trusted community of like minded people.
          </div>
          <Button type="primary" className="home-image-content-button" size="large">
            SignUp
          </Button>
          <div className="home-image-content-question">Already Have An Account?</div>
          <Button type="default" className="home-image-content-button" size="default">
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomeHead;
