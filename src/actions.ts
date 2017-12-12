import { ActionType } from './types';

export const VALIDATE_PAYLOAD = 'VALIDATE_PAYLOAD'

export const validatePayload = (code: string): ActionType<string> => {
  return { 
    type: VALIDATE_PAYLOAD,
    payload: code
  }
}
