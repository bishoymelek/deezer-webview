/* eslint-disable no-param-reassign */
import produce from 'immer';
import { isRelatedAction, isApiLoadingAction } from './utils';

const preDefinedStateHandlers = {
  loading: (state, action): any => {
    return {
      status: 'loading',
    };
  },
};

/* eslint-disable import/prefer-default-export */
class Store {
  name: any;

  initialState: any;

  stateHandlers: any;

  storeType: any;

  constructor(
    initialState: object,
    stateHandlers: object,
    name: string,
    storeType
  ) {
    this.storeType = storeType;
    this.name = name;
    this.initialState = initialState;
    this.stateHandlers = { ...stateHandlers, ...preDefinedStateHandlers };
  }

  reducer(): any {
    try {
      const { initialState = {}, storeType, name } = this;
      const reducer = (state = initialState, action: any): any =>
        produce(state, (draft: any) => {
          const isRelated = isRelatedAction(action, storeType, name);
          if (isRelated) {
            const actionName = action.type.split('/').splice(1).join('/');
            if (storeType === 'api') {
              const isLoadingAction = isApiLoadingAction(action);
              if (isLoadingAction) {
                draft = this.stateHandlers.loading(state, action);
                return draft;
              }
            }
            // console.log('actionName:', actionName);
            const actionHandler =
              this.stateHandlers && this.stateHandlers[actionName];
            if (!actionHandler) {
              console.error(
                `There is no action handler in ${name} store for action:`,
                action
              );
              console.error('Available handlers are:', this.stateHandlers);
            } else {
              draft = actionHandler(state, action);
            }
            return draft;
          }
        });
      return reducer;
    } catch (error) {
      throw error.message;
    }
  }
}

export { Store };
