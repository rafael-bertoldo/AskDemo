import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import {
  Ask,
  AskContextData,
  CreateAskData,
  ListClassroomAsk,
  ProvidersProps,
  UpdateAskData,
  User,
} from "../types";

const AskContext = createContext<AskContextData>({} as AskContextData);

export const useAsks = () => {
  const context = useContext(AskContext);

  if (!context) {
    throw new Error("useAsk must be used within an AskProvider");
  }

  return context;
};

export const AskProvider = ({ children }: ProvidersProps) => {
  const [asks, setAsks] = useState<ListClassroomAsk[]>(
    [] as ListClassroomAsk[]
  );
  const token: string = localStorage.getItem("@ask.demo:token") || "";

  const loadAsks = useCallback((user: User) => {
    api
      .get(`/classroomAsk/${user.user_classroom_id}`)
      .then((res) => {
        setAsks(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const createAsk = useCallback((data: CreateAskData, user: User) => {
    api
      .post("/ask", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => loadAsks(user));
  }, []);

  const checkAsk = useCallback((ask_id: string, user: User) => {
    const data = {
      ask_status: "answered",
    };

    api
      .patch(`/ask/${ask_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => loadAsks(user));
  }, []);

  const redflagAsk = useCallback((ask_id: string, user: User) => {
    const data = {
      ask_status: "redflag",
    };

    api
      .patch(`/ask/${ask_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => loadAsks(user));
  }, []);

  const deleteAsks = (ask_id: string, user: User) => {
    api
      .delete(`ask/${ask_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) => loadAsks(user));
  };

  const editAsk = useCallback(
    (ask_id: string, data: UpdateAskData, user: User) => {
      api
        .patch(`ask/${ask_id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((_) => loadAsks(user));
    },
    []
  );

  return (
    <AskContext.Provider
      value={{
        asks,
        loadAsks,
        createAsk,
        checkAsk,
        redflagAsk,
        deleteAsks,
        editAsk,
        setAsks,
      }}
    >
      {children}
    </AskContext.Provider>
  );
};
