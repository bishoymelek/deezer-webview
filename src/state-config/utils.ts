/**
 * Check if action is related to a reducer,
 *  using Regular Expression
 * @param {Object} param redux action type to check
 * @param {string} param.actionType redux action type to check
 * @param {Array} param.regExp regular expression
 */
const isRelatedAction = (
  action: any,
  storeType: string,
  name: string
): boolean => {
  const reg =
    storeType === 'api' ? new RegExp(`^api/${name}`) : new RegExp(`^${name}/`);
  return !!reg.test(action.type);
};
/**
 * Check if action fired is api and loading
 * @param action action fired
 */
const isApiLoadingAction = (action: any): boolean => {
  const reg = new RegExp(`^api/.*/.+?(?=loading)`);
  return !!reg.test(action.type);
};

/**
 * get data-provider store name from the action type
 * @param actionType action type dispatched
 */
const getStoreName = (actionType: string): any =>
  actionType.toLowerCase().split('/').splice(1)[0];

/**
 * get data-provider's handler for the action dispatched
 * @param actionType action type dispatched
 */
const getActionHandlerName = (actionType: string): any =>
  actionType.toLowerCase().split('/').splice(2).join('/');

/**
 * get type without `api/` in the start of action type
 * @param actionType action type dispatched
 */
const getPlainActionType = (actionType: string): any =>
  actionType.toLowerCase().split('/').splice(1).join('/');

const apiRequestUpdate = (type, payload): any => ({
  type,
  payload,
});

export {
  isRelatedAction,
  isApiLoadingAction,
  getStoreName,
  getActionHandlerName,
  getPlainActionType,
  apiRequestUpdate,
};
