import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';
import { useAuthStore } from '../../store/authStore';

// Mock KeyboardAwareScrollView
jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const { View } = require('react-native');
  return {
    KeyboardAwareScrollView: ({ children, ...props }: any) => (
      <View {...props}>{children}</View>
    ),
  };
});

describe('LoginScreen', () => {
  beforeEach(() => {
    // Reset auth state before each test
    act(() => {
      useAuthStore.getState().logout();
    });
  });

  describe('Rendering', () => {
    it('should render the login form', () => {
      const { getByText } = render(<LoginScreen />);
      
      expect(getByText('Levanto')).toBeTruthy();
      expect(getByText('Empowering you to live well')).toBeTruthy();
      expect(getByText('Employer Portal')).toBeTruthy();
    });

    it('should render email and password fields', () => {
      const { getByText } = render(<LoginScreen />);
      
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('Password')).toBeTruthy();
    });

    it('should render sign in button', () => {
      const { getByText } = render(<LoginScreen />);
      
      expect(getByText('Sign In')).toBeTruthy();
    });

    it('should show hint about credentials', () => {
      const { getByText } = render(<LoginScreen />);
      
      expect(getByText('Tip: use any email and password "admin" to sign in.')).toBeTruthy();
    });
  });

  describe('Form Validation', () => {
    it('should disable sign in button when email is empty', () => {
      const { getByRole } = render(<LoginScreen />);
      
      const signInButton = getByRole('button', { name: 'Sign In' });
      
      // Button should be disabled initially (no email/password)
      expect(signInButton.props.accessibilityState?.disabled).toBe(true);
    });

    it('should show error for invalid email format', () => {
      const { getByText, getAllByDisplayValue } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      
      // Type invalid email
      fireEvent.changeText(fields[0], 'notanemail');
      
      // Should show validation error
      expect(getByText('Enter a valid email')).toBeTruthy();
    });

    it('should accept valid email format', () => {
      const { queryByText, getAllByDisplayValue } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      
      // Type valid email
      fireEvent.changeText(fields[0], 'test@example.com');
      
      // Should NOT show validation error after valid email
      // (Note: The error only shows when email has a value and is invalid)
      expect(queryByText('Enter a valid email')).toBeNull();
    });
  });

  describe('Form Submission', () => {
    it('should call login when form is submitted with valid credentials', async () => {
      const { getByText, getAllByDisplayValue } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      const passwordField = fields[1];
      
      // Fill in valid credentials
      fireEvent.changeText(emailField, 'test@example.com');
      fireEvent.changeText(passwordField, 'admin');
      
      // Submit form
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);
      
      // Wait for async login
      await waitFor(() => {
        expect(useAuthStore.getState().isAuthenticated).toBe(true);
      });
      
      expect(useAuthStore.getState().user).toBe('test@example.com');
      expect(useAuthStore.getState().companyName).toBe('Acme Corporation');
    });

    it('should show error message for invalid password', async () => {
      const { getByText, getAllByDisplayValue, findByText } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      const passwordField = fields[1];
      
      // Fill in credentials with wrong password
      fireEvent.changeText(emailField, 'test@example.com');
      fireEvent.changeText(passwordField, 'wrongpassword');
      
      // Submit form
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);
      
      // Should show error message
      const errorMessage = await findByText('Invalid credentials');
      expect(errorMessage).toBeTruthy();
    });

    it('should show loading state during submission', async () => {
      const { getByText, getAllByDisplayValue } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      const passwordField = fields[1];
      
      // Fill in valid credentials
      fireEvent.changeText(emailField, 'test@example.com');
      fireEvent.changeText(passwordField, 'admin');
      
      // Submit form
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);
      
      // Should show loading text
      expect(getByText('Signing In…')).toBeTruthy();
      
      // Wait for completion
      await waitFor(() => {
        expect(useAuthStore.getState().isAuthenticated).toBe(true);
      });
    });

    it('should not submit if email is invalid', () => {
      const { getByRole, getAllByDisplayValue } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      const passwordField = fields[1];
      
      // Fill in invalid email
      fireEvent.changeText(emailField, 'notanemail');
      fireEvent.changeText(passwordField, 'admin');
      
      // Button should be disabled
      const signInButton = getByRole('button', { name: 'Sign In' });
      expect(signInButton.props.accessibilityState?.disabled).toBe(true);
    });

    it('should not submit if password is empty', () => {
      const { getByRole, getAllByDisplayValue } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      
      // Fill in only email
      fireEvent.changeText(emailField, 'test@example.com');
      
      // Button should be disabled
      const signInButton = getByRole('button', { name: 'Sign In' });
      expect(signInButton.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Email Validation Logic', () => {
    it('should validate email with @ symbol and domain', () => {
      const { getAllByDisplayValue, queryByText } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      
      // Valid emails
      const validEmails = [
        'test@example.com',
        'user@domain.co',
        'name+tag@company.org',
        'user123@test-domain.com',
      ];
      
      validEmails.forEach(email => {
        fireEvent.changeText(emailField, email);
        expect(queryByText('Enter a valid email')).toBeNull();
      });
    });

    it('should reject invalid email formats', () => {
      const { getAllByDisplayValue, getByText } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      
      // Invalid emails
      const invalidEmails = [
        'notanemail',
        '@domain.com',
        'user@',
        'user@domain',
      ];
      
      invalidEmails.forEach(email => {
        fireEvent.changeText(emailField, email);
        expect(getByText('Enter a valid email')).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    it('should clear error when retrying after failed login', async () => {
      const { getByText, getAllByDisplayValue, findByText, queryByText } = render(<LoginScreen />);
      
      const fields = getAllByDisplayValue('');
      const emailField = fields[0];
      const passwordField = fields[1];
      
      // First attempt with wrong password
      fireEvent.changeText(emailField, 'test@example.com');
      fireEvent.changeText(passwordField, 'wrongpassword');
      fireEvent.press(getByText('Sign In'));
      
      // Wait for error
      await findByText('Invalid credentials');
      
      // Retry with correct password
      fireEvent.changeText(passwordField, 'admin');
      fireEvent.press(getByText('Sign In'));
      
      // Error should be cleared and login should succeed
      await waitFor(() => {
        expect(queryByText('Invalid credentials')).toBeNull();
        expect(useAuthStore.getState().isAuthenticated).toBe(true);
      });
    });
  });
});
