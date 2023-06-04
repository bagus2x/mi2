import SectionLabel from '@mi/app/(home)/components/section-label'

export default function TeachersList() {
  return (
    <section className='mx-auto w-full max-w-screen-xl px-4'>
      <SectionLabel label='Guru dan Karyawan' />
      <div className='w-full overflow-x-auto'>
        <table className='mt-4 w-full max-w-screen-xl overflow-x-auto text-left text-sm font-light'>
          <thead className='border-b font-medium dark:border-neutral-500'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                #
              </th>
              <th scope='col' className='px-6 py-4'>
                Nama Guru dan Karyawan
              </th>
              <th scope='col' className='px-6 py-4'>
                Tugas
              </th>
              <th scope='col' className='px-6 py-4'>
                Tugas Tambahan
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index} className='border-b dark:border-neutral-500'>
                <td className='whitespace-nowrap px-6 py-4 font-medium'>
                  {index + 1}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>{teacher.name}</td>
                <td className='whitespace-nowrap px-6 py-4'>{teacher.task}</td>
                <td className='whitespace-nowrap px-6 py-4'>
                  {teacher.extraTask}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const teachers = [
  {
    name: 'Abd. Chaliq, S.Pd',
    task: 'Kepala Madradah',
    extraTask: 'Kepala Madarasah',
  },
  {
    name: "Khofidhotur Rofi'ah, S.Pd",
    task: 'Guru Kelas',
    extraTask: 'Bendahara & Wali Kelas VI',
  },
  {
    name: 'Mochamad Gustyawan Nur U.',
    task: 'Operator',
    extraTask: 'Operator -',
  },
  {
    name: 'Rantining, S.Pd',
    task: 'Guru Kelas',
    extraTask: 'Wali Kelas V',
  },
  {
    name: 'Mariyah Ulfah, S.Pd.I',
    task: 'Guru Kelas',
    extraTask: 'Wali Kelas IV',
  },
  {
    name: 'Ahmad Zamharul M',
    task: 'Guru Kelas',
    extraTask: 'Wali Kelas III',
  },
  {
    name: 'Helmi Perdiyanto, S.Pd',
    task: 'Guru Kelas',
    extraTask: 'Wali Kelas II',
  },
  {
    name: 'Variyah, S.Pd.I',
    task: 'Guru Kelas',
    extraTask: 'Wali Kelas I',
  },
  {
    name: 'Variyah, S.Pd.I',
    task: 'Guru B. Indonesia',
    extraTask: 'Pembina Pramuka Perempuan',
  },
  {
    name: 'Dicky Setiawan, S.Ag',
    task: 'Guru Agama',
    extraTask: 'Pembina Al Banjari',
  },
  {
    name: 'Yonif Andriawan, S.Pd',
    task: 'Guru Olahraga',
    extraTask: '',
  },
]
