import { Store } from './Store';

// initial store state
const initialState = {
  genreslist: [],
  artistsList: [],
};

// actions list available
const actionList = {
  getGenresList: 'genres/get_multiple',
  getGenreArtistsList: 'genres/get_artists_list',
};

// handlers for state in different actions
const stateHandlers = {
  [`${actionList.getGenresList}_finished`]: (state, action): any => {
    const { payload } = action;
    return {
      ...state,
      genresList: payload.data,
      status: payload.status,
    };
  },
  [`${actionList.getGenreArtistsList}_finished`]: (state, action): any => {
    const { payload } = action;
    return {
      ...state,
      genreArtistsList: payload.data,
      status: payload.status,
    };
  },
};

const genresActionCreators = {
  getGenresList: (): any => ({
    type: `api_request/${actionList.getGenresList}`,
  }),
  getGenreArtistsList: (id): any => ({
    type: `api_request/${actionList.getGenreArtistsList}`,
    id,
  }),
};
const genresStore = new Store(initialState, stateHandlers, 'genres', 'api');

export { genresActionCreators };
export default genresStore;
