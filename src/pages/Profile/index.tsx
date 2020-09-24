import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/AuthContext';
import extractValidationMessage from '../../utils/extractValidationMessage';

import noAvatar from '../../assets/no-avatar.png';

import { Container, Header, Content, AvatarInput } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Precisa ser e-mail válido')
    .required('E-mail obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', {
    is: '',
    then: Yup.string(),
    otherwise: Yup.string()
      .required('Nova senha é obrigatória')
      .min(6, 'Senha precisa ter 6 caracteres'),
  }),
  confirmPassword: Yup.string()
    .when('oldPassword', {
      is: '',
      then: Yup.string(),
      otherwise: Yup.string().required(
        'Confirmação da nova senha é obrigatória',
      ),
    })
    .oneOf([Yup.ref('password'), undefined], 'As senhas não coincidem'),
});

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const inputAvatarRef = useRef<HTMLInputElement>(null);

  const { user, updateUser } = useAuth();

  const { addToast } = useToast();

  const handleOnSubmit = useCallback(async data => {
    try {
      formRef.current?.setErrors({});
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const messages = extractValidationMessage(err);
      formRef.current?.setErrors(messages);
    }
  }, []);

  const handleChangeAvatar = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        const result = await api.patch('/users/avatar', data);

        updateUser(result.data);

        addToast({
          type: 'success',
          title: 'Tudo pronto!',
          description: 'O seu avatar foi atualizado com sucesso.',
        });
      }
    },
    [],
  );
  return (
    <Container>
      <Header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft size={24} />
          </Link>
        </div>
      </Header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleOnSubmit}
        >
          <AvatarInput>
            <img
              src={user.avatarURL ?? noAvatar}
              onClick={() => inputAvatarRef.current?.click()}
            />
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input
                ref={inputAvatarRef}
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleChangeAvatar}
              />
            </label>
          </AvatarInput>
          <h3>Meu perfil</h3>

          <Input
            icon={FiUser}
            name="name"
            type="text"
            placeholder="Nome completo"
          />
          <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 20 }}
            icon={FiLock}
            name="oldPassword"
            type="password"
            placeholder="Senha antiga"
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Nova senha"
          />
          <Input
            icon={FiLock}
            name="confirmPassword"
            type="password"
            placeholder="Confirmação de senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
