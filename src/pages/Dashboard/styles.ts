import styled, { css } from 'styled-components';
import { fade } from '../../styles/animations';

import { shade } from 'polished';

interface IAppointmentProps {
  isPast: boolean;
}

export const Header = styled.header`
  width: 100%;
  padding: 16px 0;
  background: #28262e;

  animation: ${fade} 1s;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  max-width: 1120px;
  margin: 0 auto;

  > img {
    width: 80px;
  }

  button {
    margin-left: auto;
    border: 0;
    padding: 0;
    background: none;
  }
`;

export const LoggedUserInfo = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: 64px;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    margin-left: 16px;
    display: flex;
    flex-direction: column;

    font-size: 16px;
    line-height: 26px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 0 auto;

  margin-top: 32px;

  display: flex;
  flex-direction: row;
`;

export const Schedule = styled.div`
  flex: 1;

  h1 {
    color: #f4ede8;
    font-size: 36px;
  }

  p {
    color: #ff9000;
    display: flex;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;

      margin: 0 8px;
    }
  }

  h2 {
    font-size: 20px;
    color: #999591;
    margin-top: 48px;
  }
`;

export const NextAppointment = styled.div`
  background: #3e3b47;
  margin-top: 18px;

  padding: 14px 24px;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 80%;
    top: 10%;
    left: 0;
    background: #ff9000;
  }

  div {
    display: flex;
    align-items: center;

    img {
      width: 68px;
      border-radius: 50%;
    }

    span {
      margin-left: 16px;
      font-size: 24px;
    }
  }

  > span {
    color: #999591;

    svg {
      color: #ff9000;
    }
  }
`;

export const Section = styled.section`
  color: #999591;
  margin-top: 42px;

  > span {
    font-size: 20px;
    line-height: 26px;
    display: block;
    border-bottom: 1px solid #3e3b47;

    margin-bottom: 16px;
    padding-bottom: 16px;
  }
`;

export const NoAppointments = styled.div`
  display: flex;
  align-items: center;

  margin-top: 24px;

  img {
    opacity: 0.7;
    height: 55px;
  }

  span {
    margin-left: 16px;
  }
`;

export const Appointment = styled.div<IAppointmentProps>`
  display: flex;
  align-items: center;
  color: #f4ede8;

  > span {
    margin-right: 16px;
    font-size: 16px;
    line-height: 21px;

    svg {
      color: #ff9000;
    }
  }

  div {
    flex: 1;
    display: flex;
    align-items: center;

    background: #3e3b47;
    padding: 16px;

    border-radius: 10px;
    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 16px;
    }
  }

  & + div {
    margin-top: 16px;
  }

  ${props =>
    props.isPast &&
    css`
      opacity: 0.3;
    `}
`;

export const Calendar = styled.aside`
  width: 350px;

  margin-left: 64px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
