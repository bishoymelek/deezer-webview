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
    storeType === 'api'
      ? new RegExp(`^api/${name}`)
      : new RegExp(`^${action.type}/${name}/`);
  return !!reg.test(action.type);
};

const isApiLoadingAction = (action: any): boolean => {
  const reg = new RegExp(`^api/.*/.+?(?=loading)`);
  return !!reg.test(action.type);
};

export { isRelatedAction, isApiLoadingAction };
