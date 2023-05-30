'use client'

import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Icon } from 'iconsax-react'
import { ArrowDown2, Add as Close, HambergerMenu } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'

export default function Navbar() {
  return (
    <nav className='fixed top-0 z-50 w-full bg-white shadow'>
      <div className='mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-2'>
        <Link href='/'>
          <Image
            src='/images/logo.png'
            priority
            alt='Logo'
            width={48}
            height={48}
            className='h-8 w-8 md:h-12 md:w-12'
          />
        </Link>
        <MobileMenu />
        <DesktopMenu />
      </div>
    </nav>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className='flex items-center justify-center md:invisible'>
      <button className='h-10 w-10 rounded-full' onClick={() => setOpen(true)}>
        <HambergerMenu size={24} className='m-2 text-gray-800' />
      </button>
      <div
        className={clsx(
          'fixed top-0 z-50 flex h-full w-80 flex-col bg-white shadow-2xl transition-all',
          open ? 'right-0' : '-right-80',
        )}
      >
        <div className='flex w-full shadow'>
          <button
            className='mx-4 my-2 h-10 w-10 overflow-hidden rounded-full transition-all hover:bg-green-100'
            onClick={() => setOpen(false)}
          >
            <Close size={24} className='m-2 text-gray-800 rotate-45' />
          </button>
        </div>
        <ul className='flex flex-col items-end space-y-2 p-2'>
          {navbarItems.map((navbarItem, index) =>
            navbarItem.subItems?.length ? (
              <MobileDropdownMenuItem key={index} item={navbarItem} onClick={() => setOpen(false)} />
            ) : (
              <li key={index} className='flex w-full'>
                <Link
                  onClick={() => setOpen(false)}
                  href={navbarItem.href}
                  className={clsx(
                    'w-full rounded-xl px-4 py-2 transition-all hover:bg-green-500 hover:text-white',
                    navbarItem.href === pathname && 'bg-green-500 text-white',
                  )}
                >
                  {navbarItem.text}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}

interface MobileDropdownMenuItemProps {
  item: NavbarItem,
  onClick: (item: NavbarItem) => void
}

function MobileDropdownMenuItem({ item, onClick }: MobileDropdownMenuItemProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <li className='flex w-full flex-col space-y-2'>
      <button
        className={clsx(
          'flex w-full items-center space-x-2 rounded-xl px-4 py-2 transition-all',
        )}
        onClick={() => setOpen(!open)}
      >
        <span>{item.text}</span>
        {item.icon && (
          <item.icon
            size={16}
            className={clsx('transition', open ? 'rotate-180' : 'rotate-0')}
          />
        )}
      </button>
      <motion.ul
        className='flex w-full flex-col space-y-1 overflow-y-hidden rounded-xl bg-green-100'
        animate={open ? 'open' : 'close'}
        variants={{
          open: {
            height: 'auto',
          },
          close: {
            height: 0,
          },
        }}
      >
        {item.subItems?.map((item, index) => (
          <li key={index} className='flex items-center space-x-1'>
            <Link
              href={item.href}
              download
              className={clsx(
                'w-full rounded-xl px-4 py-2 transition-all hover:bg-green-500 hover:text-white',
                item.href === pathname && 'bg-green-500 text-white',
              )}
              onClick={() => onClick(item)}
            >
              • {item.text}
            </Link>
          </li>
        ))}
      </motion.ul>
    </li>
  )
}

function DesktopMenu() {
  return (
    <ul className='hidden gap-3 md:flex lg:gap-6'>
      {navbarItems.map(({ href, subItems, text, icon: Icon }, index) =>
        subItems ? (
          <Menu key={index} as='li' className='relative'>
            {({ open, close }) => (
              <>
                <Menu.Button
                  className={clsx(
                    'flex select-none items-center gap-2  text-sm hover:text-green-500',
                    open ? 'text-green-500' : 'text-gray-900',
                  )}
                >
                  <span>{text}</span>
                  {Icon && (
                    <Icon
                      size={16}
                      className={clsx(
                        'transition',
                        open ? 'rotate-180' : 'rotate-0',
                      )}
                    />
                  )}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 mt-4 flex flex-col rounded-lg bg-white p-2 shadow-lg outline outline-1 outline-gray-100 transition'>
                    {subItems.map((subItem, index) => (
                      <Link
                        key={index}
                        href={subItem.href}
                        onClick={() => close()}
                        className='flex select-none items-center gap-2 rounded-xl px-4 py-2 text-sm text-gray-900 transition hover:bg-green-500 hover:text-white whitespace-nowrap'
                      >
                        {subItem.text}
                      </Link>
                    ))}
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        ) : (
          <Link
            key={index}
            href={href}
            className='flex select-none items-center gap-2 text-sm text-neutral-800 hover:text-green-500'
          >
            {text}
          </Link>
        ),
      )}
    </ul>
  )
}

interface NavbarItem {
  text: string
  href: string
  subItems?: NavbarItem[]
  icon?: Icon
}

const navbarItems: NavbarItem[] = [
  {
    text: 'Beranda',
    href: '/',
  },
  {
    text: 'Tentang',
    href: '#',
    subItems: [
      {
        text: 'Struktur Organisasi',
        href: '/about/organization-structure',
      },
      {
        text: 'Fasilitas',
        href: '/about/facility',
      },
      {
        text: 'Visi dan Misi',
        href: '/about/vision-mission',
      },
      {
        text: 'Guru dan Karyawan',
        href: '/about/teachers'
      },
      {
        text: 'Tata Tertib',
        href: '/about/code-of-conduct',
      },
    ],
    icon: ArrowDown2,
  },
  {
    text: 'Kultur Positif',
    href: '/positive-culture',
  },
  {
    text: 'Program',
    href: '#',
    subItems: [
      {
        text: 'Pengembangan',
        href: '/program/development',
      },
      {
        text: 'Unggulan',
        href: '/program/flagship',
      },
    ],
    icon: ArrowDown2,
  },
  {
    text: 'Pembelajaran',
    href: '/learning',
  },
  {
    text: 'Downloads',
    href: '/downloads'
  },
  {
    text: 'Kontak',
    href: '/contact',
  },
]
