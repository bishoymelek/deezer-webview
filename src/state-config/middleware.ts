/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
import { put, takeEvery } from 'redux-saga/effects';
import {
  getStoreName,
  getActionHandlerName,
  getPlainActionType,
  apiRequestUpdate,
} from './utils';

class MiddlewareUtils {
  dataProviders: any;

  constructor(dataproviders: object) {
    this.dataProviders = dataproviders;
    this.watchApiCall = this.watchApiCall.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  private *handleRequest(action: any): any {
    const { type } = action;
    const actionHandlerName = getActionHandlerName(type);
    const plainActionType = getPlainActionType(type);
    try {
      const storeName = yield getStoreName(type);
      yield put(
        apiRequestUpdate(`api/${plainActionType}_loading`, {
          status: 'loading',
        })
      );

      if (!actionHandlerName) {
        throw `No action handler defined for action type: ${action.type}`;
      } else if (!storeName) {
        throw `Please Provide storeName to that action: ${action}`;
      } else if (!this.dataProviders[storeName]) {
        throw `Please provide a data provider for resource: ${storeName}' for action ${action.type}`;
      } else if (!this.dataProviders[storeName][actionHandlerName]) {
        throw `Please provide an action handler of type ${
          action.type
        } for resource: ${storeName}' for action: ${JSON.stringify(action)}`;
      } else {
        const response = yield this.dataProviders[storeName][actionHandlerName](
          action
        );
        const { data = undefined, error, success } = response || {};
        yield put(
          apiRequestUpdate(`api/${plainActionType}_finished`, {
            status: success ? 'success' : 'error',
            data,
            error,
            success,
          })
        );
      }
    } catch (err) {
      yield put(
        apiRequestUpdate(`api/${plainActionType}/failed`, {
          status: 'error',
          undefined,
          error: err,
        })
      );
      throw err.message;
    }
  }

  public *watchApiCall(): any {
    yield takeEvery(
      (action: any) => /^api_request\/.*/.test(action.type),
      this.handleRequest
    );
  }
}

export { MiddlewareUtils };
export default MiddlewareUtils;
