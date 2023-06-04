
'use client'

import { Popover } from "@headlessui/react"
import { toast } from "@mi/app/components/toaster"
import { Facebook, Send2 } from "iconsax-react"
import { useEffect, useState } from "react"

interface ShareButtonProps {
  title: string
  description: string
  image: string
  url?: string
}

export default function ShareButton({ title, url: urlDefault, description, image }: ShareButtonProps) {
  const [url, setUrl] = useState(urlDefault || '')

  useEffect(() => {
    if (typeof window !== 'undefined' && !url) {
      setUrl(`${document.URL}`)
    }
  }, [])

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast.success('Berhasil disalin')
  }

  const handleFacebookShare = () => {
    fbShare(url, title, description, image, 500, 400)
  }

  return (
    <Popover className='relative'>
      <Popover.Button className='rounded-full text-xs text-gray-800 hover:bg-green-50 outline-none'>
        <Send2 size={24} className='m-2' />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 w-full max-w-sm shadow border border-gray-100 rounded-2xl overflow-hidden">
        <div className="flex flex-col p-4 rounded-2xl overflow-hidden w-full space-y-2">
          <h6>Bagikan link: </h6>
          <input readOnly type="text" value={url} className="px-4 py-2 rounded-2xl outline-none ring-1 ring-gray-500 focus:ring-green-500" />
          <div className="w-full flex justify-between items-center pt-2">
            <button className="px-2 py-1 rounded-xl bg-gray-800 text-white text-xs" onClick={handleCopyToClipboard}>
              Copy
            </button>
            <div>
              <Facebook size={24} onClick={handleFacebookShare} className="text-blue-500" />
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

function fbShare(url: string, title: string, summary: string, image: string, winWidth: number, winHeight: number) {
  var winTop = (screen.height / 2) - (winHeight / 2);
  var winLeft = (screen.width / 2) - (winWidth / 2);
  window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + summary + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}