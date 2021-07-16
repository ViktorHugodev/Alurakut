import React from 'react'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'
import MainGrid from '../src/components/MainGrid/'
import Box from '../src/components/Box/'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations/'
import { useState, useEffect } from 'react'

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

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

export default function Home(props) {

  const [comunidades, setComunidades] = useState([])
  const githubUser = props.githubUser

  const pessoasFavoritas = [
    'juunegreiros',
    'rafaballerini',
    'peas',
    'felipefialho',
    'omariosouto',
    'marcobrunodev'

  ]
 
  const [seguidores, setSeguidores] = useState([])
  // 0 - Pegar o array de dados do github 
  useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    //API GraphQl
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'd28647c879c9bebf5c5f0cace53bcf',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: '{ allCommunities { title id imageUrl creatorSlug} }'
      }),
    }
   ).then((response) => response.json())
   .then(responseData => {
     const comunidadesDB = responseData.data.allCommunities
     console.log(comunidadesDB)
     setComunidades(comunidadesDB)
   })
  

  }, [])

  // criar box que vai ter um map baseado nos itens doa array
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
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                creatorSlug: githubUser,
              }
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json()
                console.log(dados.registroCriado)
                const comunidade = dados.registroCriado
                const comunidadesNovas = [...comunidades, comunidade]
                setComunidades(comunidadesNovas)
              })
              

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
          <ProfileRelationsBox items={seguidores} title="Seguidores"/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map(comunidade => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/users/${comunidade.title}`} >
                      <img src={comunidade.imageUrl} alt="Foto perfil" />
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


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const {githubUser} = jwt.decode(token)

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}