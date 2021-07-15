import React from 'react';

import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';

import { ProfileRelationsBoxWrapper } from '../src/componentes/ProfileRelations';
import MainGrid from '../src/componentes/MainGrid';
import Box from '../src/componentes/Box';

function ProfileSidebar(props) { 
  return (
    <Box as='aside'>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a href={`https://github.com/${props.githubUser}`} target="_blank" className='boxLink'>
         @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className='smallTitle'>
        {props.title} ({props.items.length})
      </h2>

      <ul>
        {
          props.items.map((item) => {
            return (
              <li key={item.id}>
                <a href={`/users/${item.login}`}>
                  <img src={item.avatar_url} />
                  <span>{item.login}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [communities, setCommunities] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/Lucas-HMSC/followers')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      setFollowers(json);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '5ed85c45a7f8e9dbe010592d3c1d37',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `
        query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }
        `
      })
    })
    .then((response) => response.json())
    .then((json) => {
      const response = json.data.allCommunities;
      setCommunities(response);
    })
  }, []);

  const githubUser = 'lucas-hmsc';
  const favoritesPeople = [
    'juunegreiros',
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  function handleCreateCommunity(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const community = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(community)
    })
    .then(async (response) => {
      const data = await response.json();
      const community = data.recordCreated;
      
      const allCommunities = [...communities, community];
      setCommunities(allCommunities);
    });
    
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
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

          <Box>
            <h2 className='subtitle'>O que você deseja fazer?</h2>
            <form onSubmit={(event) => handleCreateCommunity(event)}>
              <div>
                <input
                  type='text'
                  name='title'
                  placeholder='Qual vai ser o nome da sua comunidade?'
                  aria-label='Qual vai ser o nome da sua comunidade?'
                />
              </div>
              <div>
                <input
                  type='text'
                  name='image'
                  placeholder='Coloque uma url para usarmos de capa'
                  aria-label='Coloque uma url para usarmos de capa'
                />
              </div>

              <button>  
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Meus amigos ({favoritesPeople.length})
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
          <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
              Comunidades ({communities.length})
            </h2>

            <ul>
              {
                communities.map((community) => {
                  return (
                    <li key={community.id}>
                      <a href={`/communities/${community.id}`}>
                        <img src={community.imageUrl} />
                        <span>{community.title}</span>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox 
            title='Seguidores'
            items={followers}
          />
        </div>
      </MainGrid>
    </>
  )
}
