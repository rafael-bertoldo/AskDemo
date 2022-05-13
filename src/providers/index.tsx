import { AppProviderProps } from "../types";
import { AskProvider } from "./AskProvider";
import { AuthProvider } from "./AuthProvider";

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <AskProvider>{children}</AskProvider>
    </AuthProvider>
  );
};
