'use client';

import { useRef } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { deleteReview } from '../action';

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <div className='flex items-center justify-between'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        type='submit'
        aria-disabled={pending}
      >
        Confirm
      </button>
    </div>
  );
}

export default function DeleteReview({ review }: { review: any }) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      action={deleteReview}
    >
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Email
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          type='email'
          name='contributedBy'
          ref={emailRef}
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Password
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          type='password'
          name='password'
          ref={passwordRef}
          required
        />
      </div>
      <ConfirmButton />
    </form>
  );
}
