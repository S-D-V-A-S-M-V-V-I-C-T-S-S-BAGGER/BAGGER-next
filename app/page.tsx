import LichtingFotos from '@/components/LichtingFotos';
import Logo from '@/components/logo/Logo';
import LichtingFotosContextLoader from '@/components/lichting_foto_data/LichtingFotoContextLoader';

export default function Home() {
    return (
        <main>
            <LichtingFotosContextLoader>
                <Logo>
                    <LichtingFotos/>
                </Logo>
            </LichtingFotosContextLoader>
        </main>
    );
}
