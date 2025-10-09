
interface SubTitleProps {
  children: React.ReactNode;
  type: "principal" | "secondary";
}

export const Subtitle: React.FC<SubTitleProps> = ({ children, type = "principal" }) => {
  const typeClasses = {
    "principal": "justify-center text-slate-500 text-lg font-normal",
    "secondary": "justify-center text-slate-500 text-2xl font-semibold"
  }
  const subTitleClass = `${typeClasses[type]}`
  return (
    <h2 className={subTitleClass}>{children}</h2>
  );
}
