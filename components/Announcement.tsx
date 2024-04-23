import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Portal,
  Text,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { CloseButton } from "@mantine/core";
import variable from "@/styles/theme/variables";

export default function Announcement() {
  const [isOpen, setIsOpen] = useState(true);
  const [localStorageChecked, setLocalStorageChecked] = useState(false);
  const theme = useMantineTheme();

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const isAnnouncementClosed = sessionStorage.getItem("isAnnouncementClosed");
    if (isAnnouncementClosed === "true") {
      setIsOpen(false);
    }
    setLocalStorageChecked(true);
  }, []);

  useEffect(() => {
    if (!localStorageChecked) return;

    if (!isOpen) {
      sessionStorage.setItem("isAnnouncementClosed", "true");
    }
  }, [isOpen, localStorageChecked]);

  // Only render if the localStorage has been checked
  if (!localStorageChecked) {
    return null;
  }
  return (
    <Portal>
      {isOpen && (
        <Paper
          shadow="xs"
          sx={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: variable.spacer0,
            left: variable.spacer0,
            maxWidth: "550px",
            padding: variable.spacer5,
            background: "url('/assets/cmsImages/herobanner.full-red.svg')",
            color: theme.white,
            zIndex: 1000,
            border: "1px solid rgba(255,255,255,0.3)",
            "@media(max-width: 480px)": {
              display: "block",
            },
          }}
        >
          <Box
            sx={{
              width: "calc(55% - 4px)",
              float: "left",
              marginRight: variable.spacer1,
              "@media(max-width: 480px)": {
                width: "100%",
              },
            }}
          >
            <Text>
              Get involved in Heart Week (6-12 May) - access new resources, encourage your patients to get a Heart Health Check and use the new Aus CVD Risk calculator.
            </Text>
            <Button
              component="a"
              target="_blank"
              href="https://www.heartfoundation.org.au/heart-week?&utm_source=cvdcheck&utm_medium=web&utm_campaign=heart-week-2024&utm_content=web-pop-up"
              sx={{
                marginTop: variable.spacer4,
                fontWeight: variable.fontWeightSemiBold,
                backgroundColor: variable.red300,
                lineHeight: "19px",
                height: "42px",
                [variable.smDown]: {
                  display: "block",
                  width: "100%",
                  marginTop: "30px",
                },
                "@media(max-width: 480px)": {
                  marginTop: "20px",
                },

                "&:hover": {
                  backgroundColor: variable.red500,
                },
              }}
            >
              Learn More
            </Button>
          </Box>
          <Box
            sx={{
              width: "calc(45% - 12px)",
              height: "100%",
              float: "left",
              background: "url('/assets/cmsImages/0324-HP-pop-up-banner.svg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              marginLeft: variable.spacer3,
              paddingBottom: "35%",
              "@media(max-width: 480px)": {
                width: "100%",
                marginTop: variable.spacer2,
              },
            }}
          ></Box>

          <CloseButton
            onClick={handleClose}
            sx={{
              width: "20px",
              minWidth: "20px",
              height: "20px",
              minHeight: "20px",
              position: "absolute",
              right: variable.spacer2,
              top: variable.spacer2,
              padding: 0,
              color: variable.white,
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            title="Close"
            size="xl"
            iconSize={20}
          />
        </Paper>
      )}
    </Portal>
  );
}
