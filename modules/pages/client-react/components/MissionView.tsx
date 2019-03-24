import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';
import './pageStyle.css';
interface MissionViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - Mission`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const MissionView = ({ t }: MissionViewProps) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <div className="MissionContainer">
        <section>
          <h1>LensHood's Vision & Mission</h1>
          <p>
            Our vision is to build a sustainable future where people collaboratively consume various equipments,
            resources and thereby making anything affordable and accessible.
          </p>
          <p>The most important part of LensHood is you folks, our beloved community.</p>
          <p>
            We are building a world in which every content creator has the access to resources they need to pursue their
            passion and tell their story, regardless of budget, background, or location. Because we believe everyone has
            something to say and deserves to have their story heard.
          </p>
        </section>
        <br />
        <section>
          <h2>LensHood's Core Values</h2>
          <h3>Support and Empower</h3>
          <p>
            We believe nothing should come between you and your dreams! Our aim is to help you achieve it by giving you
            access to great tools at affordable rates. So everything we do is focused on enabling creators to to make
            great content by providing them with the right tools, resources, and education.
          </p>
          <h3>Be Inclusive</h3>
          <p>
            We seek to create a workplace and community where everyone feels welcome and all voices are heard. We value
            and promote the diversity in our workforce, our community, and beyond.
          </p>
          <h3>Learn and Act</h3>
          <p>
            We seek to continuously learn, keep an ear to the ground, and both listen to and start new trends. We don't
            fear change, and we are always ready to take action.
          </p>
          <h3>Create and Be Curious</h3>
          <p>
            We believe creativity makes the world a more interesting and fun place. We aren't afraid of obstacles and
            constraints - they make us more agile and able to invent new things and look for new approaches.
          </p>
          <h3>Trust and be Trustworthy</h3>
          <p>
            Trust is the foundation on which LendHood is built. At LensHood, relationships are built on openness,
            integrity, honesty and an eagerness to help one another.
          </p>
          <h3>Take Ownership</h3>
          <p>
            We take responsibility for our actions and think on behalf of the larger team and community. We think about
            resources as if they were our own, and are always on the lookout for better ways to serve members
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default MissionView;
