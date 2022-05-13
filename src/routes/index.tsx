import { Route, Switch as DomRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { AdmDashboard } from "../pages/AdmDashboard";
import { Redflag } from "../pages/Redflag";
import { Answered } from "../pages/Answered";
// import { Route } from "./Route";

export const Routes = () => (
  <DomRouter>
    <Route exact path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/demo" component={AdmDashboard} />
    <Route path="/redflag" component={Redflag} />
    <Route path="/answered" component={Answered} />
  </DomRouter>
);
