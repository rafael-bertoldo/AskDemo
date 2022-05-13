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

export const Dashboard = () => {
  const [createNewAsk, setCreateNewAsk] = useState(false);
  const [theme, setTheme] = useState("");
  const [subTheme, setSubTheme] = useState("");
  const [askBody, setAskBody] = useState("");

  const history = useHistory();

  const { user, token } = useAuth();
  const { loadAsks, asks, createAsk, setAsks } = useAsks();
  const { handleSubmit } = useForm();

  useEffect(() => {
    if (user.user_profile.profile_code !== "usr") {
      history.push("/demo");
    }
  }, []);

  useEffect(() => {
    const loadedAsks = loadAsks(user);
    setAsks(loadedAsks);
  }, []);

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

  const handleNavigate = (path: string) => {
    history.push(path);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  if (user === undefined) {
    <Redirect to="/" />;
  }
  return (
    <>
      <Navbar
        userName={user.user_name}
        isLogged
        icon={FiLogOut}
        iconText="Sair"
        onclick={handleLogout}
      />
      <main>
        <section>
          {/* <TitleContainer /> */}
          <button onClick={handleCreateAsk}>Fazer Pergunta</button>
          {createNewAsk && (
            <form>
              <div>
                <label htmlFor="ask_theme">Assunto: </label>
                <select
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
                <label htmlFor="ask_sub_theme">Tema: </label>
                <select
                  name="ask_sub_theme"
                  onChange={(e) => setSubTheme(e.target.value)}
                  value={subTheme}
                >
                  <option>Selecione</option>
                  {theme === "html" && (
                    <>
                      <option value="semantic">Semântica</option>
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
                      <option value="variables">Variáveis</option>
                      <option value="operators">Oepradores</option>
                      <option value="functions">Funções</option>
                      <option value="condictionals">Condicionais</option>
                      <option value="arrays">Arrays</option>
                      <option value="objects">Objetos</option>
                      <option value="methods">Métodos</option>
                      <option value="dom">DOM</option>
                      <option value="other">Outros</option>
                    </>
                  )}
                </select>
              </div>
              <textarea
                name="ask_body"
                id="ask_body"
                cols={30}
                rows={10}
                onChange={(e) => setAskBody(e.target.value)}
                value={askBody}
              ></textarea>
              <button type="submit">Fazer pergunta</button>
            </form>
          )}
        </section>
      </main>
    </>
  );
};
