import React from 'react';
import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';
import './pageStyle.css';
interface MissionViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - Mission`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('mission.meta')}` }]}
  />
);

const MissionView = ({ t }: MissionViewProps) => {
  renderMetaData(t);
  return (
    <div
      style={{
        width: '100%',
        alignItems: 'center',
        fontFamily: 'Avenir Next',
        display: 'flex',
        flexDirection: 'column',
        border: 'none'
      }}
    >
      <div
        className="TermsContainer"
        style={{
          left: '50%',
          width: '100%',
          marginBottom: '32px',
          marginTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          border: 'none'
        }}
      >
        <section>
          <h1>{t('mission.meta.visionMission.content.p1.head')}</h1>
          <p>{t('mission.meta.visionMission.content.p1.p11')} </p>
          <p>{t('mission.meta.visionMission.content.p1.p12')}</p>
          <p>{t('mission.meta.visionMission.content.p1.p13')}</p>
        </section>
        <br />
        <section>
          <h2>{t('mission.meta.coreValues.text')}</h2>
          <h3>{t('mission.meta.coreValues.content.p1.head')}</h3>
          <p>{t('mission.meta.coreValues.content.p1.p11')}</p>
          <h3>{t('mission.meta.coreValues.content.p2.head')}</h3>
          <p>{t('mission.meta.coreValues.content.p2.p21')}</p>
          <h3>{t('mission.meta.coreValues.content.p3.head')}</h3>
          <p>{t('mission.meta.coreValues.content.p3.p31')}</p>
          <h3>{t('mission.meta.coreValues.content.p4.head')}</h3>
          <p>{t('mission.meta.coreValues.content.p4.p41')}</p>
          <h3>{t('mission.meta.coreValues.content.p5.head')}</h3>
          <p>{t('mission.meta.coreValues.content.p5.p51')}</p>
          <h3>{t('mission.meta.coreValues.content.p6.head')}</h3>
          <p>{t('mission.meta.coreValues.content.p6.p61')}</p>
        </section>
      </div>
    </div>
  );
};

export default MissionView;
