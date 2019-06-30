import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';

interface FAQViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('faq.title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const FAQView = ({ t }: FAQViewProps) => {
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
        {/* <h1>FAQs</h1> */}
        <h1>{t('faqs.title')} </h1>
        {/* <h3>Is it safe to submit my ID to LensHood?</h3> */}
        <h3>{t('faqs.meta.safe_submit_id.content.p1.head')}</h3>
        {/* <p>
          In order to keep LensHood a safe place to lend and borrow, we ask all users to upload photo ID and a selfie
          image with the said ID. We do this to make sure everyone is who they say they are, so that you can rent with
          peace of mind. */}
        {/* </p> */}
        <p>{t('faqs.meta.safe_submit_id.content.p1.p11')}</p>
        {/* <h3>How do you store my information?</h3> */}
        <h3>{t('faqs.meta.storing_info.content.p1.head')}</h3>
        {/* <p>
          We take your privacy seriously. That’s why the information you give us is transmitted using SSL, the secure
          encryption which websites use to transmit credit card numbers. We store your verification information in an
          encrypted form and only authorised LensHood employees are given access to your original documentation, to help
          them do their jobs.
        </p> */}
        <p>{t('faqs.meta.storing_info.content.p1.p11')}</p>
        {/* <h3>Do you take security deposits?</h3> */}
        <h3>{t('faqs.meta.security_deposits.content.p1.head')}</h3>
        {/* <p>No, we do not take deposits, but you need to pay the entire value upfront.</p> */}
        <p>{t('faqs.meta.security_deposits.content.p1.p11')}</p>
        {/* <h3>Where is LensHood operational?</h3> */}
        <h3>{t('faqs.meta.lenshood_operational.content.p1.head')}</h3>
        {/* <p>We are currently operational in IIT Guwahati only. We will soon expand to Guwahati city.</p> */}
        <p>{t('faqs.meta.lenshood_operational.content.p1.p11')}</p>
        {/* <h3>How does the handover of the camera take place?</h3> */}
        <h3>{t('faqs.meta.handover_camera.content.p1.head')}</h3>
        {/* <p>
          You just need to sit back and let us know your time of availability. Our hustlers will verify, collect and
          deliver the camera.
        </p> */}
        <p>{t('faqs.meta.handover_camera.content.p1.p11')}</p>
        {/* <h3>How do I contact the LensHood team?</h3> */}
        <h3>{t('faqs.meta.lenshood_contact.content.p1.head')}</h3>
        {/* <p>
          A good customer experience is our top priority. If you have any issues, you can contact us via our Instagram
          page @we_are_lenshood, via mail at reachus@lenshood.in, or through phone on 7896889029/8811093811.
        </p> */}
        <p>{t('faqs.meta.lenshood_contact.content.p1.p11')}</p>
        {/* <h3>Cancellation Policy</h3> */}
        <h3>{t('faqs.meta.cancellation_policy.content.p1.head')}</h3>
        {/* <h4>
          <strong>For Borrowers:</strong>
        </h4> */}
        <h4>
          <strong>{t('faqs.meta.cancellation_policy.content.p1.p11.head')}</strong>
        </h4>
        {/* <ul>
          <li>
            Borrowers can cancel a rental request before it is accepted, or within 2 hours of rental acceptance for
            free.
          </li>
          <li>If the Borrower cancels within 48 hours of the rental pick-up date, they will receive a 50% refund.</li>
          <li>If the Borrower cancels within 24 hours of the rental pick-up date, the rental is non-refundable.</li>
        </ul> */}
        <ul>
          <li>{t('faqs.meta.cancellation_policy.content.p1.p11.l1')}</li>
          <li>{t('faqs.meta.cancellation_policy.content.p1.p11.l2')}</li>
          <li>{t('faqs.meta.cancellation_policy.content.p1.p11.l3')}</li>
        </ul>
        {/* <p>
          If LensHood believes that you intend to cause harm to any items you rent through the platform, or believe you
          are renting with intent to steal; we reserve the right to cancel your rental immediately and without warning,
          and charge you an appropriate sum. This sum will be up to but not more than the total value of the items in
          question. It is at LensHood's discretion to determine what is an appropriate sum in each instance.
        </p> */}
        <p>{t('faqs.meta.cancellation_policy.content.p1.p12')}</p>
        {/* <h4>
          <strong>For Lenders:</strong>
        </h4> */}
        <h4>
          <strong>{t('faqs.meta.cancellation_policy.content.p1.p13.head')}</strong>
        </h4>
        {/* <p>
          We highly discourage owners from cancelling—you should never accept a rental unless you are certain you can
          fulfill it. However, if you are an owner and need to cancel because of an unforeseen event, email us at
          reachus@lenshood.in. Whenever you cancel a rental, you'll get an automated review on your profile saying that
          you cancelled. Any applicable cancellation fees are automatically deducted from your next rental payout.
        </p> */}
        <p>{t('faqs.meta.cancellation_policy.content.p1.p13.p131')}</p>
        {/* <h3>How do I become a better Lender and increase my LensHood earnings?</h3> */}
        <h3>{t('faqs.meta.better_lender.content.p1.head')}</h3>
        {/* <p>We take 4 metrics into account when assessing our lenders.</p> */}
        <p>{t('faqs.meta.better_lender.content.p1.p11')}</p>
        {/* <p>
          <strong>Response time</strong> - Borrowers expect answers quickly. The faster you respond, the more likely you
          are to guarantee a rental. This also includes leaving reviews for borrowers in a timely manner.
        </p> */}
        <p>
          <strong>{t('faqs.meta.better_lender.content.p1.p12.head')}</strong>
          {t('faqs.meta.content.p1.p12.p121')}
        </p>
        {/* <p>
          <strong>Repeat borrowers</strong> - If borrowers rent from you more than once, this demonstrates to us that
          you are delivering an excellent service and customer experience.
        </p> */}
        <p>
          <strong>{t('faqs.meta.better_lender.content.p1.p13.head')}</strong>
          {t('faqs.meta.better_lender.content.p1.p13.p131')}
        </p>
        {/* <p>
          <strong>Top quality listings</strong> - Improving the image quality and description of the items can
          drastically improve your chances of a rental. Listings with original photos earn 2.4x as much as those with
          stock images.
        </p> */}
        <p>
          <strong>{t('faqs.meta.better_lender.content.p1.p14.head')}</strong>
          {t('faqs.meta.better_lender.content.p1.p14.p141')}
        </p>
        {/* <p>
          <strong>Promoting your brand</strong> - Our algorithm tracks lender visibility both on and off platform.
          Improve this by sharing your listings and lender profile page via social media and instant messengers.
        </p> */}
        <p>
          <strong>{t('faqs.meta.better_lender.content.p1.p15.head')}</strong>
          {t('faqs.meta.better_lender.content.p1.p15.p151')}
        </p>
        {/* <p>
          If you follow these you’ll consistently be ranked highly as a lender and so your items will appear more
          prominently in search results!
        </p> */}
        <p>{t('faqs.meta.better_lender.content.p1.p16')}</p>
        {/* <h3>How do I optimise my listings?</h3> */}
        <h3>{t('faqs.meta.optimising_listing.content.p1.head')}</h3>
        {/* <p>Here are four ways to make your listings stand out from the crowd:</p> */}
        <p>{t('faqs.meta.optimising_listing.content.p1.p11')}</p>
        {/* <p>
          <strong>Pricing Is Key</strong> : Put simply, lower prices generate more rentals and more money in the long
          run. Be reasonable when choosing the price at which to list your item. Have a browse, see what the going rate
          is for similar items and use that as a benchmark.
        </p> */}
        <p>
          <strong>{t('faqs.meta.optimising_listing.content.p1.p12.head')}</strong>
          {t('faqs.meta.optimising_listing.content.p1.p12.p121')}
        </p>
        {/* <p>
          <strong>Photos Make A Difference</strong> : Listings with clear, good quality images consistently get a better
          response than those that don't. Make sure all the equipment available to rent is on show (remember, there's no
          limit on how many photos you can add, the more the better). It doesn't have to be anything professional, but
          make your items look real and try to avoid using stock images where possible. */}
        {/* </p> */}
        <p>
          <strong>{t('faqs.meta.optimising_listing.content.p1.p13.head')}</strong>
          {t('faqs.meta.optimising_listing.content.p1.p13.p131')}
        </p>
        {/* <p>
          <strong>Make Your Description Comprehensive</strong> : This is your opportunity to put everything down in one
          place. Outline what is included in the rental, the spec of the item, the size, the colour. Let potential
          borrowers know if you are willing to lower the price for longer rentals, how flexible you are with handover,
          what they can expect if they rent from you. Do mention if you have similar items up for rent or would consider
          bundle deals.
        </p> */}
        <p>
          <strong>{t('faqs.meta.optimising_listing.content.p1.p14.head')}</strong>
          {t('faqs.meta.optimising_listing.content.p1.p14.p141')}
        </p>
        {/* <p>
          <strong>Leave Reviews</strong> : LensHood users are more likely to rent from a product with good reviews. If
          you have had a pleasant experience with the product – leave it a review to let others know and they'll most
          likely return the favour.
        </p> */}
        <p>
          <strong>{t('faqs.meta.optimising_listing.content.p1.p15.head')}</strong>
          {t('faqs.meta.optimising_listing.content.p1.p15.p151')}
        </p>
        {/* <h3>How should I set the price for my camera?</h3> */}
        <h3>{t('faqs.meta.setting_price.content.p1.head')}</h3>
        {/* <p>
          Feel free to use our suggested daily/weekly rental price as a benchmark. You could also have a look to see
          what similar items are currently renting for. In addition, if you're looking to rent for a longer period of
          time, we suggest lowering the daily price further.
        </p> */}
        <p>{t('faqs.meta.setting_price.content.p1.p11')}</p>
        {/* <p>
          Discount the daily price when people take it for longer durations. Research and data shows that this type of
          pricing strategies have the highest conversion rate.
        </p> */}
        <p>{t('faqs.meta.setting_price.content.p1.p12')}</p>
        {/* <h3>How does the vetting process work?</h3> */}
        <h3>{t('faqs.meta.vetting.content.p1.head')}</h3>
        {/* <p>
          Trust and safety is at the core of our offering. Users are free to browse the site without having been vetted,
          however, a one time physical verification of the following is required in order to lend or rent:
        </p> */}
        <p>{t('faqs.meta.vetting.content.p1.p11.head')}</p>
        {/* <ol>
          <li>
            Government ID Proof - PAN, Aadhaar, Voter ID, Passport Address Proof - Passport/ Voter ID/ Electricity bill/
            Landline Bill
          </li>
          <li>Proof of work or University confirmation.</li>
          <li>For lenders only, a verification of the equipment and their Unique Serial Number.</li>
        </ol> */}
        <ol>
          <li>{t('faqs.meta.vetting.content.p1.p11.l1')}</li>
          <li>{t('faqs.meta.vetting.content.p1.p11.l2')}</li>
          <li>{t('faqs.meta.vetting.content.p1.p11.l3')}</li>
        </ol>
        {/* <p>Further, for borrowers, the following checks will be done by our hustlers during every rental:</p> */}
        <p>{t('faqs.meta.vetting.content.p1.p12.head')}</p>
        {/* <ol>
          <li>A photograph of the user with the equipment and a LensHood sticker.</li>
          <li>Submission of an original Government ID of the person who is renting.</li>
          <li>Photo of equipment (body & lenses) with Unique Serial Number</li>
        // </ol> */}
        <ol>
          <li>{t('faqs.meta.vetting.content.p1.p12.l1')}</li>
          <li>{t('faqs.meta.vetting.content.p1.p12.l2')}</li>
          <li>{t('faqs.meta.vetting.content.p1.p12.l3')}</li>
        </ol>
        {/* <h3>When do I get paid?</h3> */}
        <h3>{t('faqs.meta.paid.content.p1.head')}</h3>
        {/* <p>It may take 4 - 7 business days to receive your money.</p> */}
        <p>{t('faqs.meta.paid.content.p1.p11')}</p>
        {/* <h3>What is a rental 'day' ?</h3> */}
        <h3>{t('faqs.meta.rental_day.content.p1.head')}</h3>
        {/* <p>If you have made a request for one day it means that the item is in your possession for 24hr.</p> */}
        <p>{t('faqs.meta.rental_day.content.p1.p11')}</p>
        <p>
          {/* E.g If you've picked up the item at 10AM, then 10AM the next morning would be the time to handover the item
          back to the lender. */}
        </p>
        <p>{t('faqs.meta.rental_day.content.p1.p12')}</p>
        {/* <p>Also, some lenders can be very flexible - speak to them about the handover times :)</p> */}
        <p>{t('faqs.meta.rental_day.content.p1.p13')}</p>
        {/* <h3>What if item was damaged during the rental?</h3> */}
        <h3>{t('faqs.meta.damage.content.p1.head')}</h3>
        {/* <p>
          This happens, but not to worry. While you're liable for up to the full value of the rented item, we will help
          you to resolve the matter. You definitely want to get in touch with the lender and let them know what
          happened; also take photographs of the damage.
        </p> */}
        <p>{t('faqs.meta.damage.content.p1.p11')}</p>
        {/* <h3>My item was returned late.</h3> */}
        <h3>{t('faqs.meta.return_late.content.p1.head')}</h3>
        {/* <p>We're sorry to hear that your item has been returned late. Please contact us as soon as possible.</p> */}
        <p>{t('faqs.meta.return_late.content.p1.p11')}</p>
        {/* <p>
          As a lender you're eligible for the late return fees, which are calculated on a double rate. Whilst, we don't
          guarantee late return fees, we do promise to pursue payment from the borrower on your behalf.
        </p> */}
        <p>{t('faqs.meta.return_late.content.p1.p12')}</p>
        {/* <p>
          If you and the borrower are not able to find the common agreement, we'll proceed with a formal case. You will
          need to document a short written account of events from your perspective, attach any evidence to support your
          claims (e.g. photos/videos/screenshot of communication with the borrower), and also provide proof of purchase
          documentation for the equipment.
        </p> */}
        <p>{t('faqs.meta.return_late.content.p1.p13')}</p>
      </div>
    </div>
  );
};

export default FAQView;
