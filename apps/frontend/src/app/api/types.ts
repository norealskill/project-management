export type Project = {
  id: number;
  name: string;
  owner?: User;
  tasks?: Task[];
};

export type Task = {
  title: string;
  completed: boolean;
  project: Project;
};

export type User = {
  email: string;
  password: string;
  projects?: Project[];
};

export type ProjectCreateArgs = {
  id?: number;
  name: string;
  ownerId?: number;
  taskIds?: number[];
};

export type TaskCreateArgs = {
  title: string;
  completed: boolean;
};

export type UserCreateArgs = {
  email: string;
  password: string;
};
