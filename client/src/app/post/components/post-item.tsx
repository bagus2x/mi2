import DateFormatter from "@mi/app/components/date-formatter";
import Post from "@mi/data/models/post";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion'

interface PostItemProps {
  post: Post,
  animationDelay?: number
}

export default function PostItem({ post, animationDelay }: PostItemProps) {
  return (
    <motion.li initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: animationDelay } }} className="rounded-2xl shadow-xl flex space-x-4 overflow-hidden border border-gray-200">
      <div className="grow flex flex-col items-start space-y-2 p-4">
        <h6 className="text-lg font-semibold line-clamp-2">{post.title}</h6>
        <div>
          <p className="line-clamp-3 text-sm text-gray-500">{post.summary}</p>
          <DateFormatter date={post.createdAt} pattern="d MMMM yyyy, H:m" className="text-xs text-gray-500 mt-2" />
        </div>
        <Link href={`/post/${post.id}`} className="px-4 py-2 bg-green-500 hover:bg-green-800 transition rounded-2xl text-white">Baca Selengkapnya</Link>
      </div>
      <Image src={post.thumbnail} width={200} height={200} alt={post.title} className="shrink-0 object-cover" />
    </motion.li>
  )
}