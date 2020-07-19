import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

type GenreCardPropType = { name: string; id: string; picture: string };

export default function GenreCard(props: GenreCardPropType): JSX.Element {
  const { picture, name, id } = props;
  return (
    <Link to={`/genres/${id}`}>
      <Card
        className="genre-card"
        hoverable
        title={name}
        cover={<img alt="example" src={picture} />}
      />
    </Link>
  );
}
