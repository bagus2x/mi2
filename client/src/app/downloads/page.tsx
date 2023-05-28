import SectionLabel from '@mi/app/(home)/components/section-label'
import DateFormatter from '@mi/app/components/date-formatter'
import getDocument from '@mi/data/source/get-documents'
import Link from 'next/link'

export default async function Downloads() {
  const documents = await getDocument(1, 50)

  return (
    <main className='m-auto h-full max-w-screen-xl px-4 py-4 xl:py-8'>
      <SectionLabel label='Download File' />
      <table className='mt-4 w-full overflow-x-auto text-left text-sm font-light'>
        <thead className='border-b font-medium dark:border-neutral-500'>
          <tr>
            <th scope='col' className='px-6 py-4'>
              #
            </th>
            <th scope='col' className='px-6 py-4'>
              Nama
            </th>
            <th scope='col' className='px-6 py-4'>
              Tanggal Upload
            </th>
            <th scope='col' className='px-6 py-4'>
              File
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.data.map((document, index) => (
            <tr className='border-b dark:border-neutral-500'>
              <td className='whitespace-nowrap px-6 py-4 font-medium'>
                {index + 1}
              </td>
              <td className='whitespace-nowrap px-6 py-4'>{document.name}</td>
              <td className='whitespace-nowrap px-6 py-4'>
                <DateFormatter
                  date={document.createdAt}
                  pattern='d MMMM yyyy, H:m'
                />
              </td>
              <td className='whitespace-nowrap px-6 py-4'>
                <Link
                  href={document.file}
                  download
                  className='rounded-2xl bg-green-500 px-4 py-2 text-sm text-white transition-all hover:bg-green-800'
                >
                  Unduh
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
