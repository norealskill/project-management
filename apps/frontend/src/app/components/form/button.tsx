type ButtonProps = {
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: 'size-5';
  label?: string;
  type?: 'submit' | 'reset';
  buttonStyle?: 'circle' | undefined;
  cssClasses?: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { disabled, icon, label, type, buttonStyle, cssClasses, onClick } =
    props;

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
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {icon ? icon : <span>{label}</span>}
    </button>
  );
};

export default Button;
