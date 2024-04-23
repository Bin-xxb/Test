import React from "react";
import Layout from "../components/Layout";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import client from "../lib/apolloClient";
import {
  QUERY_HEADER,
  QUERY_FOOTER,
  QUERY_HOME,
  QUERY_PDF,
} from "../pages/api/gql";
import { HomeProps } from "../types";
import { Button, Container, createStyles } from "@mantine/core";
import variable from "../styles/theme/variables";
import ArrowToBottom from "../public/assets/cmsImages/arrow-alt-to-bottom.svg";
import CalculatorSolid from "../public/assets/cmsImages/calculator-solid.svg";
import { getCacheTimeoutObj } from "../utility/cacheTimeout";

const useStyles = createStyles((theme) => ({
  buttonAlt: {
    fontFamily: variable.fontFamily,
    fontWeight: variable.fontWeightSemiBold,
    lineHeight: "19px",
    backgroundColor: variable.red300,
    "&:hover, :not([data-disabled]):hover": {
      backgroundColor: variable.red500,
    },
  },
  heroBanner: {
    marginLeft: "-16px",
    marginRight: "-16px",
    //backgroundColor: variable.blue,
    background: "url('/assets/cmsImages/herobanner.full.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    position: "relative",
    height: "500px",
    color: variable.white,
    [variable.mdDown]: {
      height: "100%",
      paddingTop: "30px",
      paddingBottom: "30px",
    },
  },

  heroBannerWrapper: {
    height: "500px",
    maxWidth: "1200px",
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "auto",
    "&::before": {
      content: `''`,
      display: "table",
    },
    "&::after": {
      content: `''`,
      display: "table",
      clear: "both",
    },
    [variable.mdDown]: {
      height: "100%",
    },
  },
  bannerButton: {
    width: "283px",
    height: "50px",
    fontSize: variable.fontSizeMedium,
    fontWeight: variable.fontWeightSemiBold,
    backgroundColor: variable.red300,
    borderRadius: "8px !important",
    [variable.mobileDown]: {
      width: "calc(100% - 40px)",
      marginLeft: "20px !important",
      marginRight: "20px",
    },
    "&:hover, &:focus, &:active": {
      backgroundColor: "#de0738 !important",
    },
    "& svg": {
      width: "16px",
      fill: variable.white,
      marginLeft: variable.spacer3,
    },
  },
  heroLeft: {
    width: "calc(50% - 16px)",
    height: "100%",
    float: "left",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: variable.spacer4,
    [variable.mdDown]: {
      width: "100%",
      float: "none",
      height: "auto",
      alignItems: "center",
      marginBottom: variable.spacer10,
      marginRight: 0,
    },
    "& span": {
      fontSize: variable.fontSizeMedium,
    },
    "& h2": {
      marginTop: variable.spacer3,
      fontFamily: variable.fontFamilyPoppinMedium,
      fontSize: variable.fontSizeXXLarge,
      fontWeight: variable.fontWeightMedium,
      lineHeight: "48px",
      [variable.mdDown]: {
        textAlign: "center",
      },
      "@media (max-width: 500px)": {
        fontSize: variable.fontSizeXLarge,
        lineHeight: "32px",
      },
    },
  },
  heroRight: {
    width: "calc(50% - 16px)",
    height: "100%",
    float: "left",
    background: "url('/assets/cmsImages/hero-banner.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    marginLeft: variable.spacer4,
    [variable.mdDown]: {
      width: "100%",
      float: "none",
      height: "auto",
      paddingBottom: "30%",
      marginLeft: 0,
    },
  },

  guideline: {
    maxWidth: "570px",
    height: "170px",
    margin: "auto",
    marginBottom: variable.spacer14,
    textAlign: "center",
    background: "url('/assets/cmsImages/cta-device.full.svg')",
    backgroundRepeat: "no-repeat",
    "@media(max-width: 500px)": {
      backgroundSize: "contain",
    },
    "& h3": {
      paddingTop: variable.spacer6,
      color: "rgba(25,27,94,0.8)",
      fontSize: variable.fontSizeXLarge,
      fontFamily: variable.fontFamily,
      fontWeight: variable.fontWeightSemiBold,
      lineHeight: "32px",
    },
  },
  infographic: {
    marginBottom: variable.spacer12,

    "& h2": {
      marginTop: "140px",
      marginBottom: variable.spacer1,
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: variable.fontWeightSemiBold,
      textAlign: "center",
      [variable.mobileDown]: {
        marginTop: "60px",
        marginBottom: variable.spacer3,
      },
    },

    "& figure": {
      marginTop: 0,
      marginBottom: 0,
    },

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    "& ul": {
      listStyleType: "none",
      paddingLeft: 0,

      li: {
        fontStyle: "italic",
        fontSize: variable.fontSizeXSmall,
        color: variable.grey600,

        span: {
          paddingRight: variable.spacer4,
        },
      },
    },
  },
}));

export default function Home({ data }: HomeProps) {
  const { classes, theme } = useStyles();

  return (
    <>
      <Layout data={data}>
        <Container
          size={variable.breakpointXl}
          px={variable.spacer4}
          maw={"none"}
        >
          <section className={classes.heroBanner}>
            <div className={classes.heroBannerWrapper}>
              <div className={classes.heroLeft}>
                <h2>
                  Australian guideline and calculator for assessing and managing
                  cardiovascular disease risk
                </h2>
              </div>
              <div className={classes.heroRight}></div>
            </div>
            <Button.Group
              sx={{
                justifyContent: "center",
                gap: "25px",
                position: "absolute",
                left: "calc(50% - 295.5px)",
                bottom: "-70px",
                [variable.mobileDown]: {
                  position: "static",
                  flexDirection: "column",
                  marginTop: variable.spacer7,
                  gap: 0,
                },
              }}
            >
              <Button
                component="a"
                href="/calculator"
                rightIcon={<CalculatorSolid />}
                className={classes.bannerButton}
                aria-label="start calculator now"
              >
                Start calculator now
              </Button>

              <Button
                component="a"
                href="/overview"
                className={classes.bannerButton}
                aria-label="read the guideline"
                sx={{
                  [variable.mobileDown]: {
                    marginTop: variable.spacer4,
                  },
                  "& svg": {
                    width: "14px",
                    marginTop: "-2px",
                  },
                  "& .mantine-Button-label:after": {
                    content: "url(/assets/cmsImages/arrow-right-white.svg)",
                    width: "12px",
                    height: "12px",
                    marginTop: "-2px",
                    marginLeft: variable.spacer3,
                  },
                }}
              >
                Read the guideline
              </Button>
            </Button.Group>
          </section>

          <Container size={variable.breakpointAlt} px={variable.spacer4}>
            {
              <div
                className={classes.infographic}
                dangerouslySetInnerHTML={{
                  __html: data.HomeEntry.redactor,
                }}
              />
            }
          </Container>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
            query GetData {
                ${QUERY_HEADER}
                ${QUERY_FOOTER}
                ${QUERY_HOME}
                ${QUERY_PDF}
            }
        `,
  });

  const cacheTimeoutObj = getCacheTimeoutObj();

  return {
    props: {
      data,
    },
    ...cacheTimeoutObj,
  };
};
