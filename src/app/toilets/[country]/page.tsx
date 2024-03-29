async function getToilets(country: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/graphql`, {
      method: 'POST',
      body: JSON.stringify({
        query: `{ toilets(country: "${country}") {
          id
          price
          isPaid
          address {
            streetNumber
            street
            city
            country
          }
        }}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch toilet data in a country');
    }

    const dataObj = await res.json();
    return dataObj.data;
  } catch (err) {
    console.log('Error getToilets func in Country', err);
  }
}

export default async function Country({
  params,
}: {
  params: { country: string };
}) {
  const { toilets } = await getToilets(params.country);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl flex-col w-full items-center justify-between font-mono text-sm lg:flex'>
        {toilets.map((toilet: any, index: number) => {
          return (
            <p
              key={index}
              className='flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'
            >
              <span className='w-full'>ID: {toilet.id}</span>
              <br />
              <span className='w-full'>Country: {toilet.address.country}</span>
              <br />
              <span className='w-full'>City: {toilet.address.city}</span>
              <br />
              <span className='w-full'>Street: {toilet.address.street}</span>
            </p>
          );
        })}
      </div>
    </main>
  );
}
