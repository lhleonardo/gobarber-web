import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';

import DayPicker, { DayModifiers } from 'react-day-picker';
import { isToday, format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';
import {
  Header,
  HeaderContent,
  LoggedUserInfo,
  Content,
  Schedule,
  NextAppointment,
  Section,
  NoAppointments,
  Appointment,
  Calendar,
} from './styles';

import logoImage from '../../assets/logo.svg';
import noAvatar from '../../assets/no-avatar.png';

import waiting from '../../assets/icons/waiting.svg';

import { useAuth } from '../../hooks/AuthContext';

import 'react-day-picker/lib/style.css';
import api from '../../services/api';

interface IMonthAvailability {
  day: number;
  available: boolean;
}

interface IAppointment {
  id: string;
  date: string;

  convertedDate: Date;
  formattedHour: string;

  user: {
    name: string;
    avatarURL: string;
  };

  isPast: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<
    IMonthAvailability[]
  >([]);

  const history = useHistory();

  // carrega os dias do mês
  useEffect(() => {
    async function loadAvailabilities() {
      const response = await api.get(
        `/providers/${user.id}/month-availability`,
        {
          params: {
            year: selectedMonth.getFullYear(),
            month: selectedMonth.getMonth() + 1,
          },
        },
      );

      setMonthAvailability(response.data);
    }

    loadAvailabilities();
  }, [selectedMonth, user.id]);

  // carrega os appointments
  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get<IAppointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      });

      const data = response.data.map(appointment => {
        const date = parseISO(appointment.date);
        return {
          ...appointment,
          convertedDate: date,
          formattedHour: format(date, 'HH:mm'),
          isPast: isBefore(date, new Date()),
        };
      });

      setAppointments(data);
    }

    loadAppointments();
  }, [selectedDate, user.id]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setSelectedMonth(month);
  }, []);

  const handleShowProfile = useCallback(() => history.push('/profile'), [
    history,
  ]);

  const invalidDays = useMemo(() => {
    const dates = monthAvailability
      .filter(day => day.available === false)
      .map(day => {
        const date = new Date(
          selectedMonth.getFullYear(),
          selectedMonth.getMonth(),
          day.day,
        );

        return date;
      });

    return dates;
  }, [monthAvailability, selectedMonth]);

  const selectedDateAsText = useMemo(
    () => format(selectedDate, " dd 'de' MMMM", { locale: ptBR }),
    [selectedDate],
  );

  const dayOfWeek = useMemo(
    () => format(selectedDate, 'cccc', { locale: ptBR }),
    [selectedDate],
  );

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        appointment => appointment.convertedDate.getHours() < 12,
      ),
    [appointments],
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        appointment => appointment.convertedDate.getHours() >= 12,
      ),
    [appointments],
  );

  const nextAppointment = useMemo(() => {
    if (isToday(selectedDate)) {
      const nextHour = new Date().getHours() + 1;

      const next = appointments.find(
        appointment => appointment.convertedDate.getHours() >= nextHour,
      );

      return next;
    }

    return undefined;
  }, [selectedDate, appointments]);
  return (
    <>
      <Header>
        <HeaderContent>
          <img src={logoImage} alt="Logomarca da aplicação" />

          <LoggedUserInfo onClick={handleShowProfile}>
            <img src={user.avatarURL ?? noAvatar} alt="Avatar do usuário" />
            <div>
              <span>Bem-vindo,</span>
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
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{dayOfWeek}</span>
          </p>

          {nextAppointment && (
            <>
              <h2>Atendimentos a seguir</h2>
              <NextAppointment>
                <div>
                  <img
                    src={nextAppointment.user.avatarURL ?? noAvatar}
                    alt={nextAppointment.user.name}
                  />
                  <span>{nextAppointment.user.name}</span>
                </div>

                <span>
                  <FiClock />
                  {nextAppointment.formattedHour}
                </span>
              </NextAppointment>
            </>
          )}

          <Section>
            <span>Manhã</span>
            {morningAppointments.length === 0 && (
              <NoAppointments>
                <img src={waiting} alt="Aguardando" />
                <span>Nenhum agendamento neste período.</span>
              </NoAppointments>
            )}
            {morningAppointments.map(appointment => (
              <Appointment isPast={appointment.isPast} key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatarURL ?? noAvatar}
                    alt={`Avatar do ${appointment.user.name}`}
                  />
                  <span>{appointment.user.name}</span>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <span>Tarde</span>
            {afternoonAppointments.length === 0 && (
              <NoAppointments>
                <img src={waiting} alt="Aguardando" />
                <span>Nenhum agendamento neste período.</span>
              </NoAppointments>
            )}
            {afternoonAppointments.map(appointment => (
              <Appointment isPast={appointment.isPast} key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatarURL ?? noAvatar}
                    alt={`Avatar do ${appointment.user.name}`}
                  />
                  <span>{appointment.user.name}</span>
                </div>
              </Appointment>
            ))}
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
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...invalidDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </>
  );
};

export { Dashboard };
