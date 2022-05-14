import { createContext, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { EditData, ProvidersProps, UserContextData } from "../types";
import { useAuth } from "./AuthProvider";

const UserContext = createContext<UserContextData>({} as UserContextData);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
};

export const UserProvider = ({ children }: ProvidersProps) => {
  const token: string = localStorage.getItem("@ask.demo:token") || "";

  const editUserName = useCallback(
    (data: EditData, setLocalUser: React.Dispatch<any>) => {
      api
        .patch(`user/profile`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("@ask.demo:user", JSON.stringify(res.data));
          setLocalUser(
            JSON.parse(localStorage.getItem("@ask.demo:user") || "")
          );
          toast.success("perfil atualizado com sucesso");
        })
        .catch((_) => toast.error("algo deu errado tente novamente"));
    },
    []
  );

  const editUserEmail = useCallback(
    (data: EditData, setLocalUser: React.Dispatch<any>) => {
      api
        .patch(`user/profile`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("@ask.demo:user", JSON.stringify(res.data));
          setLocalUser(
            JSON.parse(localStorage.getItem("@ask.demo:user") || "")
          );
          toast.success("perfil atualizado com sucesso");
        })
        .catch((_) => toast.error("algo deu errado tente novamente"));
    },
    []
  );

  const editUserGender = useCallback(
    (data: EditData, setLocalUser: React.Dispatch<any>) => {
      api
        .patch(`user/profile`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("@ask.demo:user", JSON.stringify(res.data));
          setLocalUser(
            JSON.parse(localStorage.getItem("@ask.demo:user") || "")
          );
          toast.success("perfil atualizado com sucesso");
        })
        .catch((_) => toast.error("algo deu errado tente novamente"));
    },
    []
  );

  const editUserPassword = useCallback(
    (data: EditData, setLocalUser: React.Dispatch<any>) => {
      api
        .patch(`user/profile`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem("@ask.demo:user", JSON.stringify(res.data));
          setLocalUser(
            JSON.parse(localStorage.getItem("@ask.demo:user") || "")
          );
          toast.success("perfil atualizado com sucesso");
        })
        .catch((_) => toast.error("algo deu errado tente novamente"));
    },
    []
  );

  return (
    <UserContext.Provider
      value={{ editUserName, editUserEmail, editUserGender, editUserPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};
