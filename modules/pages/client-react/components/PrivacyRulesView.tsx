import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';
import './pageStyle.css';

interface PrivacyRulesViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

/* eslint-disable no-unused-expressions */

const PrivacyRulesView = ({ t }: PrivacyRulesViewProps) => {
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
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          border: 'none'
        }}
      >
        <h1>LensHood Privacy Policy</h1>
        {/* <h1>{t('privacy_rules.title')} </h1> */}
        <p>
          When you join the LensHood community, you trust us with your information. That’s not something we take
          lightly. We’ve written this Privacy Policy to help you know what data we collect from you, how we use it and
          how we protect it for you. If you have any questions, please do get in touch at{' '}
          <strong>reachus@lenshood.in</strong>
        </p>
        {/* <p>
          {t('privacy_rules.meta.privacy_policy.content.p1')}
          <strong>{t('privacy_rule.meta.privacy_policy.content.strong')} </strong>
        </p> */}
        <br />
        <h2>Who are we?</h2>
        <p>
          We are Unihood Service Private Limited (that’s “we”, “our”, “us”) and operate under the name of LensHood. Our
          registered office address is Rd No.3, Banjara Hills, Hyderabad. Our CIN is U74999TG2018PTC128488.
        </p>
        <br />
        <h2>What information do we hold about you?</h2>
        <h3>Information you submit through our app or website</h3>
        <ul>
          <li>
            To help keep LensHood a safe place to lend and borrow, we require certain information to verify your
            account. This will be some or all of the following: your name, ID, email address, phone number, a selfie
            photograph, address or information about your employment or studies.
          </li>
          <li>
            We might also collect information from communications you make through the platform and other information
            about how you use the app and website.
          </li>
        </ul>
        <h3>Information on how you use your phone</h3>
        <ul>
          <li>This might include your mobile network, IP address or operating system and your phone settings.</li>
        </ul>
        <h3>Information you give us permission to access on your phone</h3>
        <ul>
          <li>
            These are things you give us explicit permission to see. This might include your photos and camera, so that
            you can post photos of your items, and your geolocation so that we can show you the most relevant items.
          </li>
        </ul>
        <h3>Information from social media accounts</h3>
        <ul>
          <li>Information from any social media accounts that you share with us or sign up with.</li>
        </ul>
        <h3>Cookie information</h3>
        <p>By using the LensHood website and/or app, you agree to our use of cookies:</p>
        <ul>
          <li>
            We use Session, Persistent and Third Party cookies to track what you’re doing on the site in order to help
            us improve it and give you a better experience in the future. Please note that cookies don’t store your
            banking details.
          </li>
          <li>
            You can turn cookies off at any time (although this will reduce the quality of your user experience).
            Exactly how will depend on your browser or phone settings - try searching Help on your browser toolbar or go
            to your phone settings to change cookie controls.
          </li>
        </ul>
        <br />
        <h2>How do we use your information?</h2>
        <br />
        <h3>To provide, analyse and improve the LensHood service, we use your data to:</h3>
        <ul>
          <li>
            Enable you to use the LensHood service, communicate with other users, access customer service and receive
            relevant communications and notifications from us.
          </li>
          <li>
            Contact you via email, SMS or phone if we need to send you information relating to your LensHood account.
          </li>
        </ul>
        <h3>
          To keep LensHood a safe place to lend and borrow and to meet our legal obligations, we use your data to:
        </h3>
        <ul>
          <li>Search your record at immigration and fraud prevention agencies.</li>
          <li>Prevent illegal activities like money laundering, tax evasion and fraud.</li>
          <li>Enforce our Terms of Service and other policies and resolve any disputes with any of our Members.</li>
        </ul>
        <h3>
          To exercise our legitimate interests (which doesn't involve overriding your privacy rights), we use your data
          to:
        </h3>
        <ul>
          <li>
            Market products, services or new features we think you’ll like, in the app, online or via text and email.
          </li>
        </ul>
        <br />
        <h2>Who do we share it with?</h2>
        <h3>
          We have never and will never sell your data to 3rd parties. We might share your personal information with:
        </h3>
        <ul>
          <li>Anyone who works for us, if they need it to do their job. This is only ever on an as-needed basis.</li>
          <li>
            Any organisation which supports any of our services you use, when they need it to offer those services,
            including:
          </li>
          <ul>
            <li>
              RazorPay, our payment processors, who hold details from your rentals with us in order to verify your
              payment. These may include your name, ID, payment cards and bank accounts.
            </li>
            <li>Credit reference agencies</li>
            <li>Analytical, Know Your Customer (KYC) and cyber security service providers</li>
          </ul>
          <li>Anyone who you give us explicit permission to share it with</li>
        </ul>
        <p>
          Where necessary, we’ll also share information to comply with regulatory authorities, to enforce our Terms of
          Service or other agreements and to protect the rights, property or safety of us, our customers or others.
        </p>
        <br />
        <h2>What are your rights?</h2>
        <h3>You have a right to:</h3>
        <ul>
          <li>Access and update some of your information through your LensHood account.</li>
          <li>
            In some jurisdictions, you may have the right to request copies of personal information which you can’t see
            through your LensHood account, though we will not be able to comply when such requests are manifestly
            unfounded, repetitive or excessive.
          </li>
          <li>
            Ask us to correct inaccurate or incomplete personal information which you can’t update yourself through your
            LensHood account.
          </li>
          <li>Ask us to delete your data. If you request this, please note:</li>

          <ul>
            <li>
              We may retain certain information necessary for our legitimate business interests, such as fraud detection
              and prevention and enhancing safety. E.g. if we suspend a LensHood account for fraud or safety reasons, we
              might retain certain information to prevent that user from opening another account in the future.
            </li>
            <li>
              We may retain and use your personal information to the extent necessary to comply with our legal
              obligations.
            </li>
            <li>
              Information you have shared with others (e.g. Reviews) may continue to be publicly visible even after your
              LensHood account is cancelled.
            </li>
            <li>
              Object to us using your data for direct marketing and in certain circumstances ‘legitimate interests’,
              research and statistical reasons.
            </li>
          </ul>

          <li>Withdraw any consent you’ve previously given us. To do so, please get in touch at reachus@lenshood.in</li>
        </ul>
        <br />
        <h2>Where do we store your data?</h2>
        <ul>
          <li>
            We take your privacy seriously. That’s why the information you give us is transmitted using SSL, the secure
            encryption which websites use to transmit credit card numbers.
          </li>
          <li>
            We store your verification information in an encrypted form, and only authorised LensHood employees are
            given access to your original documentation, to help them do their jobs.
          </li>
          <li>
            Data collected inside India may be transferred and stored outside of India for the purposes described in
            this Privacy Policy. However, we’ll only do this where appropriate safeguards are in place to ensure an
            adequate level of data protection.
          </li>
        </ul>
        <br />
        <h2>How to ask a question or make a complaint</h2>
        <p>
          If you have a complaint, please get in touch at <strong>reachus@lenshood.in</strong> and we’ll do our best to
          help you
        </p>
        <br />
        <h2>Changes to this policy</h2>
        <p>
          We’ll post any changes we make to our privacy policy right here, on this page. If the changes are significant,
          we’ll let you know by email.
        </p>
      </div>
    </div>
  );
};

export default PrivacyRulesView;
