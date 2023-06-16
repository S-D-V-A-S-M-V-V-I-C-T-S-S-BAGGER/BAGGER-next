import LogoBovenkant from '@/components/logo/LogoBovenkant';
import LogoOnderkant from '@/components/logo/LogoOnderkant';
import LogoMidden from '@/components/logo/LogoMidden';
import LichtingFotos from '@/components/LichtingFotos';

export default function Home() {
  return (
    <main>
      <LogoBovenkant/>
      <LogoMidden>
          <LichtingFotos/>
      </LogoMidden>
      <LogoOnderkant/>
    </main>
  );
}
