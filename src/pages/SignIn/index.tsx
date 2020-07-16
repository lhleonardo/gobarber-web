import React, { useCallback, useRef } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';
import extractValidationMessage from '../../utils/extractValidationMessage';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail obrigatório'),
        password: Yup.string().required(
          'Senha obrigatória com grande mensagem de erro',
        ),
      });

      const validated = await schema.validate(data, { abortEarly: false });
    } catch (err) {
      formRef.current?.setErrors(extractValidationMessage(err));
    }
  }, []);
  return (
    <Container>
      <Content>
        <img src={logo} alt="Logomarca da aplicação" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h3>Autentique-se</h3>
          <Input icon={FiMail} type="email" placeholder="E-mail" name="email" />
          <Input
            icon={FiLock}
            type="password"
            placeholder="Senha"
            name="password"
          />

          <Button type="submit">Entrar</Button>
          <a href="/">Esqueci minha senha</a>
        </Form>

        <a href="/">
          <FiLogIn size={20} />
          Criar uma conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
