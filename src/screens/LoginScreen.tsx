import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Type, Card, Field, Button, spacing } from '../design-system';
import { useAuthStore } from '../store/authStore';

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

export function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailError = useMemo(() => {
    if (!email) return 'Email is required';
    if (!isValidEmail(email)) return 'Enter a valid email';
    return undefined;
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) return 'Password is required';
    return undefined;
  }, [password]);

  async function onSubmit() {
    setError(null);
    if (emailError || passwordError) return;
    setSubmitting(true);
    // Fake auth: any email + password 'admin' succeeds
    await new Promise((r) => setTimeout(r, 500));
    if (password === 'admin') {
      login(email, 'Acme Corporation');
    } else {
      setError('Invalid credentials');
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={Platform.OS === 'ios' ? 24 : 0}
    >
      <Type scale="h1">Levanto</Type>
      <Type scale="body" muted>
        Empowering you to live well
      </Type>
      <Type scale="label" muted style={{ marginTop: spacing.lg }}>
        Employer Portal
      </Type>

      <View style={styles.form}>
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={email ? (isValidEmail(email) ? undefined : 'Enter a valid email') : undefined}
        />
        <Field
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={!password ? 'Password is required' : undefined}
          style={{ marginTop: spacing.md }}
        />
        {error && (
          <Type scale="caption" skin="danger" style={{ marginTop: spacing.sm }}>
            {error}
          </Type>
        )}
        <View style={{ marginTop: spacing.lg }}>
          <Button onPress={onSubmit} disabled={submitting || !!emailError || !!passwordError}>
            {submitting ? 'Signing In…' : 'Sign In'}
          </Button>
        </View>
      </View>

      <Type scale="caption" muted style={{ marginTop: spacing.xl }}>
        Tip: use any email and password "admin" to sign in.
      </Type>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: '#F8F7FC',
  },
  form: {
    width: '100%',
    maxWidth: 420,
    marginTop: spacing.xl,
  },
});
