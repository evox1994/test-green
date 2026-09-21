import { object, string } from 'yup';

export const schema = object({
  phone: string().required(),
});
