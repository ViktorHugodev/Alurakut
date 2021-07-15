import {SiteClient} from 'datocms-client'

export default async function recebedorDeRequests(request, response) {
  if(request.method === 'POST') {
    const TOKEN = 'd26fa1a5d3afbe6b91490b1a919a1a'
    const client = new SiteClient(TOKEN);
    const registroCriado = await client.items.create({
      itemType: "967476",
      ...request.body,
      // title: "Comunidade de teste",
      // imageUrl: "https://br.habcdn.com/photos/project/big/js-limpeza-e-portaria-1471037.jpg",
      // creatorSlug: "viktorhugodev"    
    })
    response.json({
      dados: "Algum dado",
      registroCriado: registroCriado,
    })
    return
  }
  response.status(404).json({
    message: "Ainda não temos nada no GET, apenas no POST"
  })
}