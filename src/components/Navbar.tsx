import { NavBarProps } from "../types";
import { FiLogIn } from "react-icons/fi";

export const Navbar = ({
  userName,
  isLogged,
  icon: Icon,
  iconText,
  onclick,
}: NavBarProps) => {
  return (
    <nav className="bg-blue h-16 flex items-center justify-between absolute w-screen">
      <h1 className="text-white font-bold text-lg pl-8">Ask.demo</h1>
      {isLogged && (
        <span className="text-white font-bold text-lg">{userName}</span>
      )}
      <span
        onClick={onclick}
        className="text-white pr-8 flex items-center justify-between hover:text-darkBlue hover:cursor-pointer transition-colors"
      >
        {Icon && (
          <>
            <Icon size={32} /> <span className="ml-4">{iconText}</span>
          </>
        )}
      </span>
    </nav>
  );
};
