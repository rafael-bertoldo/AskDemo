import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

export const AdmDashboard = () => {
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (user.user_profile.profile_code === "usr") {
      history.push("/dashboard");
    }
  }, []);
  return <h1>Adm Dash</h1>;
};
