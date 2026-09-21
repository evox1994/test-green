import { object, string, type InferType } from 'yup';

export const authSchema = object({
  id: string().required('Это обязательное поле'),
  token: string().required('Это обязательное поле'),
});

export type AuthValues = InferType<typeof authSchema>;
