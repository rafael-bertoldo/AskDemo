import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import {
  AuthContextData,
  AuthState,
  ProvidersProps,
  SignInCredentials,
  User,
} from "../types";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: ProvidersProps) => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@ask.demo:token");
    const user = localStorage.getItem("@ask.demo:user");

    if (token && user) {
      return { user: JSON.parse(user), token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback((data: SignInCredentials) => {
    api
      .post("/login", data)
      .then((response) => {
        const { user, token } = response.data;

        localStorage.setItem("@ask.demo:token", token);
        localStorage.setItem("@ask.demo:user", JSON.stringify(user));

        setData({ token, user });
        toast.success("Login realizado com sucesso", {
          theme: "colored",
          position: "top-center",
        });

        setAuthenticated(true);
        if (user.user_profile.profile_code === "usr") {
          history.push("/dashboard");
        }

        history.push("/demo");
      })
      .catch((e) => {
        toast.error("Por favor verifique seu login/email", {
          theme: "colored",
          position: "top-center",
        });
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        token: data.token,
        user: data.user,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
