import { ComponentType } from "react";
import { Redirect, Route as ReactRoute, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: Props) => {
  const token = false;
  return (
    <ReactRoute
      {...rest}
      render={() =>
        isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? "/dashboard" : "/"} />
        )
      }
    />
  );
};
