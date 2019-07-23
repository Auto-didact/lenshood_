import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '../../../../settings';

interface TrustAndSafetyViewProps {
  t: TranslateFunction;
}

// const renderMetaData = (t: TranslateFunction) => (
//   <Helmet
//     title={`${settings.app.name} - ${t('title')}`}
//     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
//   />
// );

/* eslint-disable no-unused-expressions */

const TrustAndSafetyView = ({ t }: TrustAndSafetyViewProps) => {
  useEffect(() => {
    global.window.scrollTo(0, 0);
  });
  return (
    <div
      style={{
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        marginTop: '10px'
      }}
    >
      <div
        style={{
          left: '50%',
          width: '100%',
          marginBottom: '32px',
          marginTop: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          border: 'none',
          color: '#767676'
        }}
      >
        <h1
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            fontWeight: 'bolder',
            textAlign: 'center',
            color: '#767676',
            fontSize: '55px'
          }}
        >
          Trust and Safety
        </h1>

        <h2
          style={{
            maxWidth: '900px',
            fontWeight: 'normal',
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '30px',
            color: '#767676'
          }}
        >
          LensHood Community is
          <span style={{ color: '#23b195' }}> 100% invite based</span> - Hence every user is referred by a trusted
          person from our community. We at LensHood have listed a few tips to make the most of your experience in this
          community.
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '100px',
            flexWrap: 'wrap-reverse',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <div>
            <img src={require('../images/Illustrations/5 Steps.svg')} height="300px" width="500px" />
          </div>
          <div>
            <h1
              style={{
                fontWeight: 'bold',
                fontSize: '37px',
                margin: '0 0 0 0',
                color: '#767676',
                textAlign: 'left',
                lineHeight: '30px'
              }}
            >
              5 Step Verification process
            </h1>
            <h2
              style={{
                fontWeight: 'bold',
                padding: '0 0 0 0',
                maxWidth: '500px',
                fontSize: '25px',
                color: '#767676',
                textAlign: 'left'
              }}
            >
              Thorough Offline Identy, Product & Address Verification.
            </h2>
            <ul
              style={{
                listStyle: 'none',
                textAlign: 'left',
                padding: '0 0 0 4px',
                maxWidth: '500px'
              }}
            >
              <li style={{ fontSize: '30px' }}>
                <span>
                  <img src={require('../images/tick.svg')} width="30px" height="30px" /> ID Proof
                </span>
              </li>
              <li style={{ fontSize: '30px' }}>
                <span>
                  <img src={require('../images/tick.svg')} width="30px" height="30px" /> Address Proof
                </span>
              </li>
              <li style={{ fontSize: '30px' }}>
                <span>
                  <img src={require('../images/tick.svg')} width="30px" height="30px" /> Package photograph.
                </span>
              </li>
              <li style={{ fontSize: '30px' }}>
                <span>
                  <img src={require('../images/tick.svg')} width="30px" height="30px" /> User Photograph with equipment
                  (LensHood Stickers)
                </span>
              </li>
              <li style={{ fontSize: '30px' }}>
                <span>
                  <img src={require('../images/tick.svg')} width="30px" height="30px" /> Photo of equipment (Body &
                  Lenses) with Unique Serial Number.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '100px',
            flexWrap: 'wrap-reverse',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <div>
            <img src={require('../images/Illustrations/Government ID.svg')} height="300px" width="500px" />
          </div>
          <div>
            <h1
              style={{
                fontWeight: 'bold',
                fontSize: '37px',
                margin: '0 0 0 0',
                color: '#767676',
                textAlign: 'left'
              }}
            >
              Government ID
            </h1>
            <h2
              style={{
                fontWeight: 'bold',
                marginTop: '-5px',
                padding: '0 0 0 0',
                maxWidth: '500px',
                fontSize: '25px',
                color: '#767676',
                textAlign: 'left',
                lineHeight: '29px'
              }}
            >
              We keep an Original Government ID Card of the Borrower during the rental period.
            </h2>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '100px',
            flexWrap: 'wrap-reverse',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <div>
            <img src={require('../images/Illustrations/Physical Undertaking.svg')} height="300px" width="500px" />
          </div>
          <div>
            <h1
              style={{
                fontWeight: 'bold',
                fontSize: '37px',
                margin: '0 0 0 0',
                color: '#767676',
                textAlign: 'left',
                lineHeight: '30px'
              }}
            >
              Physical Undertaking
            </h1>
            <h2
              style={{
                fontWeight: 'bold',
                marginTop: '5px',
                padding: '0 0 0 0',
                maxWidth: '500px',
                fontSize: '25px',
                color: '#767676',
                textAlign: 'left',
                lineHeight: '29px'
              }}
            >
              A physical undertaking is taken in the form of receipt from the lender before a rental.
            </h2>
          </div>
        </div>

        <div
          style={{
            background: '#ddd',
            width: '100%',
            height: '1.5px',
            marginTop: '150px'
          }}
        />

        <div
          style={{
            background: '#ddd',
            width: '100%',
            height: '1.5px',
            marginTop: '150px'
          }}
        />
      </div>
    </div>
  );
};

export default TrustAndSafetyView;
