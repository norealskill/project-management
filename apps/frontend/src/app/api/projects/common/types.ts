import { Task } from '../../tasks/common/types';

export type Project = {
  id: number;
  name: string;
  created: Date;
  status: string;
  owner?: User;
  tasks?: Task[];
  due?: Date;
};

export type User = {
  email: string;
  password: string;
  projects?: Project[];
};

export type ProjectCreateArgs = {
  id?: number;
  name: string;
  description?: string;
  status?: string;
  due?: string;
  ownerId?: number;
  taskIds?: number[];
};

export type UserCreateArgs = {
  email: string;
  password: string;
};

export type ProjectUpdateArgs = {
  where: {
    id: string;
  };
  data: ProjectCreateArgs;
};
