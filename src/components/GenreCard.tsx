import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type GenreCardPropType = {
  name: string;
  id: string;
  picture: string;
  className?: string;
};

function GenreCard(props: GenreCardPropType): JSX.Element {
  const { picture, name, id, className } = props;
  return (
    <Link to={`/genres/${id}`}>
      <Card
        className={`genre-card ${className}`}
        hoverable
        title={name}
        cover={<img alt="genre" src={picture} />}
      />
    </Link>
  );
}

const StyledGenreCard = styled(GenreCard)`
  &.genre-card {
    .ant-card-head-title {
      text-align: center;
    }
  }
`;

export default StyledGenreCard;
