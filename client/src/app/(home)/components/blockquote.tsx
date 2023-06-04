import Quote from '@mi/data/models/quote'

type BlockquoteProps = Quote

export default function Blockquote({ arab, bahasa }: BlockquoteProps) {
  return (
    <blockquote className='mt-12 flex flex-col items-start px-4 xl:px-0'>
      <div className='mx-auto w-full max-w-screen-xl text-center'>
        <p className='text-base text-gray-800'>{arab}</p>
        <p className='text-base text-gray-600'>{bahasa}</p>
      </div>
    </blockquote>
  )
}
