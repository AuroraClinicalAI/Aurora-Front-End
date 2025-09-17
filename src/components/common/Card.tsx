import type React from "react";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  align?: "center" | "left";
  size?: "medium" | "large";
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
  align = "center",
  size = "medium"

}) => {
  const alignClasses = {
    'center': 'text-center items-center',
    'left': 'text-left items-start'
  };
  const sizeClasses = {
    'medium': 'max-w-96 min-h-96',
    'large': 'max-w-[480px] min-h-72'
  }

  const cardClass = `rounded border border-indigo-300 px-11 py-6 gap-4 flex flex-col ${alignClasses[align]} ${sizeClasses[size]}`;

  return (
    <div className={cardClass}>
      {icon && (
        <div className="flex justify-center">
          {icon}
        </div>
      )}
      <h4 className="text-black text-xl font-bold">{title}</h4>
      <h5 className="text-sm font-normal text-slate-500">{subtitle}</h5>
      <p className="text-black text-lg font-normal">{description}</p>
      {buttonText && onButtonClick && (
        <button className="text-slate-500 text-lg font-bold" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default Card