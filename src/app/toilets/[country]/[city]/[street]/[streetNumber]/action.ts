'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createReview(formData: FormData) {
  const contributedBy = formData.get('contributedBy');
  const password = formData.get('password');
  const cleanliness = parseFloat(formData.get('cleanliness') as string);
  const performance = parseFloat(formData.get('performance') as string);
  const description = formData.get('description');
  try {
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `mutation { createReview(
          createReviewData:{
            contributedBy: "${contributedBy}",
            password: "${password}",
            cleanliness: ${cleanliness},
            performance: ${performance},
            description: "${description}",
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
      throw new Error('Failed to update toilet data');
    }

    const result = await res.json();

    if (result.data) {
      console.log(result.data);
    } else {
      console.log(result.errors[0].message);
    }

    revalidatePath('/toilets/[country]/[city]/[street]/[streetNumber]');
  } catch (err) {
    console.log(err);
  }
}

export async function updateReview(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const contributedBy = formData.get('contributedBy');
  const password = formData.get('password');
  const cleanliness = parseFloat(formData.get('cleanliness') as string);
  const performance = parseFloat(formData.get('performance') as string);
  const description = formData.get('description');

  try {
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `mutation { updateReview(
          updateReviewData: {
            id: ${id}
            contributedBy: "${contributedBy}",
            password: "${password}",
            cleanliness: ${cleanliness},
            performance: ${performance},
            description: "${description}",
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
      throw new Error('Failed to update toilet data');
    }

    const result = await res.json();

    if (result.data) {
      console.log(result.data);
    } else {
      console.log(result.errors[0].message);
    }

    revalidatePath('/toilets/[country]/[city]/[street]/[streetNumber]');
  } catch (err) {
    console.log(err);
  }
}

export async function deleteReview(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const contributedBy = formData.get('contributedBy');
  const password = formData.get('password');
  try {
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `mutation { deleteReview(
          deleteReviewData:{
            id: ${id},
            contributedBy: "${contributedBy}",
            password: "${password}" 
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

    const result = await res.json();

    if (result.data) {
      console.log(result.data);
    } else {
      console.log(result.errors[0].message);
    }

    revalidatePath('/toilets/[country]/[city]/[street]/[streetNumber]');
  } catch (err) {
    console.log(err);
  }
}
