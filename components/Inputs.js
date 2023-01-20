export function TextInput({ ...props }) {
  return (
    <input
      {...props}
      className="text-gray-600 py-1 rounded shadow-sm border-gray-300 focus:border-primary-100 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-50"
    />
  );
}

export function TextArea({ ...props }) {
  return (
    <textarea
      {...props}
      className="w-full border rounded focus:outline-none focus:ring-1 ring-primary-500 focus:border-0 p-1 text-xs"
    />
  );
}

export function CheckBox({ ...props }) {
  return (
    <input
      {...props}
      type="checkbox"
      className="rounded border-gray-300 text-primary-500 shadow-sm hover:border-primary-300 focus:border-primary-300 hover:ring hover:ring-primary-200 hover:ring-opacity-50 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
    />
  );
}

export function RadioButton({ ...props }) {
  return (
    <input
      {...props}
      type="radio"
      className="border-gray-300 text-primary-500 shadow-sm hover:border-primary-300 hover:ring hover:ring-primary-200 hover:ring-opacity-50 focus:ring-0 focus:ring-primary-200 focus:ring-opacity-50"
    />
  );
}

export function InputWithLabel({ field, form, ...props }) {
  return (
    <div className="relative flex w-full border border-gray-300 rounded-md px-3 py-2 mt-3 shadow-sm focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-200">
      <label
        htmlFor={props.label}
        className="absolute -top-2 left-6 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        {props.label}
      </label>
      <input
        {...field}
        {...props}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
      />
    </div>
  );
}

export function SelectWithLabel({ field, form, ...props }) {
  return (
    <div className="relative flex w-full border border-gray-300 rounded-md px-3 py-2 mt-3 shadow-sm focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-200">
      <label
        htmlFor={props.label}
        className="absolute -top-2 left-6 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
      >
        {props.label}
      </label>
      <select
        {...field}
        {...props}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
      />
    </div>
  );
}
