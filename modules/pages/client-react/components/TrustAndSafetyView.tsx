import React from "react";
// import Helmet from 'react-helmet';
import { TranslateFunction } from "@gqlapp/i18n-client-react";
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

const TrustAndSafetyView = ({ t }: TrustAndSafetyViewProps) => {
  return (
    <div
      style={{
        width: "100%",
        alignItems: "center",
        fontFamily: "Avenir Next",
        display: "flex",
        flexDirection: "column",
        border: "none",
        marginTop: "10px"
      }}
    >
      <div
        style={{
          left: "50%",
          width: "100%",
          marginBottom: "32px",
          marginTop: "16px",
          paddingLeft: "16px",
          paddingRight: "16px",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          border: "none",
          color: "#767676"
        }}
      >
        <h1
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            fontWeight: 900,
            textAlign: "center",
            color: "#767676",
            fontSize: "55px"
          }}
        >
          Trust and Safety
        </h1>

        <h2
          style={{
            maxWidth: "900px",
            fontWeight: 400,
            textAlign: "center",
            marginTop: "10px",
            fontSize: "30px",
            color: "#767676"
          }}
        >
          LensHood Community is
          <span style={{ color: "#23b195" }}> 100% invite based</span> - Hence
          every user is referred by a trusted person from our community. We at
          LensHood have listed a few tips to make the most of your experience in
          this community.
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "100px",
            flexWrap: "wrap-reverse",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <div>
            <img
              src={require("../images/Illustrations/5 Steps.svg")}
              height="300px"
              width="500px"
            />
          </div>
          <div>
            <h1
              style={{
                fontWeight: 600,
                fontSize: "37px",
                margin: "0 0 0 0",
                color: "#767676",
                textAlign: "left",
                lineHeight: "30px"
              }}
            >
              5 Step Verification process
            </h1>
            <h2
              style={{
                fontWeight: 600,
                padding: "0 0 0 0",
                maxWidth: "500px",
                fontSize: "25px",
                color: "#767676",
                textAlign: "left"
              }}
            >
              Thorough Offline Identy, Product & Address Verification.
            </h2>
            <ul
              style={{
                listStyle: "none",
                textAlign: "left",
                padding: "0 0 0 4px",
                maxWidth: "500px"
              }}
            >
              <li style={{ fontSize: "30px" }}>
                <span>
                  <img
                    src={require("../images/tick.svg")}
                    width="30px"
                    height="30px"
                  />{" "}
                  ID Proof
                </span>
              </li>
              <li style={{ fontSize: "30px" }}>
                <span>
                  <img
                    src={require("../images/tick.svg")}
                    width="30px"
                    height="30px"
                  />{" "}
                  Address Proof
                </span>
              </li>
              <li style={{ fontSize: "30px" }}>
                <span>
                  <img
                    src={require("../images/tick.svg")}
                    width="30px"
                    height="30px"
                  />{" "}
                  Package photograph.
                </span>
              </li>
              <li style={{ fontSize: "30px" }}>
                <span>
                  <img
                    src={require("../images/tick.svg")}
                    width="30px"
                    height="30px"
                  />{" "}
                  User Photograph with equipment (LensHood Stickers)
                </span>
              </li>
              <li style={{ fontSize: "30px" }}>
                <span>
                  <img
                    src={require("../images/tick.svg")}
                    width="30px"
                    height="30px"
                  />{" "}
                  Photo of equipment (Body & Lenses) with Unique Serial Number.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "100px",
            flexWrap: "wrap-reverse",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <div>
            <img
              src={require("../images/Illustrations/Government ID.svg")}
              height="300px"
              width="500px"
            />
          </div>
          <div>
            <h1
              style={{
                fontWeight: 600,
                fontSize: "37px",
                margin: "0 0 0 0",
                color: "#767676",
                textAlign: "left"
              }}
            >
              Government ID
            </h1>
            <h2
              style={{
                fontWeight: 600,
                marginTop: "-5px",
                padding: "0 0 0 0",
                maxWidth: "500px",
                fontSize: "25px",
                color: "#767676",
                textAlign: "left",
                lineHeight: "29px"
              }}
            >
              We keep an Original Government ID Card of the renter during the
              rental period.
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "100px",
            flexWrap: "wrap-reverse",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <div>
            <img
              src={require("../images/Illustrations/Physical Undertaking.svg")}
              height="300px"
              width="500px"
            />
          </div>
          <div>
            <h1
              style={{
                fontWeight: 600,
                fontSize: "37px",
                margin: "0 0 0 0",
                color: "#767676",
                textAlign: "left",
                lineHeight: "30px"
              }}
            >
              Physical Undertaking
            </h1>
            <h2
              style={{
                fontWeight: 600,
                marginTop: "5px",
                padding: "0 0 0 0",
                maxWidth: "500px",
                fontSize: "25px",
                color: "#767676",
                textAlign: "left",
                lineHeight: "29px"
              }}
            >
              A physical undertaking is taken in the form of receipt from the
              lender before a rental.
            </h2>
          </div>
        </div>

        <div
          style={{
            background: "#ddd",
            width: "100%",
            height: "1.5px",
            marginTop: "150px"
          }}
        />

        <h1
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            fontWeight: 900,
            textAlign: "center",
            color: "#767676",
            fontSize: "55px",
            marginTop: "150px"
          }}
        >
          Equipment coverage policy
        </h1>

        <h2
          style={{
            maxWidth: "550px",
            fontWeight: 400,
            textAlign: "center",
            marginTop: "-20px",
            fontSize: "30px",
            color: "#767676"
          }}
        >
          What happens in case of theft or damage? Don’t worry! We have got your
          back!
        </h2>
        <div style={{ maxWidth: "1200px" }}>
          <h1
            style={{
              fontWeight: 600,
              fontSize: "37px",
              margin: "50px 0 0 0",
              color: "#767676",
              textAlign: "left"
            }}
          >
            In case of Theft
          </h1>

          <ul
            style={{
              listStyle: "none",
              textAlign: "left",
              padding: "0 0 0 4px"
            }}
          >
            <li style={{ fontSize: "30px" }}>
              <span>
                <img
                  src={require("../images/tick.svg")}
                  width="30px"
                  height="30px"
                />{" "}
                The person who invited the defaulter will be contacted and will
                be asked for more information.
              </span>
            </li>
            <li style={{ fontSize: "30px" }}>
              <span>
                <img
                  src={require("../images/tick.svg")}
                  width="30px"
                  height="30px"
                />{" "}
                Original ID Card, verication photos, undertaking in our
                possession will be used to le a legal case.
              </span>
            </li>
            <li style={{ fontSize: "30px" }}>
              <span>
                <img
                  src={require("../images/tick.svg")}
                  width="30px"
                  height="30px"
                />{" "}
                LensHood will buy a brand new equipment as soon as possible once
                theft is veried.We don’t want our lenders to suffer because of
                someone else fault.{" "}
              </span>
            </li>
          </ul>

          <h1
            style={{
              fontWeight: 600,
              fontSize: "37px",
              margin: "50px 0 0 0",
              color: "#767676",
              textAlign: "left"
            }}
          >
            In case of Damage
          </h1>
          <ul
            style={{
              listStyle: "none",
              textAlign: "left",
              padding: "0 0 0 4px"
            }}
          >
            <li style={{ fontSize: "30px" }}>
              <span>
                <img
                  src={require("../images/tick.svg")}
                  width="30px"
                  height="30px"
                />{" "}
                LensHood will service the equipment before returning
              </span>
            </li>
          </ul>

          <h1
            style={{
              fontWeight: 600,
              fontSize: "37px",
              margin: "50px 0 0 0",
              color: "#767676",
              textAlign: "left"
            }}
          >
            LensHood Insurance
          </h1>
          <ul
            style={{
              listStyle: "none",
              textAlign: "left",
              padding: "0 0 0 4px",
              fontWeight: 600
            }}
          >
            <li style={{ fontSize: "28px" }}>
              <span>
                <img
                  src={require("../images/tick.svg")}
                  width="30px"
                  height="30px"
                />{" "}
                Lender Insurance Fee
              </span>
            </li>
          </ul>

          <h3
            style={{
              color: "#767676",
              textAlign: "left",
              fontSize: "25px",
              margin: "-15px 0 0 32px"
            }}
          >
            Pay just <strong>1% of your equipment</strong> worth as monthly
            insurance of the device/equipment.
          </h3>
          <h3
            style={{
              color: "#767676",
              textAlign: "left",
              fontSize: "25px",
              margin: "-5px 0 0 32px"
            }}
          >
            Amount will be deducted from your earnings.
          </h3>

          <ul
            style={{
              listStyle: "none",
              textAlign: "left",
              padding: "0 0 0 4px",
              fontWeight: 600
            }}
          >
            <li style={{ fontSize: "28px" }}>
              <span>
                <img
                  src={require("../images/tick.svg")}
                  width="30px"
                  height="30px"
                />{" "}
                Renter Convenience Fee
              </span>
            </li>
          </ul>
          <h3
            style={{
              color: "#767676",
              textAlign: "left",
              fontSize: "25px",
              margin: "-5px 0 0 32px"
            }}
          >
            8% of the rental value will be charged for the coverage.
          </h3>
        </div>

        <div
          style={{
            background: "#ddd",
            width: "100%",
            height: "1.5px",
            marginTop: "150px"
          }}
        />
      </div>
    </div>
  );
};

export default TrustAndSafetyView;
