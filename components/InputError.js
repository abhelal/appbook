import { ErrorMessage } from "formik";

const InputError = ({ ...props }) => {
  return (
    <div className="h-4">
      <ErrorMessage
        component="div"
        className="pl-6 font-light text-left text-xs text-red-500"
        name={props.name}
      />
    </div>
  );
};

export default InputError;
