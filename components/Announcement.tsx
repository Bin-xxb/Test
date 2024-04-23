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
            background: "url('/assets/cmsImages/herobanner.full.svg')",
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
              width: "calc(50% - 4px)",
              float: "left",
              marginRight: variable.spacer1,
              "@media(max-width: 480px)": {
                width: "100%",
              },
            }}
          >
            <Text>
            Join the Heart Foundation’s clinical webinar on 15 November as our experts showcase the effective use of the Aus CVD Risk Calculator through live demo and case-based presentations.
            </Text>
            <Button
              component="a"
              target="_blank"
              href="https://heartfoundation-au.zoom.us/webinar/register/4116986387987/WN_qqRqCo3YR7qeUewP192PPQ"
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
              REGISTER NOW
            </Button>
          </Box>
          <Box
            sx={{
              width: "calc(50% - 12px)",
              height: "100%",
              float: "left",
              background: "url('/assets/cmsImages/large-CVD webinar.png')",
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
