import { InitCap } from './common/utilityFunctions';
import { FolderPlusIcon } from '@heroicons/react/24/outline';

type EmptyStateProps = {
  model: string;
};

const EmptyState: React.FC<EmptyStateProps> = (props) => {
  const { model } = props;
  return (
    <div className="flex flex-col justify-center">
      <FolderPlusIcon className="self-center size-10" />
      <h3 className="self-center mt-2 text-sm font-semibold text-gray-900">
        No {InitCap(model)}
      </h3>
      <p className="self-center mt-1 text-sm text-gray-500">
        Get started by adding a new {model}.
      </p>
      <div className="self-center mt-6"></div>
    </div>
  );
};

export default EmptyState;
