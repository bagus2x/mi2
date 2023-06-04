'use client'

import SectionLabel from '@mi/app/(home)/components/section-label'
import useDraggableScroll from '@mi/utils/hooks/use-draggable-scroll'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
export default function Structure() {
  const { containerRef, onMouseDown } = useDraggableScroll<HTMLDivElement>()

  return (
    <section className='w-full cursor-pointer  pb-4'>
      <div className='mx-auto max-w-screen-xl px-4'>
        <SectionLabel label='Struktur Organisasi' />
        <p className='mt-4 text-gray-800'>
          Struktur organisasi Madrasah Islamiyah Purwojati tahun pelajaran
          2022/2023
        </p>
      </div>
      <div onMouseDown={onMouseDown} className='flex flex-col space-y-4 py-4'>
        <div ref={containerRef} className='max-w-[100vw] overflow-x-auto py-4'>
          <GraphRoot root={data} />
        </div>
        <div className='mx-auto flex w-full max-w-screen-xl flex-col items-start space-y-4 px-4'>
          <h6 className='text-gray-800'>Keterangan: </h6>
          <div className='flex items-center space-x-4'>
            <span className='border-x-1 h-5 w-10 rounded-lg border border-gray-800' />
            <span className='text-xs text-gray-800'>Komando</span>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='border-x-1 h-5 w-10 rounded-lg border border-dashed border-gray-800' />
            <span className='text-xs text-gray-800'>Koordinator</span>
          </div>
        </div>
      </div>
    </section>
  )
}

type ComandoNode = {
  name: string
  position: string
  photo?: string
  children?: NodeType[]
  type: string
}

type CoordinationNode = {
  name: string
  position: string
  photo?: string
  children?: NodeType[]
  type: string
}

type LabelNode = {
  text: string
  children?: NodeType[]
  type: string
}

type SpanNode = {
  void?: unknown
  children?: NodeType[]
  type: string
}

type NodeType = ComandoNode | LabelNode | SpanNode | CoordinationNode

const isSpanNode = (obj: NodeType): obj is SpanNode => {
  return obj.type === 'span'
}

const isTypeComandoNode = (obj: NodeType): obj is ComandoNode => {
  return obj.type === 'comando'
}

const isTypeCoordinationNode = (obj: NodeType): obj is CoordinationNode => {
  return obj.type === 'coordination'
}

function Node({ node, root }: { node: NodeType; root?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (root) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [])

  if (isSpanNode(node)) {
    return <div />
  }

  if (isTypeComandoNode(node)) {
    return (
      <div
        ref={ref}
        className='mx-4 inline-block overflow-clip rounded-2xl border border-gray-800 shadow transition-all hover:scale-105'
      >
        <div className='flex w-full min-w-[120px] max-w-xs flex-col'>
          <div className='relative aspect-square h-full w-full'>
            <Image
              src={node.photo || '/images/profile-placeholder.png'}
              alt={node.name}
              fill
              className='pointer-events-none'
            />
          </div>
          <span className='p-2 text-[10px] text-gray-800'>{node.name}</span>
          <span className='px-2 pb-2 text-[11px] text-gray-800'>
            {node.position}
          </span>
        </div>
      </div>
    )
  }

  if (isTypeCoordinationNode(node)) {
    return (
      <div className='mx-4 inline-block overflow-clip rounded-2xl border border-dashed border-gray-800 shadow transition-all hover:scale-105'>
        <div className='flex w-full min-w-[120px] max-w-xs flex-col'>
          <div className='relative aspect-square h-full w-full'>
            <Image
              src={node.photo || '/images/profile-placeholder.png'}
              alt={node.name}
              fill
            />
          </div>
          <span className='p-2 text-[10px] text-gray-800'>{node.name}</span>
          <span className='px-2 pb-2 text-[11px] text-gray-800'>
            {node.position}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className='inline-block rounded-2xl bg-gray-800 px-4 py-2 text-white'>
      {node.text}
    </div>
  )
}

const data: ComandoNode = {
  name: 'ABD. CHALIQ, S.Pd',
  position: 'Kepala Sekolah',
  type: 'comando',
  children: [
    {
      type: 'label',
      text: 'Petugas',
      children: [
        {
          name: 'Rantining,S.Pd',
          position: 'Petugas Perpustakaan',
          type: 'comando',
        },
        {
          name: 'Moch. Gustyawan',
          position: 'Petugas Tata Usaha',
          type: 'comando',
        },
        {
          name: 'Khofidhotur R., S.Pd',
          position: 'Bendahara BOS',
          type: 'comando',
        },
      ],
    },
    {
      text: 'KELOMPOK JABATAN FUNGSIONAL / GURU',
      type: 'label',
      children: [
        {
          text: 'Wali Kelas',
          type: 'label',
          children: [
            {
              name: 'Moch. Gustyawan',
              position: 'Wali Kelas 1',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Wali Kelas 2',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Wali Kelas 3',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Wali Kelas 4',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Wali Kelas 5',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Wali Kelas 6',
              type: 'comando',
            },
          ],
        },
        {
          text: 'Ekstrakulikuler',
          type: 'label',
          children: [
            {
              name: 'Moch. Gustyawan',
              position: 'Kelas 1',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Kelas 2',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Kelas 3',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Kelas 4',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Kelas 5',
              type: 'comando',
            },
            {
              name: 'Moch. Gustyawan',
              position: 'Kelas 6',
              type: 'comando',
            },
          ],
        },
      ],
    },
    {
      name: 'ACH. MUHYIDDIN S.Pd',
      position: 'Badan Peran Serta Masyarakat',
      type: 'coordination',
    },
    {
      name: 'MIFTAHUL JANNAH',
      position: 'Badan Peran Serta Masyarakat',
      type: 'coordination',
    },
  ],
}

function GraphRoot({ root }: { root: NodeType }) {
  return (
    <Tree label={<Node node={root} root />}>
      <GraphNodes nodes={root.children} />
    </Tree>
  )
}

function GraphNodes({ nodes }: { nodes?: NodeType[] }) {
  return (
    <>
      {nodes?.map((node) => (
        <TreeNode label={<Node node={node} />}>
          {node.children && <GraphNodes nodes={node.children} />}
        </TreeNode>
      ))}
    </>
  )
}
