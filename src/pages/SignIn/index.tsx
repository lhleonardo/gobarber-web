import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="Logomarca da aplicação" />

      <form>
        <h3>Autentique-se</h3>
        <Input icon={FiMail} type="email" placeholder="E-mail" name="email" />
        <Input
          icon={FiLock}
          type="password"
          placeholder="Senha"
          name="password"
        />

        <Button>Entrar</Button>
        <a href="/">Esqueci minha senha</a>
      </form>

      <a href="/">
        <FiLogIn size={20} />
        Criar uma conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
