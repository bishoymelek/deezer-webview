# Deezer Web-views

## Available Scripts

In the project directory, you can run:

### `yarn start`
start the app locally

### `yarn test`
run tests written using jest and enzyme

### `yarn build`

### `yarn eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Project structure

* [assets/](./src/assets) assets directory (images,scripts etc..)
* [components/](./src/components) React Reusable Components (JSX)
  * [__snapshots__/](./src/components/__snapshots__) Test snapshots (Jest)
    * [ArtistCard.test.tsx.snap](./src/components/__snapshots__/ArtistCard.test.tsx.snap)
    * [GenreCard.test.tsx.snap](./src/components/__snapshots__/GenreCard.test.tsx.snap)
    * [Spinner.test.tsx.snap](./src/components/__snapshots__/Spinner.test.tsx.snap)
  * [layout-container/](./src/components/layout-container) Container (Layout)
    * [LayoutContainer.tsx](./src/components/layout-container/LayoutContainer.tsx)
  * [ArtistCard.test.tsx](./src/components/ArtistCard.test.tsx)
  * [ArtistCard.tsx](./src/components/ArtistCard.tsx) Single Artist Card
  * [GenreCard.test.tsx](./src/components/GenreCard.test.tsx)
  * [GenreCard.tsx](./src/components/GenreCard.tsx) Single Genre Card
  * [Spinner.test.tsx](./src/components/Spinner.test.tsx)
  * [Spinner.tsx](./src/components/Spinner.tsx) Spinner with overlay, using antd 's `<Spin />`
* [data-providers/](./src/data-providers) Methods to communicate with APIs
  * [Genre.ts](./src/data-providers/Genre.ts)
  * [index.ts](./src/data-providers/index.ts)
  * [utils.ts](./src/data-providers/utils.ts) Utility methods specific for data providers
* [routes/](./src/routes) Routes directory
  * [__snapshots__/](./src/routes/__snapshots__)
    * [GenreArtistList.test.tsx.snap](./src/routes/__snapshots__/GenreArtistList.test.tsx.snap)
  * [GenreArtistList.test.tsx](./src/routes/GenreArtistList.test.tsx)
  * [GenreArtistList.tsx](./src/routes/GenreArtistList.tsx)
  * [GenresList.test.tsx](./src/routes/GenresList.test.tsx)
  * [GenresList.tsx](./src/routes/GenresList.tsx)
  * [index.ts](./src/routes/index.ts)
  * [routesStateConfig.ts](./src/routes/routesStateConfig.ts)
* [state-config/](./src/state-config) Redux state management and configuration
  * [Store.ts](./src/state-config/Store.ts)
  * [genreStore.ts](./src/state-config/genreStore.ts)
  * [index.ts](./src/state-config/index.ts)
  * [middleware.ts](./src/state-config/middleware.ts)
  * [utils.ts](./src/state-config/utils.ts)
* [utils/](./src/utils)
  * [types.d.ts](./src/utils/types.d.ts)
* [App.scss](./src/App.scss)
* [App.tsx](./src/App.tsx)
* [index.scss](./src/index.scss)
* [index.tsx](./src/index.tsx)



## Communicating APIs
We created a simple openapi deceleration file for endpoints which we want to use from deezer developers API; And then 

## state management
The project is mainly using redux to manage state. There is a generic store Class where we create new instances from it every time we need to create a new store; like the following:

```
// genreStore.ts
import { Store } from './Store';

const genresStore = new Store(initialState, stateHandlers, 'genres', 'api');
```
To create new data-provider type with its store:
- In  `state-config/` directory, create new file with camelCase and add:
  1. `actionsList` object which has available action types to dispatch like in the following example:
      ```
      const actionList = {
        getGenresList: 'genres/get_multiple'
      };
      ```
      **Note: Don't forget to add as first thing the name of store,separated by backslash**

  2. `actionCreatorsList` object which has available actions to dispatch as functions
      ```
      const genresActionCreators = {
        getGenresList: (): any => ({
          type: `api_request/${actionList.getGenresList}`,
        })
      };      
      ```
      **Note: Don't forget to add in type param "api_request" then backslash and action type already defined before**
  3. `stateHandlers` object has methods to handle state changes for every action fired. 
      ```
      const stateHandlers = {
        [`${actionList.getGenresList}_finished`]: (state, action): any => {
          const { payload } = action;
          return {
            ...state,
            genresList: payload.data,
            status: payload.status,
          };
        }
      };
      ```
      **Note:the keys starts with the action defined in `actionsList` with underscore and `finished` like shown above**
- In  `data-providers/` directory, create new file with camelCase, and define the api helper methods object and also the way you want to communicate with an API by. 
Now we are using swagger client, You can change in the `.yaml` file, generate swagger-client of type `typescript-fetch` and use the generated code and update the `deezer-swagger-client` repo with.
That way you will be able to import the class you need and create an instance from it with defining `baseUrl` and start consuming methods with statically typed parameters and generated types and interfaces to use.
example: 
  ```
  export const genreApiHandlers = {
    get_multiple: async (action:any): Promise<any> => {
      const genresListRes = await genreApi.getGenresList();
      const genresListResBody = await genresListRes.json();
      return dpMethodResponseMapper(genresListResBody);
    }
  };
  ```
  **Note: Method name should be just the base action name, without `api_request` or anything else**