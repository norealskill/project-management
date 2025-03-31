import { FormFieldProps } from './common/formFieldProps';

const TextArea: React.FC<FormFieldProps> = (props) => {
  const { field, label, required, error } = props;

  return (
    <div>
      <div className="flex justify-between">
        <label
          htmlFor={label}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
        <span id={`required-${label}`} className="text-sm/6 text-gray-500">
          {required ? 'Required' : ''}
        </span>
      </div>
      <div className="mt-2">
        <textarea
          id={label}
          name={label}
          rows={4}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          defaultValue={''}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>
      <p id={`${label}-error`} className="mt-2 text-sm text-red-600">
        {error}
      </p>
    </div>
  );
};

export default TextArea;
