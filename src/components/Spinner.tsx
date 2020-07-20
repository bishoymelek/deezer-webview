import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

type SpinnerPropType = { spinning: boolean; delay?: number; className: string };

function Spinner(props: SpinnerPropType): JSX.Element {
  const { spinning, delay = 1000, className } = props;
  if (spinning) {
    return (
      <div className={`spinner-wrapper ${className}`}>
        <Spin spinning size="large" wrapperClassName="comp" delay={delay} />
      </div>
    );
  }
  return <></>;
}
const StyledSpinner = styled(Spinner)`
  &.spinner-wrapper {
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 99999;

    .ant-spin {
      z-index: 9991;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default StyledSpinner;
export { StyledSpinner };
