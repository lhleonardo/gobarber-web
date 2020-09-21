import React, { useCallback, useRef, useState } from 'react';

import { FiMail, FiChevronLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToast } from '../../hooks/ToastContext';
import extractValidationMessage from '../../utils/extractValidationMessage';
import api from '../../services/api';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
});

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        await schema.validate(data, { abortEarly: false });

        // enviar recuperação de senha
        await api.post('/passwords/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado.',
          description:
            'Um e-mail com os procedimentos para recuperar sua senha foi enviado para você. Verifique sua caixa de entrada.',
        });

        history.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(extractValidationMessage(err));
        } else {
          addToast({
            title: 'Erro na recuperação de senha',
            type: 'error',
            description:
              'Algo deu errado na recuperação de senha. Tente novamente mais tarde.',
          });

          console.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Logomarca da aplicação" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h3>Esqueceu sua senha?</h3>
            <Input
              icon={FiMail}
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
            />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiChevronLeft size={20} />
            Voltar para autenticação
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
