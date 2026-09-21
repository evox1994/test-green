import { object, string, type InferType } from 'yup';

export const schema = object({
  message: string().required(),
});

export type MessageForm = InferType<typeof schema>;
