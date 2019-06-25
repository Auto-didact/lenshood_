import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '../../../../settings';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

interface LendingViewProps {
  t: TranslateFunction;
}

// const renderMetaData = (t: TranslateFunction) => (
//   <Helmet
//     title={`${settings.app.name} - ${t('title')}`}
//     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
//   />
// );

const LendingView = ({ t }: LendingViewProps) => {
  useEffect(() => {
    global.window.scrollTo(0, 0);
  });
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
          How LensHood works
        </h1>
        <Tabs
          defaultActiveKey="2"
          size="large"
          tabBarStyle={{
            maxWidth: '1000px',
            display: 'flex',
            justifyContent: 'center',
            color: '#111'
          }}
        >
          <TabPane tab="For Renters" key="1">
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
                LensHood provides a safe and secure way to earn money from the equipments you own and save money by
                renting equipments at the comfort of your home
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
                    1. Search
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      maxWidth: '500px',
                      fontSize: '30px'
                    }}
                  >
                    Search for the Photography gear you are looking for.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/undraw_search_2dfv.svg')} height="200px" width="400px" />
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
                    2. Book
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      maxWidth: '500px',
                      fontSize: '30px'
                    }}
                  >
                    Book the desired gear, for the dates you want to rent out and pay upfront.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/undraw_booking_33fn.svg')} height="200px" width="400px" />
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
                    3. ID Proof
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      maxWidth: '500px',
                      fontSize: '30px'
                    }}
                  >
                    Get ready with your ID Proofs for LensHood KYC.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/Government ID.svg')} height="200px" width="400px" />
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
                    4. Search
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      fontSize: '30px',

                      maxWidth: '500px'
                    }}
                  >
                    Sit back & Relax ll our hustler comes to your doorstep.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/Relax-01.svg')} height="200px" width="400px" />
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="For Lenders" key="2">
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
                LensHood provides a safe and secure way to earn money from the equipments you own and save money by
                renting equipments at the comfort of your home
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
                    1. List
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      maxWidth: '500px',
                      fontSize: '30px'
                    }}
                  >
                    List your equipment for rental and we will call you to schedule your verificaon.
                  </h2>
                </div>
                <div>
                  <img
                    src={require('../images/Illustrations/undraw_post_online_dkuk.svg')}
                    height="200px"
                    width="400px"
                  />
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
                    2. Verification
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      maxWidth: '500px',

                      fontSize: '30px'
                    }}
                  >
                    Get your lisng verified by our hustler.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/undraw_choose_80qg.svg')} height="200px" width="400px" />
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
                    3. Notification
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      maxWidth: '500px',

                      fontSize: '30px'
                    }}
                  >
                    Get nofied in case of an order and wait for our hustler to pick it up.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/undraw_mail_2_tqip.svg')} height="200px" width="400px" />
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
                    4. Earn
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      maxWidth: '500px',
                      fontSize: '30px'
                    }}
                  >
                    Earn extra money while we have got your equipments covered.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/undraw_savings_hjfl.svg')} height="200px" width="400px" />
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
                    5. Return
                  </h1>
                  <h2
                    style={{
                      margin: '0 0 0 0',
                      padding: '0 0 10px 40px',
                      fontSize: '30px',

                      maxWidth: '500px'
                    }}
                  >
                    Finally, Get your gear back as the rental gets over.
                  </h2>
                </div>
                <div>
                  <img src={require('../images/Illustrations/Return-01.svg')} height="200px" width="400px" />
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default LendingView;
