import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../../settings';
import Helmet from 'react-helmet';

interface BorrowingProps {
  t: TranslateFunction;
}

const Borrowing = ({ t }: BorrowingProps) => {
  useEffect(() => {
    global.window.scrollTo(0, 0);
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2
        style={{
          maxWidth: '650px',
          fontWeight: 'normal',
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '30px'
        }}
      >
        {t('borrowing.meta.lenshood.content.p1')}
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '100px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <div>
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '50px',
              margin: '0 0 0 0'
            }}
          >
            {t('borrowing.meta.p1.text')}
          </h1>
          <h2
            style={{
              margin: '0 0 0 0',
              padding: '0 0 10px 40px',
              maxWidth: '500px',
              fontSize: '30px'
            }}
          >
            {t('borrowing.meta.p1.content.l1')}
          </h2>
        </div>
        <div>
          <img src={require('../../images/Illustrations/undraw_search_2dfv.svg')} height="200px" width="400px" />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '100px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <div>
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '50px',
              margin: '0 0 0 0'
            }}
          >
            {t('borrowing.meta.p2.text')}
          </h1>
          <h2
            style={{
              margin: '0 0 0 0',
              padding: '0 0 10px 40px',
              maxWidth: '500px',
              fontSize: '30px'
            }}
          >
            {t('borrowing.meta.p2.content.l1')}
          </h2>
        </div>
        <div>
          <img src={require('../../images/Illustrations/undraw_booking_33fn.svg')} height="200px" width="400px" />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '100px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <div>
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '50px',
              margin: '0 0 0 0'
            }}
          >
            {t('borrowing.meta.p3.text')}
          </h1>
          <h2
            style={{
              margin: '0 0 0 0',
              padding: '0 0 10px 40px',
              maxWidth: '500px',
              fontSize: '30px'
            }}
          >
            {t('borrowing.meta.p3.content.l1')}
          </h2>
        </div>
        <div>
          <img src={require('../../images/Illustrations/Government ID.svg')} height="200px" width="400px" />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '100px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <div>
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: '50px',
              margin: '0 0 0 0'
            }}
          >
            {t('borrowing.meta.p4.text')}
          </h1>
          <h2
            style={{
              margin: '0 0 0 0',
              padding: '0 0 10px 40px',
              fontSize: '30px',

              maxWidth: '500px'
            }}
          >
            {t('borrowing.meta.p4.content.l1')}
          </h2>
        </div>
        <div>
          <img src={require('../../images/Illustrations/Relax-01.svg')} height="200px" width="400px" />
        </div>
      </div>
    </div>
  );
};

export default Borrowing;
