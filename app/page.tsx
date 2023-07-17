import LogoBovenkant from '@/components/logo/LogoBovenkant';
import LogoOnderkant from '@/components/logo/LogoOnderkant';
import LogoMidden from '@/components/logo/LogoMidden';
import LichtingFotosLoader from '@/components/LichtingFotosLoader';

export default function Home() {
  return (
    <main>
      <LogoBovenkant/>
      <LogoMidden>
          <LichtingFotosLoader/>
      </LogoMidden>
      <LogoOnderkant/>
    </main>
  );
}
