'use client';

import { useRef } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { updateReview } from './action';

function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <div className='flex items-center justify-between'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline'
        type='submit'
        aria-disabled={pending}
      >
        Confirm
      </button>
    </div>
  );
}

export default function UpdateReview({ review }: { review: any }) {
  const passwordRef = useRef<HTMLInputElement>(null);
  const cleanlinessRef = useRef<HTMLInputElement>(null);
  const performanceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      className='z-30 w-1/2 h-auto fixed inset-x-1/4 inset-y-1/4 mx-auto bg-white px-4 py-8'
      action={updateReview}
    >
      <div className='flex justify-between items-center mb-2'>
        <div className='m-0 p-0 w-0 h-0'>
          <input type='hidden' name='id' defaultValue={review.id} />
        </div>
        <div className='m-0 p-0 w-0 h-0'>
          <input
            type='hidden'
            name='contributedBy'
            defaultValue={review.contributedBy}
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
              <label className='text-gray-700 text-sm font-bold mb-2 mr-3'>
                Cleanliness:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                type='number'
                step={0.1}
                name='cleanliness'
                defaultValue={review.cleanliness}
                ref={cleanlinessRef}
              />
            </div>
            <div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
              <label className='text-gray-700 text-sm font-bold mb-2 mr-3'>
                Performance:
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                type='number'
                step={0.1}
                name='performance'
                defaultValue={review.performance}
                ref={performanceRef}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='text-gray-500 dark:text-gray-400'>
        <textarea
          className='resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          rows={2}
          name='description'
          maxLength={500}
          defaultValue={review.description}
          ref={descriptionRef}
        />
      </div>
      <div className='flex items-center my-2'>
        <label className='text-gray-700 text-sm font-bold mb-2 mr-3'>
          Password:{' '}
        </label>
        <input
          className='shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          type='password'
          name='password'
          ref={passwordRef}
          required
        />
      </div>
      <UpdateButton />
    </form>
  );
}
