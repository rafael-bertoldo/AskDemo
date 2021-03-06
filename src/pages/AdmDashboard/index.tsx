import { useEffect } from "react";
import { FiCheckCircle, FiLogOut, FiXCircle } from "react-icons/fi";
import { Redirect, useHistory } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useAsks } from "../../providers/AskProvider";
import { useAuth } from "../../providers/AuthProvider";

interface AdmDashProps {
  authenticated: boolean;
  setAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

export const AdmDashboard = ({ authenticated, handleLogout }: AdmDashProps) => {
  const localUser = localStorage.getItem("@ask.demo:user");
  const { user } = useAuth();
  const history = useHistory();
  const { asks, setAsks, loadAsks, checkAsk, redflagAsk } = useAsks();

  useEffect(() => {
    setAsks(loadAsks(user));
  }, []);

  if (authenticated && localUser) {
    if (JSON.parse(localUser).user_profile.profile_code === "usr") {
      return <Redirect to="/dashboard" />;
    }
  } else if (!authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Navbar
        userName={user.user_name}
        isLogged
        icon={FiLogOut}
        iconText="Sair"
        onclick={handleLogout}
        adm
      />
      <section className="min-h-screen w-full max-w-[2000px] ml-auto pt-[10px] pb-[10px] flex items-start justify-around text-center">
        <div className="p-[20px] bg-white shadow-3xl w-2/5 flex flex-col items-center justify-around overflow-auto">
          <h2 className="font-bold text-2xl">
            Boas vindas a demo do{" "}
            <span className="text-blue">
              {user.user_classroom.classroom_name}
            </span>
          </h2>
          <span className="italic mt-8">{new Date().toLocaleDateString()}</span>
          <ul className="w-full">
            {asks?.map((ask, index) => {
              if (ask?.ask.ask_status === "pending") {
                return (
                  <li
                    className="bg-white mt-8 pl-4 pr-4 pt-6 pb-6 flex flex-col items-center justify-center border rounded-xl"
                    key={index}
                  >
                    <div className="flex items-center justify-end">
                      <span
                        onClick={() => checkAsk(ask.ask.ask_id, user)}
                        className="text-green mt-8 mb-8 mr-8 hover:cursor-pointer"
                      >
                        <FiCheckCircle size={24} />
                      </span>
                      <span
                        onClick={() => redflagAsk(ask.ask.ask_id, user)}
                        className="text-red mt-8 mb-8 hover:cursor-pointer"
                      >
                        <FiXCircle size={24} />
                      </span>
                    </div>
                    <h3>
                      Pergunta feita pelo team:{" "}
                      <span className="text-darkBlue font-bold">
                        {ask.user.user_mentor}
                      </span>
                    </h3>
                    <span className="italic">
                      {new Date(ask.ask.ask_createdAt).toLocaleDateString()}
                    </span>
                    <p className="text-xl mt-8 shadow-3xl bg-white p-8 w-9/12">
                      {ask.ask.ask_body}
                    </p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
