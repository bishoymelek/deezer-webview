import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ArtistCard from './ArtistCard';

const mockStore = configureStore([]);

describe('Component/ArtistCard', () => {
  let store;
  let component;
  const artistCardMockData = {
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
        <ArtistCard
          name={artistCardMockData.name}
          id={artistCardMockData.id}
          picture={artistCardMockData.picture}
          trackListUrl={artistCardMockData.trackListUrl}
        />
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
