import SearchIcon from "@/assets/images/search.svg";
interface SearchBarProps {
  placeholder?: string;
  onChange?: () => void;
  withIcon: boolean;
  name?: string;
  id?: string;
  type: "primary";
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChange,
  withIcon,
  name,
  id,
  type = "primary"
}) => {
  const containerTypes = {
    "primary": "inline-flex w-full rounded outline-1 outline-neutral-400 focus-within:outline-neutral-600 px-5 py-2 justify-between"
  }
  const inputTypes = {
    "primary": "w-full focus:outline-none"
  }
  const containerClasses = `${containerTypes[type]}`;
  const inputClasses = `${inputTypes[type]}`;
  return <div className={containerClasses}>
    <input type="text" name={name} id={id} placeholder={placeholder} onChange={onChange} className={inputClasses} />
    {withIcon &&
      <img src={SearchIcon} alt="searchIcon" />
    }
  </div>;
}