import { Project } from '../../projects/common/types';

export type Task = {
  title: string;
  completed: boolean;
  project: Project;
};

export type TaskCreateArgs = {
  name: string;
  status: string;
  started: string;
  completed: string;
  project: {
    connect: {
      id: number;
    };
  };
};

export type TaskUpdateArgs = {
  where: {
    id: string;
  };
  data: TaskCreateArgs;
};
