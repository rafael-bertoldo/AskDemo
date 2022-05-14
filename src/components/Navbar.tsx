import { NavBarProps } from "../types";
import { FiEdit3, FiLogIn, FiUser } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useHistory } from "react-router-dom";

export const Navbar = ({
  userName,
  isLogged,
  icon: Icon,
  iconText,
  onclick,
  student,
  adm,
}: NavBarProps) => {
  const [profile, setProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editGender, setEditGender] = useState(false);
  const { user } = useAuth();
  const history = useHistory();

  const handleProfile = () => {
    setProfile(!profile);
  };

  const handleEditName = () => {
    setEditName(!editName);
  };

  const handleEditEmail = () => {
    setEditEmail(!editEmail);
  };

  const handleEditGender = () => {
    setEditGender(!editGender);
  };

  const handleNavigate = (path: string) => {
    history.push(`/${path}`);
  };
  return (
    <>
      <nav className="bg-blue h-16 flex items-center justify-between w-screen">
        {isLogged && (
          <span
            onClick={handleProfile}
            className="border-2 border-white rounded-full p-2 text-white cursor-pointer relative ml-8"
          >
            <FiUser size={24} />
          </span>
        )}
        {isLogged && (
          <>
            <span className="text-white font-bold text-lg">{userName}</span>
          </>
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
      {profile && (
        <ul className="absolute bg-white border-2 rounded-xl p-8 ml-2">
          {adm && (
            <>
              <li
                onClick={() => handleNavigate("demo")}
                className="mb-2 cursor-pointer"
              >
                demo
              </li>
              <li
                onClick={() => handleNavigate("answered")}
                className="mb-2 cursor-pointer"
              >
                answered
              </li>
              <li
                onClick={() => handleNavigate("redflag")}
                className="mb-2 cursor-pointer"
              >
                closed
              </li>
            </>
          )}
          <li className="flex items-center mb-2">
            {user.user_name}{" "}
            <FiEdit3 onClick={handleEditName} className="ml-4 cursor-pointer" />
            {editName && (
              <form>
                <input
                  type="text"
                  placeholder="alterar nome"
                  className="ml-8 border-[1px] rounded p-[4px]"
                />
                <button
                  className="bg-blue p-[4px] border-[1px] border-blue rounded w-20 font-bold text-white hover:bg-mediumBlue hover:border-mediumBlue transition-colors mt-4 mb-4 ml-4"
                  type="submit"
                >
                  {" "}
                  alterar
                </button>
              </form>
            )}
          </li>
          <li className="flex items-center mb-2">
            {user.user_email}{" "}
            <FiEdit3
              onClick={handleEditEmail}
              className="ml-4 cursor-pointer"
            />
            {editEmail && (
              <form>
                <input
                  type="text"
                  placeholder="alterar email"
                  className="ml-8 border-[1px] rounded p-[4px]"
                />
                <button
                  className="bg-blue p-[4px] border-[1px] border-blue rounded w-20 font-bold text-white hover:bg-mediumBlue hover:border-mediumBlue transition-colors mt-4 mb-4 ml-4"
                  type="submit"
                >
                  {" "}
                  alterar
                </button>
              </form>
            )}
          </li>
          <li className="flex items-center mb-2">
            {user.user_gender}{" "}
            <FiEdit3
              onClick={handleEditGender}
              className="ml-4 cursor-pointer"
            />
            {editGender && (
              <form>
                <input
                  type="text"
                  placeholder="alterar gênero"
                  className="ml-8 border-[1px] rounded p-[4px]"
                />
                <button
                  className="bg-blue p-[4px] border-[1px] border-blue rounded w-20 font-bold text-white hover:bg-mediumBlue hover:border-mediumBlue transition-colors mt-4 mb-4 ml-4"
                  type="submit"
                >
                  {" "}
                  alterar
                </button>
              </form>
            )}
          </li>
          <li>
            <span>trocar senha</span>
          </li>
        </ul>
      )}
    </>
  );
};
