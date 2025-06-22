import { FC } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

// TODO get from env
const API_BASE_URL = "http://localhost";
// TODO get from backend code
const AUTHORIZATION_URL_ENDPOINT_PATH = "/api/auth/authorization_url";

const LoginButton: FC = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const url = new URL(AUTHORIZATION_URL_ENDPOINT_PATH, API_BASE_URL);
  url.searchParams.set("return", pathName);

  return (
    <button onClick={() => navigate({ href: url.href, reloadDocument: true })}>
      Login
    </button>
  );
};

export default LoginButton;
