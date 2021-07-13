import MainGrid from '../src/components/MainGrid/'
import Box from '../src/components/Box/'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations/'

function ProfileSideBar() {
  const githubUser = 'viktorhugodev'
  
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt="Foto do perfil" style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {
  const pessoasFavoritas = ['juunegreiros', 
  'rafaballerini', 
  'peas',
  'felipefialho'
]
  return ( 
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea"style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar />
        </div>
        <div className="welcomeArea"style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo</h1>
            <OrkutNostalgicIconSet/>
            </Box>
            
        </div>
        <div className="profileRelations"style={{ gridArea: 'profileRelations' }}>
          <Box>Comunidades</Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidades ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.map(pessoa => {
                return (
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                        <img src={`https://github.com/${pessoa}.png`} alt="Foto perfil"/>
                        <span>{pessoa}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
