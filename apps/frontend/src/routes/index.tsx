import { createFileRoute } from "@tanstack/react-router";
import Logo from "../components/logo/Logo.tsx";
import LichtingFotos from "../components/logo/LichtingFotos.tsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <Logo>
        <LichtingFotos />
      </Logo>
    </main>
  );
}
