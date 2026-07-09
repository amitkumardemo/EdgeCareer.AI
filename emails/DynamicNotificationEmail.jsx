import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Button,
  Link,
  Hr,
  Column,
  Row,
  Preview,
} from "@react-email/components";

// --- Premium Theme Config ---
const theme = {
  primary: "#000000",
  primaryHover: "#333333",
  brandBlue: "#0B5FFF",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  white: "#FFFFFF",
  gray50: "#FAFAFA",
  gray100: "#F4F4F5",
  gray200: "#E4E4E7",
  gray300: "#D4D4D8",
  gray500: "#71717A",
  gray800: "#27272A",
  gray900: "#09090B",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

// --- Helper Functions ---
const getBadgeStyles = (status) => {
  let bg = theme.gray100;
  let color = theme.gray800;
  let borderColor = theme.gray200;

  switch (status?.toLowerCase()) {
    case "success":
    case "verified":
    case "completed":
    case "selected":
    case "present":
      bg = "#ECFDF5";
      color = "#047857";
      borderColor = "#A7F3D0";
      break;
    case "pending":
    case "new":
      bg = "#EFF6FF";
      color = "#1D4ED8";
      borderColor = "#BFDBFE";
      break;
    case "rejected":
    case "failed":
    case "absent":
      bg = "#FEF2F2";
      color = "#B91C1C";
      borderColor = "#FECACA";
      break;
    case "warning":
    case "important":
    case "deadline":
    case "late":
      bg = "#FFFBEB";
      color = "#B45309";
      borderColor = "#FDE68A";
      break;
    default:
      if (status) {
        bg = theme.gray100;
        color = theme.gray800;
        borderColor = theme.gray200;
      }
  }

  return {
    backgroundColor: bg,
    color: color,
    border: `1px solid ${borderColor}`,
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "inline-block",
    marginBottom: "24px",
  };
};

/**
 * Premium Notification Email Component
 */
export const DynamicNotificationEmail = ({
  subject = "Notification from TechieHelp",
  previewText = "Important update regarding your account",
  username = "Student",
  heroTitle = "Important Update",
  message = "",
  statusBadge = null,
  infoCards = [],
  timeline = [],
  certificate = null,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  appUrl = "https://techiehelpinstituteofai.in",
}) => {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          
          {/* HEADER SECTION - Minimal and Clean */}
          <Section style={header}>
            <Img
              src={`${appUrl}/logo.png`}
              alt="TechieHelp Institute of AI"
              width="180"
              style={logo}
            />
          </Section>

          {/* MAIN CONTENT SECTION */}
          <Section style={contentSection}>
            {statusBadge && (
              <div style={getBadgeStyles(statusBadge)}>{statusBadge}</div>
            )}
            
            <Text style={h1}>{heroTitle}</Text>
            <Text style={greeting}>Hi {username},</Text>
            
            <Text style={messageText} dangerouslySetInnerHTML={{ __html: message }} />
            
            {/* INFORMATION CARDS */}
            {infoCards && infoCards.length > 0 && (
              <Section style={infoCardGrid}>
                {infoCards.map((card, index) => (
                  <div key={index} style={infoCard}>
                    <Text style={infoLabel}>{card.label}</Text>
                    <Text style={infoValue}>{card.value}</Text>
                  </div>
                ))}
              </Section>
            )}

            {/* TIMELINE SECTION */}
            {timeline && timeline.length > 0 && (
              <Section style={timelineContainer}>
                <Text style={sectionTitle}>Status Tracking</Text>
                {timeline.map((item, index) => (
                  <div key={index} style={timelineItem}>
                    <div style={{
                      ...timelineDot, 
                      backgroundColor: item.active ? theme.brandBlue : theme.white,
                      borderColor: item.active ? theme.brandBlue : theme.gray300
                    }}></div>
                    <Text style={{
                      ...timelineText,
                      color: item.active ? theme.gray900 : theme.gray500,
                      fontWeight: item.active ? "600" : "400"
                    }}>
                      {item.title}
                    </Text>
                  </div>
                ))}
              </Section>
            )}

            {/* CERTIFICATE PREVIEW */}
            {certificate && (
              <Section style={certificateContainer}>
                <Text style={sectionTitle}>Your Credential</Text>
                {certificate.previewImg && (
                  <Img src={certificate.previewImg} alt="Certificate Preview" style={certificateImg} />
                )}
                {certificate.id && (
                  <Text style={certificateIdText}>Credential ID: {certificate.id}</Text>
                )}
              </Section>
            )}

            {/* CALL TO ACTION */}
            {(buttonText && buttonLink) && (
              <Section style={ctaContainer}>
                <Button href={buttonLink} style={primaryButton}>
                  {buttonText}
                </Button>
                {(secondaryButtonText && secondaryButtonLink) && (
                  <div style={{ marginTop: "12px" }}>
                    <Button href={secondaryButtonLink} style={secondaryButton}>
                      {secondaryButtonText}
                    </Button>
                  </div>
                )}
              </Section>
            )}
          </Section>

          <Hr style={divider} />

          {/* MINIMAL FOOTER */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong style={{ color: theme.gray900 }}>TechieHelp Institute of AI</strong><br/>
              Empowering the next generation of tech leaders.
            </Text>
            
            <Row style={socialRow}>
              <Column align="left">
                <Link href={`${appUrl}`} style={footerLink}>Dashboard</Link>
                <span style={footerLinkDivider}>•</span>
                <Link href={`mailto:support@techiehelpinstituteofai.in`} style={footerLink}>Contact Support</Link>
                <span style={footerLinkDivider}>•</span>
                <Link href={`${appUrl}/privacy`} style={footerLink}>Privacy</Link>
              </Column>
            </Row>
            
            <Text style={copyright}>
              © {new Date().getFullYear()} TechieHelp. All rights reserved.<br/>
              This is an automated operational notification. Please do not reply directly to this email address.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DynamicNotificationEmail;

// --- CSS-in-JS STYLES ---

const main = {
  backgroundColor: theme.gray50,
  fontFamily: theme.fontFamily,
  padding: "40px 0",
};

const container = {
  backgroundColor: theme.white,
  margin: "0 auto",
  padding: "0",
  borderRadius: "12px",
  border: `1px solid ${theme.gray200}`,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
  maxWidth: "600px",
};

const header = {
  padding: "40px 40px 24px 40px",
  textAlign: "left",
};

const logo = {
  display: "block",
  maxWidth: "100%",
  objectFit: "contain",
};

const contentSection = {
  padding: "0 40px 40px 40px",
};

const h1 = {
  color: theme.gray900,
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "1.25",
  margin: "0 0 24px 0",
  letterSpacing: "-0.5px",
};

const greeting = {
  fontSize: "16px",
  fontWeight: "500",
  color: theme.gray800,
  margin: "0 0 16px 0",
};

const messageText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: theme.gray500,
  margin: "0 0 32px 0",
};

const infoCardGrid = {
  backgroundColor: theme.gray50,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "32px",
  border: `1px solid ${theme.gray200}`,
};

const infoCard = {
  marginBottom: "16px",
  paddingBottom: "16px",
  borderBottom: `1px solid ${theme.gray200}`,
};

const infoLabel = {
  fontSize: "12px",
  fontWeight: "600",
  color: theme.gray500,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: "0 0 4px 0",
};

const infoValue = {
  fontSize: "15px",
  fontWeight: "500",
  color: theme.gray900,
  margin: "0",
};

const timelineContainer = {
  marginBottom: "32px",
  padding: "20px",
  backgroundColor: theme.white,
  borderRadius: "8px",
  border: `1px solid ${theme.gray200}`,
};

const sectionTitle = {
  fontSize: "12px",
  fontWeight: "600",
  color: theme.gray500,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "20px",
};

const timelineItem = {
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
};

const timelineDot = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  marginRight: "16px",
  border: "2px solid",
};

const timelineText = {
  margin: "0",
  fontSize: "14px",
};

const certificateContainer = {
  textAlign: "center",
  backgroundColor: theme.gray50,
  padding: "24px",
  borderRadius: "8px",
  marginBottom: "32px",
  border: `1px solid ${theme.gray200}`,
};

const certificateImg = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "6px",
  border: `1px solid ${theme.gray200}`,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  marginBottom: "16px",
  display: "block",
  margin: "0 auto 16px auto",
};

const certificateIdText = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "13px",
  color: theme.gray500,
  backgroundColor: theme.white,
  padding: "6px 12px",
  borderRadius: "6px",
  border: `1px solid ${theme.gray200}`,
  display: "inline-block",
  margin: "0",
};

const ctaContainer = {
  marginTop: "8px",
};

const primaryButton = {
  backgroundColor: theme.primary,
  color: theme.white,
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  padding: "12px 0",
  borderRadius: "6px",
  border: `1px solid ${theme.primary}`,
};

const secondaryButton = {
  backgroundColor: theme.white,
  color: theme.gray800,
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  padding: "12px 0",
  borderRadius: "6px",
  border: `1px solid ${theme.gray300}`,
};

const divider = {
  borderColor: theme.gray200,
  margin: "0",
  borderWidth: "1px 0 0 0",
};

const footer = {
  backgroundColor: theme.gray50,
  padding: "32px 40px",
  textAlign: "left",
};

const footerText = {
  fontSize: "13px",
  color: theme.gray500,
  margin: "0 0 16px 0",
  lineHeight: "1.5",
};

const socialRow = {
  marginBottom: "16px",
};

const footerLink = {
  color: theme.gray500,
  fontSize: "13px",
  textDecoration: "underline",
};

const footerLinkDivider = {
  color: theme.gray300,
  margin: "0 8px",
  fontSize: "13px",
};

const copyright = {
  color: theme.gray500,
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0",
};
