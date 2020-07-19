import React from 'react';
import ArtistCard from 'components/ArtistCard';
import { genresActionCreators } from 'state-config/genreStore';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Spinner from 'components/Spinner';
import { withRouter } from 'react-router';

type GenreArtistListPropType = {
  genreArtistsList: Array<deezerArtistObjectPropType>;
  genreArtistsListApiLoading: boolean;
};
class GenreArtistListComponent extends React.Component<
  componentGenericPropType &
    connectedComponentPropType &
    GenreArtistListPropType,
  {}
> {
  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(
      genresActionCreators.getGenreArtistsList(
        this.props?.match?.params?.genreId
      )
    );
  }

  render(): JSX.Element {
    const { genreArtistsList = [], genreArtistsListApiLoading } = this.props;
    return (
      <>
        <Spinner spinning={genreArtistsListApiLoading} />
        <Row gutter={[24, 24]} className="p-2">
          {genreArtistsList.length
            ? genreArtistsList.map((genreItem) => {
                return (
                  <Col xs={24} sm={12} md={8} lg={6} key={genreItem.id}>
                    <ArtistCard
                      id={genreItem.id}
                      trackListUrl={genreItem.tracklist}
                      name={genreItem.name}
                      picture={genreItem?.picture_big}
                    />
                  </Col>
                );
              })
            : null}
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state: any): GenreArtistListPropType => ({
  genreArtistsList: state.api_genres?.genreArtistsList,
  genreArtistsListApiLoading: state.api_genres?.status === 'loading',
});

const GenreArtistList = connect(mapStateToProps)(
  withRouter(GenreArtistListComponent)
);

export default GenreArtistList;
