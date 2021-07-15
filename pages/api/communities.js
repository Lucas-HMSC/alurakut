import { SiteClient } from 'datocms-client';

export default async function requestsReceiver(request, response) {

  if (request.method === 'POST') {
    const TOKEN = 'ebbf2600a83d14309c5db4e8fb938b';
    const client = new SiteClient(TOKEN);
  
    const recordCreated = await client.items.create({
      itemType: '967239',
      ...request.body,
    });
  
    response.json({
      dados: 'Teste de dados',
      recordCreated: recordCreated
    })

    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  });
}