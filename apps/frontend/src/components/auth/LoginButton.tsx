import { FC } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import "../../styling/baggerButton.css";
import { getEnv } from "../../lib/environment.ts";

const API_BASE_URL = getEnv().VITE_API_BASE_URL;
// TODO get from backend code
const AUTHORIZATION_URL_ENDPOINT_PATH =
  getEnv().VITE_AUTHORIZATION_URL_ENDPOINT_PATH;

const LoginButton: FC = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const url = new URL(AUTHORIZATION_URL_ENDPOINT_PATH, API_BASE_URL);
  url.searchParams.set("return", pathName);

  return (
    <button
      className="baggerButton"
      onClick={() => navigate({ href: url.href, reloadDocument: true })}
    >
      Login
    </button>
  );
};

export default LoginButton;
