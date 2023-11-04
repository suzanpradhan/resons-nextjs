import Link from 'next/link';
import { MouseEventHandler } from 'react';
import Spinner from '../Spinner';

export interface ButtonProps {
  text?: string;
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  buttonType?: 'bordered' | 'flat';
  type?: 'button' | 'submit' | 'reset' | 'link';
  kind?: 'default' | 'success' | 'danger' | 'warning' | 'secondary';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
}

const Button = ({ buttonType = 'flat', kind, ...props }: ButtonProps) => {
  var color = 'bg-accent text-white';

  if (buttonType == 'bordered') {
    color = 'bg-transparent text-dark-500 ';
  } else {
    switch (kind) {
      case 'default':
        color = 'bg-accent text-white';
        break;
      case 'secondary':
        color = 'bg-dark-500 text-white';
        break;
      case 'success':
        color = 'bg-green-400 text-white';
        break;
      case 'danger':
        color = 'bg-red-200 text-red-500';
        break;
      case 'warning':
        color = 'bg-yellow-200 text-yellow-500';
        break;
      default:
        break;
    }
  }

  if (props.type == 'link') {
    return (
      <Link
        className={
          `${
            buttonType == 'bordered' ? 'border' : ''
          } ${color} rounded-sm text-sm font-normal flex justify-center items-center hover:opacity-95 px-3 py-2 ` +
          (props.className ?? '')
        }
        href={props.href!}
      >
        {props.isLoading ? (
          <Spinner />
        ) : (
          <div className="flex justify-center items-center">
            {props.prefix}
            <div className={props.textClassName}>{props.text}</div>
            {props.suffix}
          </div>
        )}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      type={props.type ?? 'button'}
      className={
        `${
          buttonType == 'bordered' ? 'border' : ''
        } ${color} h-12 text-sm font-normal hover:bg-opacity-90 py-2 px-3 rounded-sm w-full ` +
        (props.className ?? '')
      }
    >
      {props.isLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center">
          {props.prefix}
          <div>{props.text}</div>
          {props.suffix}
        </div>
      )}
    </button>
  );
};

export default Button;
