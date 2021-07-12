import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations';
import MainGrid from '../src/componentes/MainGrid';
import Box from '../src/componentes/Box';

function ProfileSidebar(props) { 
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'lucas-hmsc';
  const favoritesPeople = [
    'juunegreiros',
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
      
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Pessoas da comunidade ({favoritesPeople.length})
            </h2>

            <ul>
              {
                favoritesPeople.map((githubUser) => {
                  return (
                    <li key={githubUser}>
                      <a href={`/users/${githubUser}`}>
                        <img src={`https://github.com/${githubUser}.png`} />
                        <span>{githubUser}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>

            
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
