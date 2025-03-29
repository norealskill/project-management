import {
  CheckCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

type ButtonProps = {
  icon?: 'pencil' | 'plus' | 'trash';
  size?: 'size-5';
  label?: string;
  type?: 'submit' | 'reset';
  buttonStyle?: 'circle' | undefined;
  cssClasses?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { icon, label, type, buttonStyle, cssClasses, size, onClick } = props;

  let iconDisplay: React.ReactNode;

  const iconSize = size ? size : 'size-5';

  switch (icon) {
    case 'pencil':
      iconDisplay = <PencilIcon aria-hidden="true" className={iconSize} />;
      break;
    case 'plus':
      iconDisplay = <PlusIcon aria-hidden="true" className={iconSize} />;
      break;
    case 'trash':
      iconDisplay = <TrashIcon aria-hidden="true" className={iconSize} />;
      break;
    default:
      iconDisplay = <CheckCircleIcon aria-hidden="true" className={iconSize} />;
      break;
  }

  let css =
    'rounded-full bg-white px-2.5 text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50';

  if (buttonStyle === 'circle') {
    css =
      'rounded-full bg-indigo-600 p-1 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
  } else if (buttonStyle === 'rounded') {
    css =
      'rounded-full bg-white px-2.5 text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50';
  } else {
    css =
      'rounded-full bg-indigo-600 p-1 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
  }

  return (
    <button
      type={type ?? 'button'}
      className={
        cssClasses ? cssClasses : `py-1 text-xs font-semibold shadow-xs ${css}`
      }
      onClick={onClick}
    >
      {icon ? iconDisplay : <span>{label}</span>}
    </button>
  );
};

export default Button;
