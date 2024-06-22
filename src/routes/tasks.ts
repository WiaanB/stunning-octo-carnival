import Client from '../prisma';
import { IResponse, Task } from '../types';

export const createTask = async (id: number, data: Task): Promise<IResponse<Task>> => {
  const { name, description } = data;
  let { status, date_time } = data;

  if (name === '') return { error: 'Name is required' };
  if (status === '') status = 'pending';
  if (date_time === null) date_time = new Date();

  // ensure the user exists
  const user = await Client.user.findUnique({
    where: {
      id
    }
  });

  if (!user) return { error: 'User not found' };

  const res = await Client.task.create({
    data: {
      name,
      status,
      description,
      date_time,
      user_id: id
    }
  });

  return {
    data: res
  };
};

export const updateTask = async (
  userId: number,
  taskId: number,
  data: Task
): Promise<IResponse<Task>> => {
  const user = await Client.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) return { error: 'User not found' };

  const task: Task | null = await Client.task.findUnique({
    where: {
      id: taskId
    }
  });

  if (!task) return { error: 'Task not found' };

  const res = await Client.task.update({
    where: {
      id: taskId
    },
    data
  });

  return {
    data: res
  };
};

export const deleteTask = async (userId: number, taskId: number): Promise<IResponse<Task>> => {
  const user = await Client.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) return { error: 'User not found' };

  const task: Task | null = await Client.task.findUnique({
    where: {
      id: taskId
    }
  });

  if (!task) return { error: 'Task not found' };

  await Client.task.delete({
    where: {
      id: taskId
    }
  });

  return {
    data: task
  };
};

export const getTaskById = async (userId: number, taskId: number): Promise<IResponse<Task>> => {
  const user = await Client.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) return { error: 'User not found' };

  const task: Task | null = await Client.task.findUnique({
    where: {
      id: taskId,
      user_id: userId
    }
  });

  if (!task) return { error: 'Task not found' };

  return {
    data: task
  };
};

export const getAllTasks = async (userId: number): Promise<IResponse<Task>> => {
  const user = await Client.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!user) return { error: 'User not found' };

  const tasks: Task[] = await Client.task.findMany({
    where: {
      user_id: userId
    }
  });

  return {
    data: tasks
  };
};
