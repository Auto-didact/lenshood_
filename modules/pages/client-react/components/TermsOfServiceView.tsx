import React from 'react';
import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';
// import { SiderC } from './Sider';
import './pageStyle.css';

interface TermsOfServiceViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('terms_of_service.title')}`}
    meta={[
      {
        name: 'description',
        content: `${settings.app.name} - ${t('terms_of_service.meta')}`
      }
    ]}
  />
);

const TermsOfServiceView = ({ t }: TermsOfServiceViewProps) => {
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
        <h1 style={{}}>{t('terms_of_service.title')}</h1>
        <h2 style={{}}>{t('terms_of_service.meta.overview.text')}</h2>
        <p>{t('terms_of_service.meta.overview.content.p1.head')}</p>
        <ul>
          <li>{t('terms_of_service.meta.overview.content.p1.l1')}</li>
          <li>{t('terms_of_service.meta.overview.content.p1.l2')}</li>
          <li>{t('terms_of_service.meta.overview.content.p1.l3')}</li>
          <li>{t('terms_of_service.meta.overview.content.p1.l4')}</li>
          <li>{t('terms_of_service.meta.overview.content.p1.l5')}</li>
        </ul>
        <br />
        <h2>{t('terms_of_service.meta.role_of_lenshood.text')}</h2>
        <p>{t('terms_of_service.meta.role_of_lenshood.content.p1.head')}</p>
        <ol>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p1.l1')}</li>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p1.l2')}</li>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p1.l3')}</li>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p1.l4')}</li>
        </ol>
        <p>{t('terms_of_service.meta.role_of_lenshood.content.p2.head')}</p>
        <ol>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p2.l1')}</li>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p2.l2')}</li>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p2.l3')}</li>
        </ol>
        <p>{t('terms_of_service.meta.role_of_lenshood.content.p3.head')}</p>
        <ol>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p3.l1')}</li>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p3.l2')}</li>
          <li>{t('terms_of_service.meta.role_of_lenshood.content.p3.l3')}</li>
        </ol>
        <br />
        <h2>{t('terms_of_service.meta.rights_in_the_lenshood_service.text')}</h2>
        <ol>
          <li>{t('terms_of_service.meta.rights_in_the_lenshood_service.content.p1.l1')}</li>
          <li>{t('terms_of_service.meta.rights_in_the_lenshood_service.content.p1.l2')}</li>
          <li>{t('terms_of_service.meta.rights_in_the_lenshood_service.content.p1.l3')}</li>
        </ol>
        <br />
        <h2>{t('terms_of_service.meta.fees_and_comission.text')}</h2>
        <ol>
          <li>
            {t('terms_of_service.meta.fees_and_comission.content.p1.head')}
            <ul>
              <li>{t('terms_of_service.meta.fees_and_comission.content.p1.l1')}</li>
            </ul>
          </li>
          <li>{t('terms_of_service.meta.fees_and_comission.content.p1.l2')}</li>
          <li>{t('terms_of_service.meta.fees_and_comission.content.p1.l3')}</li>
          <li>{t('terms_of_service.meta.fees_and_comission.content.p1.l4')}</li>
          <li>{t('terms_of_service.meta.fees_and_comission.content.p1.l5')}</li>
          <li>{t('terms_of_service.meta.fees_and_comission.content.p1.l6')}</li>
          <li>{t('terms_of_service.meta.fees_and_comission.content.p1.l7')}</li>
        </ol>
        <br />
        <h2>{t('terms_of_service.meta.your_liability.text')}</h2>
        <ol>
          <li>{t('terms_of_service.meta.your_liability.content.p1.l1')}</li>
          <li>{t('terms_of_service.meta.your_liability.content.p1.l2')}</li>
          <li>{t('terms_of_service.meta.your_liability.content.p1.l3')}</li>
          <li>{t('terms_of_service.meta.your_liability.content.p1.l4')}</li>
          <li>{t('terms_of_service.meta.your_liability.content.p1.l5')}</li>
          <li>{t('terms_of_service.meta.your_liability.content.p1.l6')}</li>
          <li>{t('terms_of_service.meta.your_liability.content.p1.l7')}</li>
        </ol>
        <br />
        <h2>{t('terms_of_service.meta.our_liability.text')}</h2>
        <ol>
          <li>{t('terms_of_service.meta.our_liability.content.p1.l1')}</li>
          <li>{t('terms_of_service.meta.our_liability.content.p1.l2')}</li>
          <li>{t('terms_of_service.meta.our_liability.content.p1.l3')}</li>
          <li>{t('terms_of_service.meta.our_liability.content.p1.l4')}</li>
          <li>{t('terms_of_service.meta.our_liability.content.p1.l5')}</li>
          <li>{t('terms_of_service.meta.our_liability.content.p1.l6')}</li>
        </ol>
        <br />
        <h2>{t('terms_of_service.meta.end_of_service.text')}</h2>
        <ol>
          <li>{t('terms_of_service.meta.end_of_service.content.p1.l1')}</li>
          <li>{t('terms_of_service.meta.end_of_service.content.p1.l2')}</li>
        </ol>
        <br />
        <h2>{t('terms_of_service.meta.personal_info.text')}</h2>
        <ol>
          <li>{t('terms_of_service.meta.personal_info.content.p1.l1')}</li>
          <li>{t('terms_of_service.meta.personal_info.content.p1.l2')}</li>
        </ol>
        <br />
        <h2>{t('terms_of_service.meta.disputes.text')}</h2>
        <ol>
          <li>
            {t('terms_of_service.meta.disputes.content.p1.head')}
            <ul>
              <li>{t('terms_of_service.meta.disputes.content.p1.l1')}</li>
              <li>{t('terms_of_service.meta.disputes.content.p1.l2')}</li>
            </ul>
          </li>
          <li>
            {t('terms_of_service.meta.disputes.content.p2.head')}
            <ul>
              <li>{t('terms_of_service.meta.disputes.content.p2.l1')}</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsOfServiceView;
