import { Project } from '../../projects/common/types';

export type Task = {
  title: string;
  completed: boolean;
  project: Project;
};

export type TaskCreateArgs = {
  title: string;
  completed: boolean;
};
