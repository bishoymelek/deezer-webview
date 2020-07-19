import React from 'react';
import GenreCard from 'components/GenreCard';
import { genresActionCreators } from 'state-config/genreStore';
import { connect } from 'react-redux';
import { Row, Col, PageHeader } from 'antd';
import Spinner from 'components/Spinner';
import { withRouter } from 'react-router';

type GenresListPropType = {
  genresList: Array<deezerGenreObjectPropType>;
  genresListApiLoading: boolean;
};
class Genres extends React.Component<
  componentGenericPropType & connectedComponentPropType & GenresListPropType,
  {}
> {
  componentDidMount(): void {
    const { dispatch } = this.props;
    dispatch(genresActionCreators.getGenresList());
  }

  render(): JSX.Element {
    const { genresList = [], genresListApiLoading } = this.props;
    return (
      <>
        <Spinner spinning={genresListApiLoading} />
        <PageHeader
          className="site-page-header"
          title="Music Genres"
          subTitle="Choose your favorite genre"
        />
        <Row gutter={[16, 16]}>
          {genresList.length
            ? genresList.map((genreItem) => {
                return (
                  <Col key={genreItem.id} xs={24} sm={12} md={8} lg={6}>
                    <GenreCard
                      name={genreItem.name}
                      id={genreItem.id}
                      picture={genreItem.picture_big}
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

const mapStateToProps = (state: any): any => ({
  genresList: state.api_genres?.genresList,
  genresListApiLoading: state.api_genres?.status === 'loading',
});

const GenresList = connect(mapStateToProps)(withRouter(Genres));

export default GenresList;
