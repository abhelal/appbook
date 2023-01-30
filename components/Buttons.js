import { EyeIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/outline";
import { PencilAltIcon, FilterIcon } from "@heroicons/react/solid";

export function PrimaryButton({ className, children, ...props }) {
  return (
    <button
      className={`${className} relative inline-flex items-center justify-center px-4 py-1.5 bg-primary-500 border border-primary-500 text-sm font-medium rounded text-white focus:outline-none hover:bg-primary-600`}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimarySubmitButton({
  type = "submit",
  isLoading = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      disabled={isLoading}
      type={type}
      className={`${className} ${
        isLoading ? "opacity-60" : "opacity-100"
      } inline-flex items-center justify-center px-6 py-1.5 bg-primary-500 rounded-md shadow-sm text-sm whitespace-nowrap text-white tracking-widest hover:bg-primary-600 focus:outline-none focus:border-none transition ease-in-out duration-150`}
      {...props}
    >
      {isLoading && (
        <div>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </button>
  );
}

export function OutlinedSubmitButton({
  type = "submit",
  isLoading = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      disabled={isLoading}
      type={type}
      className={`${className} relative inline-flex items-center justify-center px-4 pr-6 py-2 border border-primary-500 text-sm rounded text-primary-600 bg-white transition duration-200`}
      {...props}
    >
      {isLoading && (
        <div>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {children}
    </button>
  );
}

export function FilterButton({ className, ...props }) {
  return (
    <button className={`${className} bg-gray-100 p-1 px-3 rounded`} {...props}>
      <FilterIcon className="w-5 h-5 text-gray-400 hover:text-primary-100" />
    </button>
  );
}

export function OpenedEyeButton({ className, ...props }) {
  return (
    <button className={`${className} `} {...props}>
      <EyeIcon className="w-5 h-5 text-gray-400 hover:text-primary-100" />
    </button>
  );
}

export function EditButton({ className, ...props }) {
  return (
    <button className={`${className}`} {...props}>
      <PencilAltIcon className="w-5 h-5 text-gray-400 hover:text-primary-100" />
    </button>
  );
}

export function LockClosedButton({ className, ...props }) {
  return (
    <button className={`${className}`} {...props}>
      <LockClosedIcon className="w-5 h-5 text-gray-400 hover:text-primary-100" />
    </button>
  );
}

export function LockOpenedButton({ className, ...props }) {
  return (
    <button className={`${className}`} {...props}>
      <LockOpenIcon className="w-5 h-5 text-gray-400 hover:text-primary-100" />
    </button>
  );
}

export function GrayOutlinedButton({ className, children, ...props }) {
  return (
    <button
      className={`${className} relative inline-flex items-center justify-center px-4 py-1 border border-gray-300 text-sm font-medium rounded text-gray-600 bg-white hover:bg-gray-100`}
      {...props}
    >
      {children}
    </button>
  );
}

export function PrimaryOutlinedButton({ isLoading = false, className, children, ...props }) {
  return (
    <button
      className={`${className} relative inline-flex items-center justify-center px-4 py-1 border border-primary-500 text-sm font-medium rounded text-primary-600 hover:text-white bg-white hover:bg-primary-500 transition duration-200`}
      {...props}
    >
      {isLoading && (
        <div>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {children}
    </button>
  );
}
