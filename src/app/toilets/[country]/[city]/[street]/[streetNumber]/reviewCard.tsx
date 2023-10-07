'use client';
import { useState, useEffect } from 'react';
import UpdateReview from './updateReview';
import DeleteReview from './deleteReview';

export default function ReviewCard({ review }: { review: any }) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [willEdit, setWillEdit] = useState(false);
  const [willRemove, setWillRemove] = useState(false);

  useEffect(() => {
    setWillEdit(false);
    setWillRemove(false);
  }, [review]);

  function toggleDropdown() {
    setIsOpenDropdown((prev) => !prev);
  }

  return (
    <article className='p-6 text-base bg-white rounded-lg dark:bg-gray-900'>
      {willEdit && (
        <>
          <button
            className='z-20 fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-gray-200'
            onClick={() => setWillEdit(false)}
          />
          <UpdateReview review={review} />
        </>
      )}
      {willRemove && (
        <>
          <button
            className='z-20 fixed top-0 right-0 bottom-0 left-0 w-full h-full bg-gray-200'
            onClick={() => setWillRemove(false)}
          />
          <DeleteReview review={review} />
        </>
      )}
      <footer className='flex justify-between items-center mb-2'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
              {review.contributedBy}
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              <time title='February 8th, 2022'>{review.createdAt}</time>
            </p>
          </div>
          <div className='flex items-center'>
            <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
              Cleanliness: {review.cleanliness}
            </p>
            <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
              Performance: {review.performance}
            </p>
          </div>
        </div>
        <div className='relative'>
          <button
            id='dropdownComment1Button'
            data-dropdown-toggle='dropdownComment1'
            className='block inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            type='button'
            onClick={toggleDropdown}
          >
            <svg
              className='w-4 h-4'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 16 3'
            >
              <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
            </svg>
            <span className='sr-only'>Review settings</span>
          </button>
          {isOpenDropdown && (
            <>
              <button
                className='fixed top-0 right-0 bottom-0 left-0 w-full h-full'
                onClick={() => setIsOpenDropdown(false)}
              />
              <div
                id='dropdownComment1'
                className='z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 mt-2'
                data-popper-placement='bottom'
              >
                <ul
                  className='py-1 text-sm text-gray-700 dark:text-gray-200'
                  aria-labelledby='dropdownMenuIconHorizontalButton'
                >
                  <li className='block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    <button
                      className='w-full py-2 px-4 text-start'
                      onClick={() => {
                        setWillEdit(true);
                        setIsOpenDropdown(false);
                      }}
                    >
                      Edit
                    </button>
                  </li>
                  <li className='block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    <button
                      className='w-full py-2 px-4 text-start'
                      onClick={() => {
                        setWillRemove(true);
                        setIsOpenDropdown(false);
                      }}
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </footer>
      <p className='text-gray-500 dark:text-gray-400'>{review.description}</p>
    </article>
  );
}
