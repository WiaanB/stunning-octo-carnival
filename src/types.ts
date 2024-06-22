export type Task = {
  id?: number;
  name: string;
  description: string;
  status: string;
  date_time?: Date;
  user_id: number;
};

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
};

export interface IResponse<T> {
  error?: string;
  data?: T | T[] | null;
}
