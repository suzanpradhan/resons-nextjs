import classNames from 'classnames';

export interface TextFieldProps {
  label?: string;
  isLabelBold?: boolean;
  placeholder?: string;
  id: string;
  name?: string;
  type?: string;
  isMulti?: boolean;
  rows?: number;
  className?: string;
  decorationClassName?: string;
  required?: boolean;
  onChange?: (e: any) => void;
}

const TextField = ({
  className,
  isMulti = false,
  ...props
}: TextFieldProps) => {
  return (
    <div className={`flex flex-col last-of-type:mb-0 ` + className}>
      {props.label ? (
        <label
          htmlFor={props.id}
          className={classNames(
            'mb-2 text-dark-500',
            props.isLabelBold ? 'text-sm ' : 'text-base font-normal'
          )}
        >
          {props.label}
          {props.required ? '*' : ''}
        </label>
      ) : (
        <></>
      )}
      {isMulti ? (
        <textarea
          className="py-3 px-4 border rounded-sm bg-slate-50 text-sm focus:outline-none custom-scrollbar"
          cols={30}
          rows={props.rows}
          {...props}
        ></textarea>
      ) : (
        <input
          className={classNames(
            'py-3 px-4 h-11 border rounded-md focus:outline-none placeholder:text-sm text-sm text-gray-700 font-normal border-gray-200',
            props.decorationClassName
          )}
          autoComplete="true"
          {...props}
        />
      )}
    </div>
  );
};

export default TextField;
