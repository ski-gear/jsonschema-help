import { Action, Validation, JsonMessage } from './types';
import { Dispatch } from 'react-redux';
import { validate } from "ski-mask";
import { defaultResolverConfig } from './defaultValues';

export const VALIDATE_PAYLOAD = 'VALIDATE_PAYLOAD';
export const CHANGE_PAYLOAD_CODE = 'CHANGE_PAYLOAD_CODE';

export const VALIDATE_RESOLVER_CONFIG =  'VALIDATE_RESOLVER_CONFIG'

type AsyncValidation = (dispatch: Dispatch<Action<Validation>>) => Promise<void>;

export const validatePayload = (code: string): AsyncValidation => {
  return (dispatch: Dispatch<Action<Validation>>): Promise<void> => {
    dispatch({
      type: VALIDATE_PAYLOAD,
      params: {
        state: 'inProgress',
        message: '',
        context: ''
      }
    })

    return validate(code, defaultResolverConfig).then(
      (d) => d,
      (e: JsonMessage) => {
        dispatch({
          type: VALIDATE_PAYLOAD,
          params: {
            state: "fail",
            message: e.message,
            context: e.context,
          },
        });
      }
    ).then(
      (json: JsonMessage) => {
        console.log(json);
        dispatch({
          type: VALIDATE_PAYLOAD,
          params: {
            state: 'success',
            message: json.message,
            context: json.context
          }
      })
    })
  }
}

export const changeCode = (code: string): Action<string> => {
  return { 
    type: CHANGE_PAYLOAD_CODE,
    params: code
  }
}
