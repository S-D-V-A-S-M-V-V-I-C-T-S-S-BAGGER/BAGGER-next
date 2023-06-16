import Bubbel from "@/components/Bubbel";
import LogoBovenkant from '@/components/logo/LogoBovenkant';
import LogoOnderkant from '@/components/logo/LogoOnderkant';
import LogoMidden from '@/components/logo/LogoMidden';

export default function Home() {
  return (
    <main>
      <LogoBovenkant/>
      <LogoMidden>
          <Bubbel style={{ width: "min-content" }}>
              <a href="https://quotes.dispuutbagger.nl">Quotes</a>
          </Bubbel>

          <Bubbel style={{ width: "min-content" }}>
              <a href="https://dispuutbagger.nl/declaratie">Declaraties</a>
          </Bubbel>

          <Bubbel style={{ width: "min-content" }}>
              <a href="https://dispuutbagger.nl/planning">Planning</a>
          </Bubbel>
      </LogoMidden>
      <LogoOnderkant/>
    </main>
  );
}
