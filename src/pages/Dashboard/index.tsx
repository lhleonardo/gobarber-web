import React, { useCallback, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import {
  Header,
  HeaderContent,
  LoggedUserInfo,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImage from '../../assets/logo.svg';
import noAvatar from '../../assets/no-avatar.png';
import { useAuth } from '../../hooks/AuthContext';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);
  return (
    <>
      <Header>
        <HeaderContent>
          <img src={logoImage} alt="Logomarca da aplicação" />

          <LoggedUserInfo>
            <img src={user.avatarURL ?? noAvatar} alt="Avatar do usuário" />
            <div>
              <span>Seja bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </LoggedUserInfo>

          <button type="button" onClick={signOut}>
            <FiPower size={24} color="#999591" />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>

          <p>
            <span>Hoje</span>
            <span>Dia 6</span>
            <span>Segunda-feira</span>
          </p>

          <h2>Atendimentos a seguir</h2>
          <NextAppointment>
            <div>
              <img src={noAvatar} alt="avatar" />
              <span>Leonardo Braz</span>
            </div>

            <span>
              <FiClock /> 08:00
            </span>
          </NextAppointment>

          <Section>
            <span>Manhã</span>
            <Appointment>
              <span>
                <FiClock /> 08:00
              </span>
              <div>
                <img src={noAvatar} alt="avatar" />
                <span>Leonardo Braz</span>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock /> 08:00
              </span>
              <div>
                <img src={noAvatar} alt="avatar" />
                <span>Leonardo Braz</span>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock /> 08:00
              </span>
              <div>
                <img src={noAvatar} alt="avatar" />
                <span>Leonardo Braz</span>
              </div>
            </Appointment>
          </Section>

          <Section>
            <span>Tarde</span>
            <Appointment>
              <span>
                <FiClock /> 08:00
              </span>
              <div>
                <img src={noAvatar} alt="avatar" />
                <span>Leonardo Braz</span>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            selectedDays={selectedDate}
            disabledDays={{ daysOfWeek: [0, 6] }}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
          ></DayPicker>
        </Calendar>
      </Content>
    </>
  );
};

export { Dashboard };
