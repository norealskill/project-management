import React, { useState } from 'react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FormFieldProps } from './common/formFieldProps';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const status: Status[] = [
  { id: 1, name: 'Not Started', style: 'bg-gray-400' },
  {
    id: 2,
    name: 'In Progress',
    style: 'bg-green-400',
  },
  { id: 3, name: 'On Hold', style: 'bg-yellow-400' },
  { id: 4, name: 'Completed', style: 'bg-black' },
];

type Status = {
  id: number;
  name: string;
  style: string;
};

const SelectList: React.FC<FormFieldProps> = (props) => {
  const [selected, setSelected] = useState<string>('Not Started');

  const { field, label, required, error } = props;

  const selectedStatus: Status =
    status.find((s) => s.name === selected) ?? status[0];

  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        setSelected(e);
        field.handleChange(e);
      }}
    >
      <div className="flex justify-between">
        <Label className="block text-sm/6 font-medium text-gray-900">
          {label}
        </Label>
        <span id={`required-${label}`} className="text-sm/6 text-gray-500">
          {required ? 'Required' : ''}
        </span>
      </div>
      <div>
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span
              aria-label={selectedStatus.name}
              className={classNames(
                selectedStatus.style,
                'inline-block size-2 shrink-0 rounded-full border border-transparent'
              )}
            />
            <span className="block truncate">{selectedStatus.name}</span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {status.map((s) => (
            <ListboxOption
              key={s.id}
              value={s.name}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span
                  aria-hidden="true"
                  className={classNames(
                    s.style,
                    'inline-block size-2 shrink-0 rounded-full border border-transparent'
                  )}
                />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {s.name}
                  <span className="sr-only">is {s.name}</span>
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
      <p id={`${label}-error`} className="mt-2 text-sm text-red-600">
        {error}
      </p>
    </Listbox>
  );
};

export default SelectList;
