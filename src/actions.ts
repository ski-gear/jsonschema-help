import { Action, Validation, JsonMessage, ValidatableEntity } from "./Types";
import { Dispatch } from "react-redux";
import { validate as skiMaskValidate } from "ski-mask";
import { defaultResolverConfig } from "./DefaultValues";
import { TaskEither, of as teOf, fromEither, taskEither } from "fp-ts/lib/TaskEither";
import { liftA2 } from "fp-ts/lib/Apply";
import { tryCatch } from "fp-ts/lib/Either";
import { curry, identity } from "fp-ts/lib/function";
import { AnyJson } from "ski-mask/src/types/Types";
import * as WebStorage from "store";
import { setResolverConfig } from "./Storage";

type validateAction = "VALIDATE_PAYLOAD" | "VALIDATE_RESOLVER_CONFIG";

export const VALIDATE_PAYLOAD: validateAction = "VALIDATE_PAYLOAD";
export const VALIDATE_RESOLVER_CONFIG: validateAction = "VALIDATE_RESOLVER_CONFIG";

type changeCodeAction = "CHANGE_PAYLOAD_CODE" | "CHANGE_RESOLVER_CONFIG_CODE";
export const CHANGE_PAYLOAD_CODE: changeCodeAction = "CHANGE_PAYLOAD_CODE";
export const CHANGE_RESOLVER_CONFIG_CODE: changeCodeAction = "CHANGE_RESOLVER_CONFIG_CODE";
export const SAVE_RESOLVER_CONFIG_CODE = "SAVE_RESOLVER_CONFIG_CODE";

export const OPEN_RESOLVER_CONFIG_MODAL = 'OPEN_RESOLVER_CONFIG_MODAL';
export const CLOSE_RESOLVER_CONFIG_MODAL = 'CLOSE_RESOLVER_CONFIG_MODAL';

export const openRcModal = (): Action<Validation> => {
  return {
    type: OPEN_RESOLVER_CONFIG_MODAL,
    params: {
      message: '',
      state: 'notStarted',
      context: ''
    }
  }
}

export const closeRcModal = (): Action<Validation> => {
  return {
    type: CLOSE_RESOLVER_CONFIG_MODAL,
    params: {
      message: '',
      state: 'notStarted',
      context: ''
    }
  }
}

export const validatePayload = (code: string, resolverConfig: string): AsyncValidation => {
  const noOp: Function = () => {};
  return validate(code, resolverConfig, "VALIDATE_PAYLOAD", noOp);
};
export const validateResolverConfig = (code: string, handleCloseModal: Function): AsyncValidation => {
  const resolverConfig = JSON.stringify(defaultResolverConfig);
  return validate(code, resolverConfig, "VALIDATE_RESOLVER_CONFIG", handleCloseModal);
};

export const changePayloadCode = (code: string): Action<string> => changeCode(code, CHANGE_PAYLOAD_CODE);
export const changeResolverConfigCode = (code: string): Action<string> => changeCode(code, CHANGE_RESOLVER_CONFIG_CODE);

const changeCode = (code: string, action: changeCodeAction): Action<string> => {
  return {
    type: action,
    params: code,
  };
};

type AsyncValidation = (dispatch: Dispatch<Action<Validation>>) => Promise<void>;

const validate = (code: string, resolverConfig: string, action: validateAction, afterSuccessCallback: Function): AsyncValidation => {
  return (dispatch: Dispatch<Action<Validation>>): Promise<void> => {
    dispatch({
      type: action,
      params: {
        state: "inProgress",
        message: "Validating...",
        context: "",
      },
    });

    const parsedPayload = parseJson(code);
    const parsedResolverConfig = parseJson(resolverConfig);

    const validation = liftA2(taskEither)(curry(skiMaskValidate))(parsedPayload)(parsedResolverConfig);
    return validation.run().then(res =>
      res.fold(
        e => dispatchError(dispatch, e, action),
        p => {
          p
            .then((jm: JsonMessage) => {
              dispatchSuccess(dispatch, jm, action);
              if(action === "VALIDATE_RESOLVER_CONFIG"){
                saveResolverConfig(dispatch, JSON.parse(resolverConfig), afterSuccessCallback);
              }
            })
            .catch(e => dispatchError(dispatch, e, action));
        },
      ),
    );
  };
};

const parseJson = (json: string): TaskEither<JsonMessage, AnyJson> => {
  const parsed = tryCatch(() => JSON.parse(json)).mapLeft((_: any) => {
    return { success: false, message: "Could not parse JSON.", context: JSON.stringify(json) } as JsonMessage;
  });
  return fromEither(parsed);
};

const dispatchSuccess = (dispatch: Dispatch<Action<Validation>>, json: JsonMessage, action: validateAction): void => {
  dispatch({
    type: action,
    params: {
      state: "success",
      message: json.message,
      context: json.context,
    },
  });
};

const dispatchError = (dispatch: Dispatch<Action<Validation>>, json: JsonMessage, action: validateAction): void => {
  dispatch({
    type: action,
    params: {
      state: "error",
      message: json.message,
      context: json.context,
    },
  });
};

const saveResolverConfig = (dispatch: Dispatch<Action<Validation>>, resolverConfig: object, afterSuccessCallback: Function): void => {
  setResolverConfig(resolverConfig);
  dispatch({
    type: SAVE_RESOLVER_CONFIG_CODE,
    params: {
      state: "success",
      message: "Saved Custom Resolver Configuration",
      context: "",
    },
  });
  afterSuccessCallback();
};
