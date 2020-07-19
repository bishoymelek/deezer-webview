import React from 'react';
import { Card } from 'antd';

const ArtistDetailsComponent = (props: any): JSX.Element => {
  const { trackListUrl } = props;
  return (
    <>
      <a target="_blank" rel="noopener noreferrer" href={trackListUrl}>
        Listen now
      </a>
    </>
  );
};
type ArtistCardPropType = {
  name: string;
  id: string;
  picture: string;
  trackListUrl: string;
};

export default function ArtistCard(props: ArtistCardPropType): JSX.Element {
  const { picture, name, trackListUrl } = props;
  return (
    <Card hoverable bordered cover={<img alt="artist-img" src={picture} />}>
      <Card.Meta
        title={name}
        description={<ArtistDetailsComponent trackListUrl={trackListUrl} />}
      />
    </Card>
  );
}
