import React from 'react';
import { Link } from 'react-router-dom';

interface InputTextProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  required?: boolean;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name,
  required = false,
  className = '',
  classNameInput = 'p-4 border-2 border-neutral-100 rounded-2xl   focus:outline-2  bg-white outline-orange-300/5',
  classNameLabel = ' text-lg font-semibold'
}) => {
  return (
    <div className={`flex flex-col ${className}  gap-1 p-1 overflow-hidden`}>
      {label && <label className={classNameLabel}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required={required}
        className={` w-full ${classNameInput}   0`}
      />
    </div>
  );
};

interface InputBottomProps {
  name: string;
  className: string;
  onClick?: () => void;
  to?: string;
  type?: 'button' | 'submit';
}

export const InputBottom = ({
  name,
  className,
  onClick,
  to,
  type = 'button'
}: InputBottomProps) => {
  const baseClasses = `font-semibold text-center rounded-full cursor-pointer ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick}>
        {name}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      {name}
    </button>
  );
};

interface InputSelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  name?: string;
  required?: boolean;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  label,
  value,
  onChange,
  options,
  name,
  required = false,
  className = '',
  classNameInput = 'p-4 bg-white text-black border-neutral-100 border-2 ',
  classNameLabel = 'text-lg font-semibold'
}) => {
  return (
    <div className={`flex flex-col gap-1 p-1 overflow-hidden ${className}`}>
      {label && <label className={classNameLabel}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`w-full   ${classNameInput}   appearance-none rounded-2xl  focus:outline-2 outline-orange-300/50 `}
      >
        <option value="" disabled className="">
          Select an option
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
