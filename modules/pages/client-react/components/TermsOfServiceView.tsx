import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';
import styled from 'styled-components';

interface TermsOfServiceViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const TermsOfServiceView = ({ t }: TermsOfServiceViewProps) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <div className="TermsContainer">
        <h1>Terms and Conditions</h1>
        <h2>Overview:</h2>
        <p>
          This section is a brief summary of the highlights of this Agreement. Know that when you accept this Agreement,
          you are accepting all of the terms and conditions and not just this section.
        </p>
        <ul>
          <li>
            Simply by using LensHood, including browsing the website, you are agreeing to our Terms, so please read
            carefully. We may change the terms of this Agreement from time to time, and those changes are up to us. If
            you continue to use LensHood after our changes, that means you agree to our new terms.
          </li>
          <li>
            Remember that we merely facilitate connections between Owners and Renters (each defined below) and are not a
            party to those agreements between Owners and Renters, except that we may serve as a limited agent to collect
            the payment of Rentals on Owners' behalf and report damaged or stolen Gear. When you use LensHood to rent
            Gear, you are entering into a binding legal agreement with the Renter or Owner to pay for the rental or
            provide the requested Gear, as applicable.
          </li>
          <li>
            We make no warranty about the quality of the Gear and will not be held liable for any cost, loss, or damage
            that arises from any transaction (to the extent permitted by law).
          </li>
          <li>
            Please remember to always exercise good judgment when communicating with other users either on or off
            LensHood.
          </li>
          <li>
            Both you and LensHood Inc. have the right to stop the use of our Services, or to delete your account at any
            time, but certain provisions of this Agreement will still apply. For example, any disputes you may have with
            us based on your use of LensHood, even after your account is deleted, will be governed by this Agreement.
          </li>
        </ul>
        <br />
        <h2>Role of LensHood:</h2>
        <p>LensHood's role is as an intermediary only:</p>
        <ol>
          <li>
            LensHood makes available to you an online platform (the "LensHood Service") through which Lenders may make
            available certain items for rental by Borrowers upon approval by the parties.
          </li>
          <li>
            You understand that LensHood is acting as an intermediary only in respect of any transactions entered into
            between Lenders and Borrowers for the rental of items through the LensHood Service. Any agreement for the
            rental of any items through the LensHood Service is between the relevant Lender and Borrower.
          </li>
          <li>
            While LensHood endeavours to provide the LensHood Service for the mutual benefit of both Lenders and
            Borrowers and has drawn up rules with that as its aim, LensHood cannot be held responsible for, and, to the
            maximum extent permitted by law, excludes liability for, the conduct of users of the LensHood Service.
          </li>
          <li>
            You acknowledge that in its capacity as an operator of the LensHood Service and an intermediary in any
            transactions carried out through the LensHood Service, LensHood has the discretion to cancel any listing
            posted by a Lender, any request to borrow an item submitted by a Borrower, or any transaction, upon the
            provision of written notice to the parties involved, if it reasonably believes such listing, request or
            transaction does not comply with these Terms, the Borrowers' Rules or the Lenders' Rules.
          </li>
        </ol>
        <p>Using the LensHood Service as a Lender:</p>
        <ol>
          <li>
            When you agree as a Lender to lend an item to a Borrower, you acknowledge that you are entering into a
            separate contract with the Borrower and that such contract with the Borrower includes a promise by you to
            comply with the Lenders' Rules and these Terms.
          </li>
          <li>
            You also acknowledge that the Borrower is in no way acting under the control, or on behalf of LensHood, that
            your agreement to lend any item to the Borrower is solely with the Borrower, and you agree not to make any
            claim or assertion that LensHood is in any way liable or responsible for any loss or liability suffered by
            you in relation to any act or omission by the Borrower.
          </li>
          <li>
            You agree that you are solely responsible for your compliance with the Lenders' Rules, fully liable for any
            non-compliance with the Lenders' Rules and any compensation due to the Borrower in respect of any such
            non-compliance, including ensuring that the item offered for rental matches the description in your listing.
            You further acknowledge that LensHood does not have: (i) any responsibility for your compliance with the
            Lender's Rules; (ii) any obligation to underwrite any liability you may have for non-compliance, or (iii)
            any obligation to compensate the Borrower for any breach of your agreement with the Borrower in any way.
          </li>
        </ol>
        <p>Using the LensHood Service as a Borrower:</p>
        <ol>
          <li>
            When you agree as a Borrower to borrow an item from a Lender, you acknowledge that you are entering into a
            separate contract with the Lender and that such contract with the Lender includes a promise by you to comply
            with the Borrowers' Rules and these Terms.
          </li>
          <li>
            You also acknowledge that the Lender is in no way acting under the control, or on behalf of LensHood, that
            your agreement to borrow any item from the Lender is solely with the Lender, and you agree not to make any
            claim or assertion that LensHood is in any way liable or responsible for any loss or liability suffered by
            you in relation to any act or omission by the Lender.
          </li>
          <li>
            You agree that you are solely responsible for your compliance with the Borrowers' Rules, fully liable for
            any non-compliance with the Borrowers' Rules and any compensation due to the Lender in respect of any such
            non-compliance, including the loss or damage to the item which you have borrowed. You further acknowledge
            that LensHood does not have: (i) any responsibility for your compliance with the Borrowers' Rules; (ii) any
            obligation to underwrite any liability you may have for non-compliance, or (iii) any obligation to
            compensate the Lender for any breach of your agreement with the Lender in any way.
          </li>
        </ol>
        <br />
        <h2>RIGHTS IN THE LensHood SERVICE</h2>
        <ol>
          <li>
            In consideration of you complying with the Terms, LensHood grants you a revocable, non-transferable and
            non-exclusive license to access and use the LensHood Service.
          </li>
          <li>
            You acknowledge that your use of the LensHood Service grants you no rights in or to the LensHood Service or
            any of the intellectual property rights (including any copyright, trade mark or patents) owned by LensHood
            or its licensors, other than the right to use the LensHood Service in accordance with the Terms.
          </li>
          <li>
            You agree not to copy, reproduce, republish, download, post, broadcast, record, transmit, commercially
            exploit, edit, communicate to the public or distribute in any way the services, web pages or materials on
            the LensHood Service or the computer codes of elements comprising the LensHood Service other than for your
            own personal use. Subject to the above, you may download insubstantial excerpts of this content to your hard
            disk for the purpose of viewing it provided that no more than one copy of any information is made.
          </li>
        </ol>
        <br />
        <h2>FEES AND COMMISSION</h2>
        <ol>
          <li>
            On each occasion that a transaction between a Borrower and Lender for the rental of an item made available
            through the LensHood Service:
            <ul>
              <li>
                as a Lender, you agree to pay to LensHood a commission of 15% f the Rental Fee ("Lender Commission");
                and
              </li>
              <li>
                as a Borrower, you agree to pay to LensHood a commission of 5% f the Rental Fee ("Borrower Commission"),
                (together, the "LensHood Commission").
              </li>
            </ul>
          </li>
          <li>
            If, as a Borrower, you submit a request to borrow a particular item and that request is approved by the
            Lender, you will be charged the full Rental Fee PLUS the Borrower Commission. The "Rental Fee" means the
            daily rate you have agreed to pay to rent the item multiplied by the number of days that you have agreed to
            rent the item.
          </li>
          <li>
            As a Lender, you will receive the Lender Fee due to you within 4 business days after the scheduled start of
            the rental. The "Lender Fee" means the Rental Fee LESS the Lender Commission.
          </li>
          <li>
            Payments made through the LensHood Service are processed by Razorpay. You can read their full terms and
            conditions <a href="https://razorpay.com/terms/">here</a>. By agreeing to these terms or continuing to
            operate as a lender on LensHood, you agree to be bound by the Razorpay terms, as the same may be modified by
            Razorpay from time to time. As a condition of LensHood enabling payment processing services through Stripe,
            you agree to provide LensHood accurate and complete information about you and your business, and you
            authorize LensHood to share it and transaction information related to your use of the payment processing
            services provided by Stripe.
          </li>
          <li>
            You acknowledge that you are solely responsible for payment of applicable taxes (if any) owed by you
            pursuant to your use of the LensHood Service.
          </li>
          <li>
            We'll notify you of changes to our fee policy by posting such changes on the LensHood Service and will also
            send an email to the address registered to your account. We may also choose to temporarily change our fees
            for promotional events or new services; these changes are effective when we announce the promotional event
            or new service. We shall give prior notice of these promotional events and new services by posting details
            on the LensHood Service and will also send an email to the address registered to your account.
          </li>
          <li>
            You also agree that where you have contacted a particular user through the LensHood Service, you shall not
            complete that transaction or any others otherwise than using the Fat Service, or engage in any other
            practice which may avoid or lower the amount of LensHood Commission that would otherwise have been payable
            had the transaction been completed using the LensHood Service ("Fee Avoidance"). In the event of engagement
            by any user(s) in any Fee Avoidance, such user(s) shall indemnify and hold harmless LensHood in respect of
            any losses suffered by LensHood as a result of such Fee Avoidance. Or in the event that you attempt to
            engage a user you met through the LensHood service in a rental or transaction that does not use the LensHood
            service, you are liable to pay a fine of up to Rs. 10,000 as a penalty for doing so, regardless of whether
            your attempts are successful or not.
          </li>
        </ol>
        <br />
        <h2>YOUR LIABILITY</h2>
        <ol>
          <li>
            Nothing in these Terms shall limit your liability for fraudulent misrepresentation, or for death or personal
            injury resulting from your negligence.
          </li>
          <li>
            As a Lender, when listing an item for rental through the LensHood Service, you must give true and accurate
            details of the condition of the item and detail what is included or noticeably absent.
          </li>
          <li>
            As a Borrower, by requesting to rent an item through our Services, you are responsible for having sufficient
            funds available to replace the item should you lose or damage the item. If you do not know how much the item
            is worth, please contact a member of the LensHood team prior to submitting your request and we will assist
            you. If you do not have funds available for the approximate value of the item, do not request to borrow the
            item.
          </li>
          <li>
            We have the right to take money up to the Estimated Value of the item from your account without seeking
            further permission from you, if we reasonably believe you have caused damage to the item, or are unable to
            return it for any reason within 7 days of the return deadline.
          </li>
          <li>
            You further acknowledge that as a Borrower, if you return the item after the Return Deadline (as defined in
            the Borrower's Rules), we are entitled to charge you up to twice the full Rental Fee and Borrower Commission
            for each additional day that the item is returned after the Return Deadline (for the avoidance of doubt, if
            the item is returned after the Return Deadline on the scheduled day of return, you shall be charged for a
            full additional day of rental). You further acknowledge that we may take the funds directly from your
            account to cover such charges, without seeking further permission from you. The Return Deadline is the time
            you agreed to return the item with the lender, or 12pm on the rental return date (whichever time is later).
          </li>
          <li>
            In the event of a good faith dispute between the parties in relation to the Estimated Value of a particular
            item, LensHood has the sole discretion to set an appropriate Estimated Value for that item, determined in
            good faith and taking into account the reasonable representations of the parties.
          </li>
          <li>
            If you refuse to pay for any damage caused, or to pay any amount that you owe to LensHood or a LensHood
            user, for any reason, within the timeframe given to you by LensHood, we will engage the services of debt
            collectors who will pursue this debt with you on our behalf. You agree that the charge for their services
            will be added to the debt they will be collecting from you.
          </li>
        </ol>
        <br />
        <h2>OUR LIABILITY</h2>
        <ol>
          <li>
            Nothing in these Terms shall limit the liability of LensHood for fraudulent misrepresentation, or for death
            or personal injury resulting from its negligence or the negligence of its agents or employees.
          </li>
          <li>
            You have certain rights under the law. These include that we will provide the LensHood Service to you with
            reasonable skill and care. You have certain legal remedies if we breach any of these rights. Nothing in
            these Terms is intended to affect these legal rights or other rights which you may also be entitled, for
            example to damages or specific performance. For more information about your legal rights contact your local
            Citizens Advice Service or Trading Standards Service.
          </li>
          <li>
            Under no circumstances shall LensHood be liable or responsible for the acts or omissions of any third party
            who uses the LensHood Service (including any third party with whom you enter into a transaction through the
            LensHood Service). LensHood is acting as an intermediary only in respect of any transaction concluded by
            parties introduced to each other through the LensHood Service for the rental of any item listed on the
            LensHood Service and accepts no liability for the performance of either party (i.e. Borrower or Lender) in
            relation to any such transaction.
          </li>
          <li>
            Without prejudice to point 3 above, LensHood is not responsible for: 4.1 Losses not caused by our breach;
            4.2 indirect losses which are a side effect of the main loss or damage and which are not reasonably
            foreseeable by at the time of entering into this agreement, (for example loss of profits or loss of
            opportunity); 4.3 User Content to the extent that such content is unlawful, threatening, abusive,
            defamatory, obscene or indecent or otherwise violates or infringes upon the rights of any other person,
            including, without limitation, any transmissions constituting or encouraging conduct that would constitute a
            criminal offence, give rise to civil liability or otherwise violate any applicable law; or 4.4 failure to
            provide the LensHood Service or to meet any of our obligations under this agreement where such failure is
            due to Events Beyond Our Control. 4.5 For the purposes of section 4.4 above, "Events Beyond Our Control"
            means any cause beyond our reasonable control which prevents us from providing the Service or fulfilling any
            of our other obligations under this agreement and includes but is not limited to fire, flood, storm, riot,
            civil disturbance, war, nuclear accident, terrorist activity and acts of God.
          </li>
          <li>
            You acknowledge that we cannot guarantee continuous, error-free or secure access to the LensHood Service or
            that defects in the LensHood Service will be corrected. While we will use reasonable efforts to maintain an
            uninterrupted service, we cannot guarantee this and we do not give any promises or warranties (whether
            express or implied) about the operation and availability of the LensHood Service.
          </li>
          <li>
            Accordingly, to the extent legally permitted we expressly disclaim all warranties, representations and
            conditions, express or implied, including those of quality, merchantability, merchantable quality,
            durability, fitness for a particular purpose and those arising by statute.
          </li>
        </ol>
        <br />
        <h2>ENDING YOUR USE OF THE LensHood SERVICE</h2>
        <ol>
          <li>You can simply choose to stop using the LensHood Service at any time.</li>
          <li>
            You acknowledge that your use of the LensHood Service is subject to LensHood's discretion and LensHood may,
            in the event of your breach of the Terms, at its sole discretion, withdraw your rights to use the LensHood
            Service on the provision of written notice with immediate effect.
          </li>
        </ol>
        <br />
        <h2>PERSONAL INFORMATION</h2>
        <ol>
          <li>
            By using LensHood Services, you agree to the collection, transfer, storage and use of your personal
            information by LensHood, as further described in our Privacy Policy.Among other things, you agree that
            LensHood may use the personal information that you submit to us: (i) to verify your identity; (ii) for
            performing anti-money laundering checks; (iii) for conducting "know your customer" (KYC) checks; and (iv)
            conducting "know your transaction" (KYT) checks.
          </li>
          <li>
            You also agree to receive direct electronic messaging marketing communications from us unless you tell us
            that you prefer not receive such communications.
          </li>
        </ol>
        <br />
        <h2>DISPUTES</h2>
        <ol>
          <li>
            Disputes between Users:
            <ul>
              <li>
                If you have a dispute with one or more LensHood users, you release us (and our officers, directors,
                agents, and employees) from any and all claims, demands and damages (actual and consequential) of every
                kind and nature, known or unknown, arising out of or in any way connected with such disputes.
              </li>
              <li>
                If a Borrower and Lender are unable to resolve a dispute, LensHood will use reasonable efforts to
                mediate in respect of such dispute and, without prejudice to its rights set out under these Terms, may
                choose to deduct monies up to the estimated value of a particular item from the account of the Borrower
                to compensate the Lender following loss or damage of a particular item that has been rented as part of
                the transaction. LensHood will also charge a fee of 30% of the amount charged on top of any monies
                collected in order to cover the service of acting as a mediator.
              </li>
            </ul>
          </li>
          <li>
            Disputes between you and LensHood{' '}
            <ul>
              <li>
                If the unlikely event of a dispute arises between you and LensHood, we strongly encourage you to first
                contact us directly to seek a resolution by going to the LensHood Contact page. We will consider
                reasonable requests to resolve the dispute through alternative dispute resolution procedures, such as
                mediation or arbitration, as alternatives to litigation.
              </li>
            </ul>
          </li>
        </ol>{' '}
      </div>
    </PageLayout>
  );
};

export default TermsOfServiceView;
