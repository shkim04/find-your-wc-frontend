'use server';
import { redirect } from 'next/navigation';

export default async function createToilet(formData: FormData) {
  console.log('formData', formData);
  const isPaid = formData.get('paid') === 'Yes' ? true : false;
  const price = parseInt(formData.get('price') as string);
  const streetNumber = formData.get('streetNumber');
  const street = formData.get('street');
  const city = formData.get('city');
  const country = formData.get('country');
  const email = formData.get('email');
  const password = formData.get('password');
  const cleanliness = parseFloat(formData.get('cleanliness') as string);
  const performance = parseFloat(formData.get('performance') as string);
  const description = formData.get('description');

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation { createToilet(createToiletData: {
          isPaid: ${isPaid}
          price: ${price}
          address: {
            streetNumber: "${streetNumber}"
            street: "${street}"
            city: "${city}"
            country: "${country}"
          }
          reviews: {
            contributedBy: "${email}"
            password: "${password}"
            cleanliness: ${cleanliness}
            performance: ${performance}
            description: "${description}"
          }
        }) {
          id
          isPaid
          price
          address {
            street
            city
            country
          }
        }
      }`,
    }),
  });

  const data = await response.json();
  console.log(data);
  redirect('/');
}
