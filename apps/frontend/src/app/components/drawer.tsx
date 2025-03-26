import { useState } from 'react';

type DrawerProps = {
  buttonText: string;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { buttonText, children } = props;

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-blue-600 text-white rounded-md"
      >
        {buttonText}
      </button>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-end transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
        <div className="relative w-1/3 h-full bg-white shadow-lg p-4">
          <button
            className="absolute top-2 right-2 p-1 text-gray-600 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
