import Client from '../prisma';

type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
};

export interface IResponse {
  error?: string;
  data?: User | User[] | null;
}

export const getUserById = async (id: number): Promise<IResponse> => {
  const user: User | null = await Client.user.findUnique({
    where: {
      id
    }
  });

  return { data: user };
};

export const getAllUsers = async (size: number, page: number): Promise<IResponse> => {
  const shouldSkip = page * size > size;
  const users: User[] = await Client.user.findMany({
    take: size,
    skip: shouldSkip ? page * size : 0,
    select: {
      id: true,
      username: true,
      first_name: true,
      last_name: true
    }
  });

  return { data: users };
};

export const createUser = async (data: User): Promise<IResponse> => {
  const { username, first_name, last_name } = data;

  if (username === '') return { error: 'Username is required' };
  if (first_name === '') return { error: 'First name is required' };
  if (last_name === '') return { error: 'Last name is required' };

  const res = await Client.user.create({
    data: {
      username,
      first_name,
      last_name
    }
  });

  return {
    data: res
  };
};

export const updateUser = async (id: number, data: User): Promise<IResponse> => {
  const user: User | null = await Client.user.findUnique({
    where: {
      id
    }
  });

  if (!user) return { error: 'User not found' };

  const res = await Client.user.update({
    where: {
      id
    },
    data
  });

  return {
    data: res
  };
};
