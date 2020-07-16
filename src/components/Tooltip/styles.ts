import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-right: 10px;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
  span {
    position: absolute;

    bottom: calc(100% + 12px);

    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    border-radius: 4px;

    /* width: auto; */
    min-width: 200px;

    background: #ff9000;
    color: #312e38;
    font-size: 14px;
    font-weight: 500;

    transition: opacity 0.2s;
    opacity: 0;
    visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
    }
  }
`;
