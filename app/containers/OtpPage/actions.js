/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  CHECK_SMS_VERIFICATION_REQUEST,
  CHECK_SMS_VERIFICATION_SUCCESS,
  CHECK_SMS_VERIFICATION_ERROR,
  CHECK_EMAIL_VERIFICATION_REQUEST,
  CHECK_EMAIL_VERIFICATION_SUCCESS,
  CHECK_EMAIL_VERIFICATION_ERROR,
} from './constants';

// Check code
export function checkSMSVerification(phone_number, code) {
  console.log(code, phone_number);
  return {
    type: CHECK_SMS_VERIFICATION_REQUEST,
    phone_number,
    code,
  };
}

export function checkSMSVerificationSuccess(success) {
  return {
    type: CHECK_SMS_VERIFICATION_SUCCESS,
    success,
  };
}

export function checkSMSVerificationError(error) {
  status(error, 'error');
  return {
    type: CHECK_SMS_VERIFICATION_ERROR,
    error,
  };
}

export function checkEmailVerification(email, code) {
  return {
    type: CHECK_EMAIL_VERIFICATION_REQUEST,
    email,
    code,
  };
}

export function checkEmailVerificationSuccess(success) {
  return {
    type: CHECK_EMAIL_VERIFICATION_SUCCESS,
    success,
  };
}

export function checkEmailVerificationError(error) {
  status(error, 'error');
  return {
    type: CHECK_EMAIL_VERIFICATION_ERROR,
    error,
  };
}
