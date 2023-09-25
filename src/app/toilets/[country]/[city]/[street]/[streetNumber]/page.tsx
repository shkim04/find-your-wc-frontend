interface Address {
  country: string;
  city: string;
  street: string;
  streetNumber: string;
}

interface Review {
  id: string;
  contributedBy: string;
  cleanliness: Float64Array;
  performance: Float64Array;
  description: string;
}

interface UpdateReview {
  id: string;
  contributedBy: string;
  password: string;
  cleanliness?: Float64Array;
  performance?: Float64Array;
  description?: string;
}

interface DeleteReview {
  id: string;
  // contributedBy: string;
  // password: string;
}

async function getToilet(address: Address) {
  try {
    const { country, city, street, streetNumber } = address;
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `{ toilet({
          country: "${country}", 
          city: "${city}, 
          street: "${street}, 
          streetNumber: "${streetNumber}
        }) {
          id
          price
          isPaid
          reviews {
            id
            contributedBy
            cleanliness
            performance
            description
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

async function updateData(reviewData: UpdateReview) {
  try {
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `muation { updateReviewData({
          id: "${reviewData.id}"
          contributedBy: "${reviewData.contributedBy}", 
        }) {
          id
          contributedBy
          cleanliness
          performance
          description
        }}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to update toilet data');
    }

    const dataObj = await res.json();
    console.log(dataObj.data);
  } catch (err) {
    console.log('Error updateData func', err);
  }
}

async function deleteData(deleteReviewData: DeleteReview) {
  try {
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `muation { deleteReviewData({
          id: "${deleteReviewData.id}", 
        }) {
          id
          contributedBy
        }}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete toilet data');
    }

    const dataObj = await res.json();
    console.log(dataObj.data);
  } catch (err) {
    console.log('Error deleteData func', err);
  }
}

export default async function StreetNumber({ params }: { params: Address }) {
  const { toilet } = await getToilet(params);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl flex-col w-full items-center justify-between font-mono text-sm lg:flex'>
        <p className='w-full'>Price: {toilet.price}</p>
        <br />
        {toilet.reviews.map((review: Review, index: number) => {
          return (
            <>
              <p
                key={index}
                className='flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'
              >
                <span>{review.contributedBy}</span>
                <br />
                <span>{review.cleanliness}</span>
                <br />
                <span>{review.performance}</span>
                <br />
                <span>{review.description}</span>
              </p>
              <button onClick={() => updateData({ ...review, password: '' })}>
                Update
              </button>
              <button onClick={() => deleteData({ id: review.id })}>
                Delete
              </button>
            </>
          );
        })}
      </div>
    </main>
  );
}
