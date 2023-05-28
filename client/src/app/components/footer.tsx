import Link from 'next/link'
import { SiInstagram } from 'react-icons/si'
import { RiYoutubeLine, RiInstagramLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className='border border-t-gray-200 bg-white px-4 shadow-2xl dark:bg-gray-800 xl:px-0'>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col-reverse items-center justify-between py-4 sm:flex-row'>
        <span className='text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
          © 2023{' '}
          <Link href='https://flowbite.com/' className='hover:underline'>
            MI Purwojati
          </Link>
          . All Rights Reserved.
        </span>
        <ul className='flex flex-wrap items-center space-x-4 p-2 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li className='flex items-center justify-center'>
            <Link href='https://www.instagram.com/mis_islamiyahpurwojati'>
              <RiInstagramLine size={24} />
            </Link>
          </li>
          <li className='flex items-center justify-center'>
            <Link href='https://www.youtube.com/@misislamiyahpurwojati'>
              <RiYoutubeLine size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
