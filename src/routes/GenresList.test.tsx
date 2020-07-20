import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import GenreArtistList from './GenreArtistList';

const mockStore = configureStore([]);

describe('Route/GenreArtistList', () => {
  let store;
  let component;
  const GenreArtistListMockData = {
    name: 'Hi',
    id: '1',
    picture: 'pic.png',
    trackListUrl: 'https://placeholder.com',
  };
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    component = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <GenreArtistList
            name={GenreArtistListMockData.name}
            id={GenreArtistListMockData.id}
            picture={GenreArtistListMockData.picture}
            trackListUrl={GenreArtistListMockData.trackListUrl}
          />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
