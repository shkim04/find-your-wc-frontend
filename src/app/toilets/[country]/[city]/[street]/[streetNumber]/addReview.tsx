'use client';
import { useRef } from 'react';
import { createReview } from './action';

export default function AddReview() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const cleanlinessRef = useRef<HTMLInputElement>(null);
  const performanceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form className='mb-6' action={createReview}>
      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <label htmlFor='email' className='sr-only'>
          Email
        </label>
        <input
          id='email'
          name='contributedBy'
          ref={emailRef}
          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          required
        />
      </div>
      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <label htmlFor='password' className='sr-only'>
          Password
        </label>
        <input
          id='password'
          name='password'
          ref={passwordRef}
          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          required
        />
      </div>
      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <label htmlFor='cleanliness' className='sr-only'>
          Cleanliness
        </label>
        <input
          id='cleanliness'
          name='cleanliness'
          ref={cleanlinessRef}
          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          required
        />
      </div>
      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <label htmlFor='performance' className='sr-only'>
          Performance
        </label>
        <input
          id='performance'
          name='performance'
          ref={performanceRef}
          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          required
        />
      </div>
      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <label htmlFor='description' className='sr-only'>
          Description
        </label>
        <textarea
          id='description'
          name='description'
          ref={descriptionRef}
          rows={2}
          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          placeholder='Write a description'
          required
        />
      </div>
      <button
        type='submit'
        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
      >
        Add review
      </button>
    </form>
  );
}
