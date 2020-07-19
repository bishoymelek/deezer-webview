/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
import { put, takeEvery } from 'redux-saga/effects';

const getStoreName = (actionType: string): any =>
  actionType.toLowerCase().split('/').splice(1)[0];

const getActionHandlerName = (actionType: string): any =>
  actionType.toLowerCase().split('/').splice(2).join('/');

const getPlainActionType = (actionType: string): any =>
  actionType.toLowerCase().split('/').splice(1).join('/');

const apiRequestUpdate = (type, payload): any => ({
  type,
  payload,
});

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
    // console.log('actionHandlerName:', actionHandlerName);
    // console.log('getPlainActionType:', plainActionType);

    try {
      const storeName = yield getStoreName(type);
      if (!actionHandlerName) {
        console.error('No action handler defined');
      }
      yield put(
        apiRequestUpdate(`api/${plainActionType}_loading`, {
          status: 'loading',
        })
      );
      // console.log('storeName:     ', storeName);
      // console.log(this.dataProviders[storeName]);

      if (!storeName) {
        throw `Please Provide storeName to that action: ${action}`;
      } else if (!this.dataProviders[storeName]) {
        throw `Please provide a data provider for resource: ${storeName}' for action ${action.type}`;
      } else if (!this.dataProviders[storeName][actionHandlerName]) {
        // console.log(this.dataProviders[storeName]);
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
      console.error(err);
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
