import { useState, type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, IconButton, InputAdornment, Typography } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '@store';
import { useNavigate } from 'react-router';
import { authSchema, type AuthValues } from './schema';
import { FormContainer, Input, InputError, SubmitButton } from './styles';

export const AuthForm: FC = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({
    resolver: yupResolver(authSchema),
  });
  const { setAuthValues } = useAuthStore();
  const navigate = useNavigate();
  const [isShowToken, setIsShowToken] = useState(false);

  const handleSubmitClick = handleSubmit((values) => {
    setAuthValues(values);
    navigate('/');
  });

  const handleToggleIsShowToken = () => {
    setIsShowToken((prev) => !prev);
  };

  return (
    <FormContainer>
      <Typography variant="h4">Введите свои учётные данные</Typography>
      <Controller
        name="id"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled">
            <Input placeholder="Введите id" value={field.value} onChange={field.onChange} error={!!errors.id} />
            {errors.id && <InputError>{errors.id.message}</InputError>}
          </FormControl>
        )}
      />
      <Controller
        name="token"
        control={control}
        render={({ field }) => (
          <FormControl variant="filled">
            <Input
              placeholder="Введите apiToken"
              value={field.value}
              onChange={field.onChange}
              type={isShowToken ? 'text' : 'password'}
              error={!!errors.token}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleIsShowToken}>
                    {isShowToken ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.token && <InputError>{errors.token.message}</InputError>}
          </FormControl>
        )}
      />
      <SubmitButton variant="contained" onClick={handleSubmitClick} size="large">
        Войти
      </SubmitButton>
    </FormContainer>
  );
});
