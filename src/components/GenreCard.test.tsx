import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import GenreCard from './GenreCard';

const mockStore = configureStore([]);

describe('Component/GenreCard', () => {
  let store;
  let component;
  const genreCardMockData = {
    name: 'Hi',
    id: '1',
    picture: 'pic.png',
  };
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    component = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <GenreCard
            name={genreCardMockData.name}
            id={genreCardMockData.id}
            picture={genreCardMockData.picture}
          />
        </BrowserRouter>
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
