import React from 'react';
import { Spin } from 'antd';

function Spinner(props: any): JSX.Element {
  const { spinning, delay = '1000' } = props;
  if (spinning) {
    return (
      <div className="spinner-wrapper">
        <Spin spinning size="large" wrapperClassName="comp" delay={delay} />
      </div>
    );
  }
  return <></>;
}
export default Spinner;
export { Spinner };
