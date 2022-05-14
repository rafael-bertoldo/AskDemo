import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiXCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAsks } from "../providers/AskProvider";
import { useAuth } from "../providers/AuthProvider";

export const AsksContainer = () => {
  const [editModal, setEditModal] = useState(false);
  const [theme, setTheme] = useState("");
  const [subTheme, setSubTheme] = useState("");
  const [askBody, setAskBody] = useState("");
  const [askId, setAskId] = useState("");
  const { asks, editAsk, setAsks, loadAsks } = useAsks();
  const { handleSubmit } = useForm();
  const { user } = useAuth();

  const handleEditModal = (ask_id: string) => {
    setEditModal(!editModal);
    setAskId(ask_id);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
  };

  useEffect(() => {
    const loadedAsks = loadAsks(user);
    setAsks(loadedAsks);
  }, []);

  const onSubmitEdit = () => {
    if (theme && subTheme) {
      const data = {
        ask_theme: theme,
        ask_sub_theme: subTheme,
        ask_body: askBody,
      };

      editAsk(askId, data, user);
      const newAsks = loadAsks(user);
      setAsks(newAsks);
      setTheme("");
      setSubTheme("");
      setAskBody("");
      setAskId("");
      setEditModal(false);
    } else {
      toast.error("Favor inserir um tema e um sub tema");
    }
  };

  const handleAskId = (id: string) => {
    setAskId(id);
  };

  return (
    <section className="flex flex-col items-center justify-around overflow-auto pb-8 mt-6">
      <ul className="w-full">
        {asks?.map((ask, index) => {
          if (ask?.ask.ask_status === "pending") {
            return (
              <li
                className="bg-white mt-8 pl-4 pr-4 pt-6 pb-6 flex flex-col items-center justify-center"
                key={index}
              >
                {ask.user.user_email === user?.user_email && (
                  <span
                    className="italic text-orange ml-8 mr-8 cursor-pointer"
                    onClick={() => handleEditModal(ask.ask.ask_id)}
                  >
                    <FiEdit2 size={24} />
                  </span>
                )}
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
      {editModal && (
        <form
          onSubmit={handleSubmit(onSubmitEdit)}
          className="flex flex-col items-center justify-center absolute top-20 bg-transparentBlack w-2/4 text-center p-8 rounded-3xl"
        >
          <span
            onClick={handleCloseEditModal}
            className="text-white font-bold ml-96 cursor-pointer"
          >
            <FiXCircle size={32} />
          </span>
          <div className="mb-4">
            <label className="pr-4 font-bold text-white" htmlFor="ask_theme">
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
            <label
              className="pr-4 font-bold text-white"
              htmlFor="ask_sub_theme"
            >
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
            className="border-black border-2 rounded mt-4 mb-4 w-80 h-24"
            name="ask_body"
            id="ask_body"
            onChange={(e) => setAskBody(e.target.value)}
            value={askBody}
          ></textarea>
          <button
            onClick={() => handleAskId(askId)}
            className="bg-blue p-3 rounded w-40 font-bold text-white hover:bg-mediumBlue transition-colors mt-4 mb-4"
            type="submit"
          >
            Fazer pergunta
          </button>
        </form>
      )}
    </section>
  );
};
