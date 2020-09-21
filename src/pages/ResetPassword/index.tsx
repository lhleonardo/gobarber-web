import React, { useCallback, useRef } from 'react';

import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContainer, Background } from './styles';
import extractValidationMessage from '../../utils/extractValidationMessage';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required(
            'Senha obrigatória com grande mensagem de erro',
          ),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação de senha não coincide.',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        // resetar a senha
        const token = location.search.replace('?token=', '');

        await api.post('/passwords/reset', {
          password: data.password,
          confirmPassword: data.confirmPassword,
          token,
        });

        addToast({
          type: 'success',
          title: 'Tudo certo!',
          description:
            'Sua senha foi redefinida. Autentique-se para continuar.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(extractValidationMessage(err));
        } else {
          console.log(err.response);
          addToast({
            title: 'Erro na redefinição de senha',
            type: 'error',
            description:
              err.response.data.message ??
              'Algo de errado aconteceu. Tente novamente mais tarde.',
          });
        }
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Logomarca da aplicação" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h3>Redefina sua senha</h3>

            <Input
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
              name="password"
            />
            <Input
              icon={FiLock}
              type="password"
              placeholder="Confirme a nova senha"
              name="confirmPassword"
            />

            <Button type="submit">Redefinir</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
