interface ToiletData {
  id: number;
  isPaid: boolean;
  price: number;
  reviews: ReviewData[];
}

interface AddressData {
  country: string;
  city: string;
  street: string;
  streetNumber: string;
}

interface ReviewData {
  id: string;
  contributedBy: string;
  cleanliness: Float64Array;
  performance: Float64Array;
  description: string;
  createdAt: Date;
}

import Review from './reviewCard';

async function getToilet(address: AddressData): Promise<
  | {
      toilet: ToiletData;
    }
  | undefined
> {
  try {
    const { country, city, street, streetNumber } = address;
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `{ toilet(
          country: "${country}", 
          city: "${city}", 
          street: "${street}", 
          streetNumber: "${streetNumber}"
        ) {
          id
          price
          isPaid
          reviews {
            id
            contributedBy
            cleanliness
            performance
            description
            createdAt
          }
        }}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch toilet data in StreetNumber');
    }

    const dataObj = await res.json();
    return dataObj.data;
  } catch (err) {
    console.log('Error getToilet func in StreetNumber', err);
  }
}

export default async function StreetNumber({
  params,
}: {
  params: AddressData;
}) {
  const result = await getToilet(params);
  if (!result) return <div>Server Error. Try it again.</div>;
  const toilet = result!.toilet;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl flex-col w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='w-3/5 bg-white dark:bg-gray-900 py-2 lg:py-4'>
          <div className='max-w-2xl mx-auto px-4'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                Price
              </h2>
            </div>
            <p>{toilet.price}</p>
          </div>
        </div>
        <br />
        <div className='w-3/5 bg-white dark:bg-gray-900 py-2 lg:py-4'>
          <div className='max-w-2xl mx-auto px-4'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                Address
              </h2>
            </div>
            <p>{`${params.streetNumber}, ${params.street}, ${params.city}, ${params.country}`}</p>
          </div>
        </div>
        <br />
        <section className='w-3/5 bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased'>
          <div className='max-w-2xl mx-auto px-4'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                Reviews
              </h2>
            </div>
            {toilet.reviews.map((review: ReviewData, index: number) => {
              return <Review key={index} review={review} />;
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
