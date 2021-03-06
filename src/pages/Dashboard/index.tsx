import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAsks } from "../../providers/AskProvider";
import { Ask } from "../../types";
import { Navbar } from "../../components/Navbar";
import { FiLogOut } from "react-icons/fi";
import { AsksContainer } from "../../components/AsksContainer";

interface DashProps {
  authenticated: boolean;
  handleLogout: () => void;
}

export const Dashboard = ({ authenticated, handleLogout }: DashProps) => {
  const [createNewAsk, setCreateNewAsk] = useState(false);
  const [theme, setTheme] = useState("");
  const [subTheme, setSubTheme] = useState("");
  const [askBody, setAskBody] = useState("");
  const localUser = localStorage.getItem("@ask.demo:user");

  const history = useHistory();

  const { user, token } = useAuth();
  const { loadAsks, asks, createAsk, setAsks } = useAsks();
  const { handleSubmit } = useForm();

  const handleCreateAsk = () => {
    setCreateNewAsk(!createNewAsk);
  };

  const onSubmitFunction = () => {
    const data = {
      ask_theme: theme,
      ask_sub_theme: subTheme,
      ask_body: askBody,
    };
    createAsk(data, user);
    const newAsks = loadAsks(user);
    setAsks(newAsks);
    setTheme("");
    setSubTheme("");
    setAskBody("");
  };

  if (authenticated && localUser) {
    if (JSON.parse(localUser).user_profile.profile_code !== "usr") {
      return <Redirect to="/demo" />;
    }
  } else if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <Navbar
        userName={user.user_name}
        isLogged
        student
        icon={FiLogOut}
        iconText="Sair"
        onclick={handleLogout}
      />
      <main className="w-3/4 shadow-3xl mt-4 p-4 text-center">
        <section>
          <h2 className="text-black font-bold font-sans text-2xl">
            Bem vindo a demo do{" "}
            <span className="text-blue">
              {user.user_classroom.classroom_name}
            </span>
          </h2>
          {/* <TitleContainer /> */}
          <button
            className="bg-blue p-3 rounded w-40 font-bold text-white hover:bg-mediumBlue transition-colors mt-4 mb-4"
            onClick={handleCreateAsk}
          >
            Fazer Pergunta
          </button>
          {createNewAsk && (
            <form
              onSubmit={handleSubmit(onSubmitFunction)}
              className="flex flex-col items-center justify-center"
            >
              <div className="mb-4">
                <label className="pr-4" htmlFor="ask_theme">
                  Assunto:{" "}
                </label>
                <select
                  className="bg-lightGray p-1 rounded"
                  name="ask_theme"
                  onChange={(e) => setTheme(e.target.value)}
                  value={theme}
                >
                  <option>Selecione</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="js">JS</option>
                </select>
              </div>
              <div>
                <label className="pr-4" htmlFor="ask_sub_theme">
                  Tema:{" "}
                </label>
                <select
                  className="bg-lightGray p-1 rounded"
                  name="ask_sub_theme"
                  onChange={(e) => setSubTheme(e.target.value)}
                  value={subTheme}
                >
                  <option>Selecione</option>
                  {theme === "html" && (
                    <>
                      <option value="semantic">Sem??ntica</option>
                      <option value="tags">Tags</option>
                      <option value="meta-tags">Meta-tags</option>
                      <option value="other">Outros</option>
                    </>
                  )}
                  {theme === "css" && (
                    <>
                      <option value="position">Posicionamento</option>
                      <option value="selectors">Seletores</option>
                      <option value="pseudo-classes">Pseudo Classes</option>
                      <option value="pseudo-element">Pseudo Elementos</option>
                      <option value="other">Outro</option>
                    </>
                  )}
                  {theme === "js" && (
                    <>
                      <option value="variables">Vari??veis</option>
                      <option value="operators">Oepradores</option>
                      <option value="functions">Fun????es</option>
                      <option value="condictionals">Condicionais</option>
                      <option value="arrays">Arrays</option>
                      <option value="objects">Objetos</option>
                      <option value="methods">M??todos</option>
                      <option value="dom">DOM</option>
                      <option value="other">Outros</option>
                    </>
                  )}
                </select>
              </div>
              <textarea
                className="border-black border-2 rounded mt-4 mb-4 w-3/4 h-24"
                name="ask_body"
                id="ask_body"
                onChange={(e) => setAskBody(e.target.value)}
                value={askBody}
              ></textarea>
              <button
                className="bg-blue p-3 rounded w-40 font-bold text-white hover:bg-mediumBlue transition-colors mt-4 mb-4"
                type="submit"
              >
                Fazer pergunta
              </button>
            </form>
          )}
        </section>
        <AsksContainer />
      </main>
    </div>
  );
};
