import SectionLabel from "@mi/app/(home)/components/section-label";

export default function FacilityList() {
  return (
    <section className="max-w-screen-xl mx-auto w-full" >
      <SectionLabel label="Fasilitas" />
      <div className="w-full overflow-x-auto flex gap-4 flex-col">
        <h6 className="mt-4">Bangunan-bangunan yang ada di Madrasah Islamiyah Purwojati</h6>
        <table className='mt-2 w-full overflow-x-auto text-left text-sm max-w-screen-xl font-light grow shrink-0'>
          <thead className='border-b font-medium dark:border-neutral-500'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                #
              </th>
              <th scope='col' className='px-6 py-4'>
                Nama Bangunan
              </th>
              <th scope='col' className='px-6 py-4'>
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((building, index) => (
              <tr key={index} className='border-b dark:border-neutral-500'>
                <td className='whitespace-nowrap px-6 py-4 font-medium'>
                  {index + 1}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>{building.name}</td>
                <td className='whitespace-nowrap px-6 py-4'>{building.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h6 className="mt-4">Peralatan yang disediakan untuk mendukung pembelajaran di Madrasah Islamiyah Purwojati</h6>
        <table className='mt-2 w-full overflow-x-auto text-left text-sm max-w-screen-xl font-light grow shrink-0'>
          <thead className='border-b font-medium dark:border-neutral-500'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                #
              </th>
              <th scope='col' className='px-6 py-4'>
                Nama Peralatang Pendukung
              </th>
              <th scope='col' className='px-6 py-4'>
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            {learningTools.map((tool, index) => (
              <tr key={index} className='border-b dark:border-neutral-500'>
                <td className='whitespace-nowrap px-6 py-4 font-medium'>
                  {index + 1}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>{tool.name}</td>
                <td className='whitespace-nowrap px-6 py-4'>{tool.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const buildings = [
  {
    name: 'Ruang Kelas dilengkapi dengan kipas angin',
    total: 6
  },
  {
    name: 'Toilet Murid dan Guru',
    total: 5
  },
  {
    name: 'Ruang Kepala Madrasah',
    total: 1
  },
  {
    name: 'Ruang Guru',
    total: 1
  },
  {
    name: 'Lab. Komputer',
    total: 1
  },
  {
    name: 'Perpustakaan',
    total: 1
  },
  {
    name: 'Ruang UKS',
    total: 1
  },
  {
    name: 'Ruang BP/BK',
    total: 1
  },
  {
    name: 'Koperasi',
    total: 1
  },
  {
    name: 'Gudang',
    total: 1
  }
]

const learningTools = [
  {
    name: 'Laptop',
    total: 8
  },
  {
    name: 'LCD',
    total: 3
  },
  {
    name: 'Proyektor',
    total: 1
  },
  {
    name: 'TV',
    total: 1
  },
  {
    name: 'Speaker',
    total: 3
  },
  {
    name: 'komputer',
    total: 7
  }
]