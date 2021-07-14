import React from 'react'
import MainGrid from '../src/components/MainGrid/'
import Box from '../src/components/Box/'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/'
import { useState } from 'react'

function ProfileSideBar(propriedades) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} alt="Foto do perfil" style={{ borderRadius: '8px' }} />
      <hr></hr>

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr></hr>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {

  const [comunidades, setComunidades] = useState([{
    id: new Date(),
    title: 'Eu odeio acordar cedo',
    image: 'https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg'
  }])
  const githubUser = 'viktorhugodev'

  const pessoasFavoritas = [
    'juunegreiros',
    'rafaballerini',
    'peas',
    'felipefialho',
    'omariosouto',
    'marcobrunodev'

  ]
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateComunity(e) {
              e.preventDefault();
              const formData = new FormData(e.target);
              const comunidade = {
                id: new Date(),
                title: formData.get('title'),
                image: formData.get('image')
              }
              const comunidadesNovas = [...comunidades, comunidade]
              setComunidades(comunidadesNovas)

            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  area-label="Qual vai ser o nome da sua comunidade?"
                  type="text" />
              </div>
              <div>
                <input placeholder="Coloque uma url para usarmos de capa"
                  name="image"
                  area-label="Coloque uma url para usarmos de capa" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelations" style={{ gridArea: 'profileRelations' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map(comunidade => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/users/${comunidade.title}`} >
                      <img src={comunidade.image} alt="Foto perfil" />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidades ({pessoasFavoritas.length})</h2>

            <ul>
              {pessoasFavoritas.map(pessoa => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={`https://github.com/${pessoa}.png`} alt="Foto perfil" />
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
