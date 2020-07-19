import { GenreApi } from 'deezer-openapi';
import { dpMethodResponseMapper } from './utils';

const genreApi = new GenreApi({
  basePath: 'https://api.deezer.com',
});

// eslint-disable-next-line import/prefer-default-export
export const genreApiHandlers = {
  get_multiple: async (): Promise<any> => {
    const genresListRes = await genreApi.getGenresList();
    const genresListResBody = await genresListRes.json();
    return dpMethodResponseMapper(genresListResBody);
  },
  get_artists_list: async (action): Promise<any> => {
    try {
      const { id } = action || {};
      if (!id) {
        throw Error('Please provide Id');
      }
      const genreArtistsListRes = await genreApi.getGenreArtistsList(id);
      const genreArtistsListResBody = await genreArtistsListRes.json();
      return dpMethodResponseMapper(genreArtistsListResBody);
    } catch (error) {}
  },
};
