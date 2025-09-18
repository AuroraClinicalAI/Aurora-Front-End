import type React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "primary" | "secondary" | "danger" | "register" | "login";
  buttonType?: "submit" | "button" | "reset";
  disabled?: boolean;
}
const typeClassMap: Record<string, string> = {
  primary: "rounded-lg bg-accent-1 p-2.5 text-borange text-xl font-bold d-lg shadow-[2px_2px_0px_0px_rgba(139,117,226,1.00)]",
  secondary: "btn-secondary",
  danger: "btn-danger",
  register: "rounded-lg bg-neutral p-2.5 text-white text-xl font-bold d-lg shadow-[2px_2px_0px_0px_rgba(117,203,226,1.00)]",
  login: "rounded-lg bg-accent-1 p-2.5 text-white text-xl font-bold d-lg shadow-[2px_2px_0px_0px_rgba(139,117,226,1.00)]"
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "primary", buttonType = "button", disabled = false }) => {
  const className = typeClassMap[type] || "";
  return <button className={className} onClick={onClick} type={buttonType} disabled={disabled}>{label}</button>
}

export default Button;