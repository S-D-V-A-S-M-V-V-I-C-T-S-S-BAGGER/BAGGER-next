import LogoBovenkant from '@/components/logo/LogoBovenkant';
import LogoOnderkant from '@/components/logo/LogoOnderkant';
import LogoMidden from '@/components/logo/LogoMidden';
import Image from 'next/image';
import TwoFriends from '@/public/romance-cropped.jpg';

export default function Home() {
  return (
    <main>
      <LogoBovenkant/>
      <LogoMidden>
          <div className={'lichting-links'}>
              <div className={'lichting-afbeelding-bubbel lichting-afbeelding-links'}>
                  <Image className={'lichting-afbeelding'} src={TwoFriends} alt={'BAGGER logo'} />
              </div>
          </div>
          <div className={'lichting-rechts'}>
              <div className={'lichting-afbeelding-bubbel lichting-afbeelding-rechts'}>
                  <Image className={'lichting-afbeelding'} src={TwoFriends} alt={'BAGGER logo'} />
              </div>
          </div>
          <div className={'lichting-links'}>
              <div className={'lichting-afbeelding-bubbel lichting-afbeelding-links'}>
                  <Image className={'lichting-afbeelding'} src={TwoFriends} alt={'BAGGER logo'} />
              </div>
          </div>
          <div className={'lichting-rechts'}>
              <div className={'lichting-afbeelding-bubbel lichting-afbeelding-rechts'}>
                  <Image className={'lichting-afbeelding'} src={TwoFriends} alt={'BAGGER logo'} />
              </div>
          </div>
      </LogoMidden>
      <LogoOnderkant/>
    </main>
  );
}
