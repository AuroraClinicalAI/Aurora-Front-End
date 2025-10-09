import type React from "react";

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  align?: "center" | "left";
  size?: "small" | "medium" | "large"  | "xl";
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
    'small': 'max-w-70 min-w-60 min-h-40 px-5',
    'medium': 'max-w-96 min-h-40 px-11',
    'large': 'max-w-[480px] min-h-30 px-11',
    'xl': 'max-w-[560px] min-h-30 px-11'
  }

  const cardClass = `rounded border border-indigo-300 py-6 gap-4 flex flex-col ${alignClasses[align]} ${sizeClasses[size]}`;

  return (
    <div className={cardClass}>
      {size == "xl" ?
      <div className="flex gap-3 mt-5 mb-3">
      {icon && (
        <div className="flex justify-center">
          {icon}
        </div>
      )}
      <h4 className={`text-black font-semibold text-2xl`}>{title}</h4>
      </div> 
      :
      <div className="flex flex-col gap-2">
      {icon && (
        <div className={align == "left" ? "flex": "flex justify-center"}>
          {icon}
        </div>
      )}
      <h4 className={`text-black font-semibold text-xl`}>{title}</h4>
      </div>
      }
      {subtitle && 
      <h5 className={size == "small" ? `text-black font-semibold text-xl`:`text-sm font-normal text-slate-500`}>{subtitle}</h5>}
      {description &&
      <p className="text-black text-lg font-normal">{description}</p>}
      {buttonText && onButtonClick && (
        <button className="text-slate-500 text-lg font-bold" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default Card