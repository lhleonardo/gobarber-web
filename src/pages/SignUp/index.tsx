import React, { useCallback, useRef } from 'react';

import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Background, Content } from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import extractValidationMessage from '../../utils/extractValidationMessage';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleOnSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Precisa ser e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().min(6, 'Senha precisa ter 6 caracteres'),
      });

      const validation = await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const messages = extractValidationMessage(err);
      formRef.current?.setErrors(messages);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Logomarca do GoBarber" />

        <Form ref={formRef} onSubmit={handleOnSubmit}>
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
