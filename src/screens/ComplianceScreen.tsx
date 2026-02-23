import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Type, spacing } from '../design-system';

export function ComplianceScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Type scale="h2" style={styles.mainTitle}>
        Compliance & Accessibility
      </Type>
      <Type scale="caption" muted style={styles.lastUpdated}>
        Last Updated: February 2026
      </Type>

      {/* HIPAA Section */}
      <View style={styles.section}>
        <Type scale="h3" style={styles.sectionTitle}>
          HIPAA Compliance
        </Type>
        <Type scale="body" style={styles.paragraph}>
          Levanto is committed to protecting your health information and maintaining compliance with the Health Insurance Portability and Accountability Act (HIPAA) of 1996.
        </Type>

        <Type scale="h4" style={styles.subsectionTitle}>
          Protected Health Information (PHI)
        </Type>
        <Type scale="body" style={styles.paragraph}>
          We implement administrative, physical, and technical safeguards to protect your Protected Health Information (PHI). All health data collected through our wellness programs is encrypted both in transit and at rest, and access is restricted to authorized personnel only.
        </Type>

        <Type scale="h4" style={styles.subsectionTitle}>
          Your Privacy Rights
        </Type>
        <Type scale="body" style={styles.paragraph}>
          Under HIPAA, you have the right to:
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Access and obtain a copy of your health information
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Request corrections to your health information
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Receive an accounting of disclosures of your health information
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Request restrictions on uses and disclosures of your information
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Request confidential communications
        </Type>

        <Type scale="h4" style={styles.subsectionTitle}>
          Data Security Measures
        </Type>
        <Type scale="body" style={styles.paragraph}>
          Our platform employs industry-standard security measures including 256-bit SSL/TLS encryption, secure authentication protocols, regular security audits, and comprehensive access controls. We maintain a Business Associate Agreement (BAA) with all third-party service providers who may handle PHI.
        </Type>

        <Type scale="h4" style={styles.subsectionTitle}>
          Breach Notification
        </Type>
        <Type scale="body" style={styles.paragraph}>
          In the unlikely event of a breach of unsecured PHI, we will notify affected individuals within 60 days of discovery, in accordance with HIPAA breach notification requirements.
        </Type>
      </View>

      {/* ADA Section */}
      <View style={styles.section}>
        <Type scale="h3" style={styles.sectionTitle}>
          ADA Compliance
        </Type>
        <Type scale="body" style={styles.paragraph}>
          Levanto is committed to ensuring digital accessibility for people with disabilities in accordance with the Americans with Disabilities Act (ADA) and Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
        </Type>

        <Type scale="h4" style={styles.subsectionTitle}>
          Accessibility Features
        </Type>
        <Type scale="body" style={styles.paragraph}>
          Our platform includes the following accessibility features:
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Screen reader compatibility with descriptive labels
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Keyboard navigation support for all interactive elements
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • High contrast color schemes for improved visibility
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Scalable text that respects system font size settings
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Clear focus indicators for navigation
        </Type>
        <Type scale="body" style={styles.bulletPoint}>
          • Alternative text for images and icons
        </Type>

        <Type scale="h4" style={styles.subsectionTitle}>
          Reasonable Accommodations
        </Type>
        <Type scale="body" style={styles.paragraph}>
          We are committed to providing reasonable accommodations to employees with disabilities participating in wellness programs. Accommodations may include modified program activities, alternative formats for materials, or adjusted participation requirements.
        </Type>

        <Type scale="h4" style={styles.subsectionTitle}>
          Ongoing Improvement
        </Type>
        <Type scale="body" style={styles.paragraph}>
          We regularly review and test our platform for accessibility compliance and work to remediate any identified issues. We conduct periodic accessibility audits and user testing with assistive technologies to ensure our platform remains accessible to all users.
        </Type>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Type scale="h3" style={styles.sectionTitle}>
          Contact Us
        </Type>
        <Type scale="body" style={styles.paragraph}>
          If you have questions about our compliance practices, need to request accommodations, or wish to exercise your privacy rights, please contact:
        </Type>
        <Type scale="body" style={styles.contactInfo}>
          Compliance Department
        </Type>
        <Type scale="body" style={styles.contactInfo}>
          Email: compliance@levanto.health
        </Type>
        <Type scale="body" style={styles.contactInfo}>
          Phone: 1-800-LEVANTO
        </Type>
        <Type scale="body" style={styles.paragraph}>
          We will respond to all inquiries within 30 business days.
        </Type>
      </View>

      <View style={styles.footer}>
        <Type scale="caption" muted style={styles.footerText}>
          This page provides a general overview of our compliance practices. For complete details, please refer to our Privacy Policy and Terms of Service.
        </Type>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  mainTitle: {
    marginBottom: spacing.xs,
  },
  lastUpdated: {
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  subsectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  paragraph: {
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  bulletPoint: {
    marginBottom: spacing.xs,
    marginLeft: spacing.md,
    lineHeight: 24,
  },
  contactInfo: {
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  footer: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
