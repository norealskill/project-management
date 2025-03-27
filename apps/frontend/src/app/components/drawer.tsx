import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

type DrawerProps = {
  buttonText: string;
  drawerTitle: string;
  isOpen: boolean | false;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
  onCancel: () => void;
  drawerDescription?: string;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const {
    drawerTitle,
    drawerDescription,
    isOpen,
    setIsOpen,
    onSubmit,
    onCancel,
    children,
  } = props;

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1">
                  {/* Header */}
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between space-x-3">
                      <div className="space-y-1">
                        <DialogTitle className="text-base font-semibold text-gray-900">
                          {drawerTitle}
                        </DialogTitle>
                        <p className="text-sm text-gray-500">
                          {drawerDescription}
                        </p>
                      </div>
                      <div className="flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="relative text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Divider container */}
                  <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                    {children}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        onCancel();
                        setIsOpen(false);
                      }}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onSubmit}
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Drawer;
