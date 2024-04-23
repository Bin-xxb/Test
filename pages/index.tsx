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
import { url } from "inspector";

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

    "& .overview-infographic": {
      marginTop: "50px",
      marginBottom: "30px",
      "& .overview-list": {
        "& .overview-step": {
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "12px",
          backgroundColor: "#191B5E",
          marginLeft: "-30px",
          marginRight: "-30px",
          marginTop: "5px",
          listStyle: "none",
          "& li": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "230px",
            width: "20%",
            "&:first-child": {
              marginLeft: "90px",
            },
            "&:last-child": {
              marginRight: "80px",
            },
            "& h2": {
              marginTop: "10px",
              marginBottom: "20px",
              fontSize: variable.fontSizeBase,
              fontWeight: variable.fontWeightMedium,
              color: variable.white,
              fontStyle: "normal",
              lineHeight: "24px",
            },
          },
          "& .step-image": {
            display: "block",
            marginTop: "-40px",
            width: "80px",
            height: "80px",
            backgroundRepeat: "no-repeat",
          },
          "& .overview-step1-image": {
            backgroundImage:
              "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step1-image.svg')",
          },
          "& .overview-step2-image": {
            backgroundImage:
              "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step2-image.svg')",
          },
          "& .overview-step3-image": {
            backgroundImage:
              "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step3-image.svg')",
          },
          "& .overview-step4-image": {
            backgroundImage:
              "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step4-image.svg')",
          },
          "& .overview-step5-image": {
            backgroundImage:
              "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step5-image.svg')",
          },
        },
      },
      "& h2": {
        marginTop: 0,
        marginBottom: 0,
      },
      "& .verview-item": {
        display: "flex",
        justifyContent: "center",
        gap: "90px",
        "&.column_2": {
          marginTop: "-15px",
        },
        "& .card": {
          width: "310px",
          height: "auto",
          position: "relative",
          padding: "25px 30px 15px 30px",
          borderRadius: "16px 16px 0px 0px",
          boxShadow: "4px 0px 12px rgba(0, 0, 0, 0.12)",
          backgroundColor: "rgba(238, 241, 244, 1)",
          "& h2": {
            marginTop: 0,
            fontSize: variable.fontSizeBase,
            lineHeight: "16px",
            fontWeight: variable.fontWeightBold,
            color: variable.red300,
            textAlign: "left",
          },
          "& h3": {
            fontSize: variable.fontSizeXs,
            lineHeight: "16px",
            fontWeight: variable.fontWeightBold,
            color: variable.black,
          },
          "& h5": {
            marginTop: 0,
            marginBottom: 0,
          },
          "& p": {
            fontSize: variable.fontSizeXs,
            lineHeight: "16px",
          },
          "& .box": {
            marginTop: "12px",
            padding: "15px 12px",
            borderRadius: "12px",
            border: "1px solid rgba(182, 198, 207, 1)",
            backgroundColor: "rgba(249, 250, 251, 1)",
            "& i": {
              display: "inline-block",
              width: "10px",
              height: "10px",
              marginRight: variable.spacer1,
              verticalAlign: "middle",
              backgroundRepeat: "no-repeat",
            },
            "& em": {
              display: "inline-block",
              width: "10px",
              height: "10px",
              marginRight: variable.spacer1,
              verticalAlign: "middle",
              backgroundRepeat: "no-repeat",
            },
            "& .high-risk-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/high-risk-icon_1.svg')",
            },
            "& .intermediate-risk-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/intermediate-risk-icon.svg')",
            },
            "& .low-risk-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/low-risk-icon.svg')",
            },
            "& strong": {
              fontSize: variable.fontSizeXs,
              fontWeight: variable.fontWeightBold,
              color: variable.black,
            },
            "& span": {
              fontSize: variable.fontSizeXs,
              color: variable.black,
            },
          },
          "& ul": {
            paddingLeft: "14px",
            "& li": {
              marginBottom: variable.spacer1,
              fontSize: variable.fontSizeXs,
              lineHeight: "14px",
              color: variable.black,
              fontStyle: "normal",
              listStyle: "disc",
            },
          },
          "& .steps-icon": {
            position: "absolute",
            top: "18px",
            left: "-17px",
            width: "35px",
            height: "35px",
            backgroundRepeat: "no-repeat",
          },
          "&.steps_1": {
            "& .steps-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step1-icon.svg')",
            },
          },
          "&.steps_2": {
            "& .steps-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step2-icon.svg')",
            },
            "& .variables": {
              "&::before": {
                content: `''`,
                display: "table",
              },
              "&::after": {
                content: `''`,
                display: "table",
                clear: "both",
              },
            },
            "& .variables_left": {
              width: "50%",
              float: "left",
            },
            "& .variables_right": {
              width: "50%",
              float: "left",
              "& h3": {
                marginTop: 0,
              },
            },
            "& .hight-message": {
              padding: "10px",
              borderRadius: "12px",
              border: "1px solid rgba(182, 198, 207, 1)",
              backgroundColor: "rgba(249, 250, 251, 1)",
              "& .hight-message-icon": {
                display: "inline-block",
                float: "left",
                width: "30px",
                height: "30px",
                marginRight: variable.spacer2,
                marginTop: variable.spacer1,
                backgroundRepeat: "no-repeat",
                backgroundImage:
                  "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/high-risk-icon.svg')",
              },
              "& p": {
                display: "inline-block",
                width: "calc(100% - 40px)",
                fontSize: variable.fontSizeXXSmall,
                lineHeight: "12px",
                fontWeight: variable.fontWeightBold,
                color: variable.black,
              },
            },
            "& ul": {
              marginTop: 0,
            },
          },
          "&.steps_3": {
            "& .steps-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step3-icon.svg')",
            },
            "& .box h5": {
              fontSize: variable.fontSizeXSmall,
            },
            "& .box p": {
              marginBottom: "2px",
            },
            "& .steps_5_list": {
              marginBottom: "30px",
              "&::before": {
                content: `''`,
                display: "table",
              },
              "&::after": {
                content: `''`,
                display: "table",
                clear: "both",
              },
              "& ul": {
                width: "50%",
                float: "left",
                "& li": {
                  "& span": {
                    paddingRight: variable.spacer1,
                  },
                  "& .icon": {
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    verticalAlign: "top",
                    backgroundRepeat: "no-repeat",
                  },
                  "& .angle-down": {
                    backgroundImage:
                      "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/arrow-down.svg')",
                  },
                  "& .angle-up": {
                    backgroundImage:
                      "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/arrow-up.svg')",
                    marginLeft: variable.spacer1,
                  },
                },
              },
            },
          },
          "&.steps_4": {
            "& .steps-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step4-icon.svg')",
            },
          },
          "&.steps_5": {
            "& .steps-icon": {
              backgroundImage:
                "url('https://d35rj4ptypp2hd.cloudfront.net/home-overview/overview-step5-icon.svg')",
            },
          },
          "& .steps_5_left": {
            width: "50%",
            float: "left",
          },
          "& .steps_5_right": {
            width: "50%",
            float: "left",
          },
        },
      },
      "& .mobile": {
        display: "none",
      },
      "@media (max-width: 1100px)": {
        "& .desktop": {
          display: "none",
        },
        "& .mobile": {
          display: "block",
          overflow: "hidden",
          marginTop: "-50px",
          marginLeft: "-32px",
          marginRight: "-32px",
          "& .overview-list": {
            overflowX: "scroll",
            paddingBottom: "20px",
            paddingTop: "50px",
            "& .overview-step": {
              width: "2200px",
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
              justifyContent: "flex-start",
              borderRadius: 0,
              "& li": {
                marginLeft: "45px",
                marginRight: "45px",
                width: "360px",
                maxWidth: "none",
              },
            },
          },
          "& .verview-item": {
            display: "flex",
            flexFlow: "wrap",
            alignItems: "stretch",
            justifycontent: "inherit",
            width: "2200px",
            "& .card": {
              display: "flex",
              width: "auto",
              flex: "0 0 350px",
              flexDirection: "column",
            },
          },
        },
      },
      "@media (max-width: 480px)": {
        "& .mobile": {
          "& .overview-list": {
            "& .overview-step": {
              width: "1930px",
              "& li": {
                width: "300px",
              },
            },
          },
          "& .verview-item": {
            width: "1925px",
            "& .card": {
              flex: "0 0 300px",
            },
          },
        },
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

          <Container
            size={variable.breakpointAlt}
            px={variable.spacer4}
            sx={{
              "& .footnote": {
                paddingTop: "30px",
                "& li": {
                  fontStyle: "normal",
                  color: variable.black,
                  "& sup": {
                    fontSize: variable.fontSizeXXSmall,
                    color: "rgba(25, 27, 94, 0.8)",
                  },
                },
              },
            }}
          >
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
