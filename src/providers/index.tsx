import { AppProviderProps } from "../types";
import { AskProvider } from "./AskProvider";
import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserProvider";

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <UserProvider>
        <AskProvider>{children}</AskProvider>
      </UserProvider>
    </AuthProvider>
  );
};
