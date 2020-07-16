import React from 'react';

import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Background, Content } from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const handleOnSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Logomarca do GoBarber" />

        <Form onSubmit={handleOnSubmit}>
          <h3>Faça seu cadastro</h3>

          <Input
            icon={FiUser}
            name="name"
            type="text"
            placeholder="Nome completo"
          />
          <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="voltar">
          <FiArrowLeft size={20} />
          Voltar para autenticação
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
