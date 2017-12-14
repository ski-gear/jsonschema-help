import { Action, Validation, JsonMessage } from './types';
import { Dispatch } from 'react-redux';
import { validate } from "ski-mask";
import { defaultResolverConfig } from './defaultValues';
import { TaskEither, of as teOf, fromEither, taskEither } from "fp-ts/lib/TaskEither";
import { liftA2 } from "fp-ts/lib/Apply";
import { tryCatch } from 'fp-ts/lib/Either';
import { curry } from 'fp-ts/lib/function';
import { AnyJson } from 'ski-mask/src/types/Types';

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
        message: 'Validating',
        context: ''
      }
    })

    const parsedPayload = parseJson(code);
    const parsedResolverConfig = teOf(defaultResolverConfig as AnyJson).mapLeft(
      (_) => {
        return { success: false, message: "Dummy", context: '' } as JsonMessage;
      }
    );

    const validation = liftA2(taskEither)(curry(validate))(parsedPayload)(parsedResolverConfig)
    return validation
      .run()
      .then(res =>
        res.fold(
          e => dispatchError(dispatch, e),
          p => {
            p
              .then((jm: JsonMessage) => dispatchSuccess(dispatch, jm))
              .catch(e => dispatchError(dispatch, e));
          }
        )
      );
  }
}

export const changeCode = (code: string): Action<string> => {
  return { 
    type: CHANGE_PAYLOAD_CODE,
    params: code
  }
}

const parseJson = (json: string): TaskEither<JsonMessage, AnyJson> => {
  const parsed = tryCatch(() =>
    JSON.parse(json)
  ).mapLeft((_: any) => {
    return { success: false, message: "Could not parse JSON.", context: JSON.stringify(json) } as JsonMessage;
  });
  return fromEither(parsed);
};

const dispatchSuccess = (dispatch: Dispatch<Action<Validation>>, json: JsonMessage): void => {
  dispatch({
    type: VALIDATE_PAYLOAD,
    params: {
      state: 'success',
      message: json.message,
      context: json.context
    }
  })
}

const dispatchError = (dispatch: Dispatch<Action<Validation>>, json: JsonMessage): void => {
  dispatch({
    type: VALIDATE_PAYLOAD,
    params: {
      state: 'error',
      message: json.message,
      context: json.context
    }
  })
}
