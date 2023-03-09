import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { apiArtist } from '../../apis'
import { useState } from 'react'
import icons from '../../utils/icons'
import { Artist, Section, SongList } from '../../components'
const Singer = () => {
  const { singer } = useParams()
  const [artist, setArtist] = useState<any>()
  const { BsPlayFill, MdPersonAddAlt } = icons
  useQuery({
    queryKey: ['artist', singer],
    queryFn: () => apiArtist(singer),
    onSuccess: (data: any) => {
      setArtist(data.data.data)
    }
  })


  return (
    <div className={`flex flex-col gap-4`}>
      <div className="h-[300px] w-full relative">
        <img src={artist?.cover} alt="" className={`h-full w-full object-cover object-top`} />
        <div className="absolute left-0 right-0 bottom-0 h-2/5 bg-gradient-to-t from-[#6c6c6c7d] ">
          <div className="px-[28px] flex flex-col gap-2">
            <span className='flex gap-4 items-center'>
              <span className="font-bold text-[50px]">{artist?.name}</span>
              <span className='flex items-center justify-center h-[50px] w-[50px] rounded-full text-main hover:text-white bg-white hover:bg-main transition-colors'>
                <BsPlayFill size={30} className={` transition-colors`} />
              </span>
            </span>
            <div className="flex gap-4 items-center">
              <span className="text-gray-200 font-semibold cursor-pointer">{artist?.totalFollow} người quan tâm</span>
              <button className='text-sm uppercase font-semibold  rounded-l-full rounded-r-full px-3 py-[2px] flex gap-1 items-center border border-white hover:opacity-70  bg-[#6c6c6c7d]'>
                <MdPersonAddAlt />
                Quan tâm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-[28px] w-full">
        <div className='flex justify-between w-full'>
          <h1 className='font-bold text-lg'>Bài bát</h1>
          <a href="/">Tất Cả</a>
        </div>
        <div className="flex flex-wrap justify-between">
          {artist?.sections.find((item: any) => item.sectionId === 'aSongs')?.items.map((item: any, index: any) => {
            return index < 6 ? (
              <div className='w-[45%]' key={item.encodeId}>
                <SongList songData={item} artists={item.artists} isHideAlbum={true} />
              </div>
            ) : ''
          })}
        </div>
      </div>
      <div className="flex flex-wrap">
        {artist?.sections.filter((item: any) => (item.sectionType === 'playlist')).map((item: any, idx: any) => (
          <Section data={item} key={item.sectionId + idx} smpadding />
        ))}
      </div>
      <div className="flex w-full flex-col gap-4 px-[28px]">
        <h1 className='font-bold text-lg'>Có thể bạn quan tâm</h1>
        <div className="flex w-full gap-4">
          {artist?.sections.filter((item: any) => (item.sectionId === "aReArtist"))?.[0].items.map((item: any) => (
            <div className="w-1/5 flex-1" key={item.id}>
              <Artist data={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 px-[28px]">
        <h1 className='font-bold text-lg'>Về {artist?.name}</h1>
        <div className="flex justify-between items-start w-full">
          <div className="w-[45%] h-[300px]">
            <img src={artist?.thumbnailM} alt="" className='w-full h-full object-cover object-top rounded-lg' />
          </div>
          <div className='w-[50%]'>
            <p dangerouslySetInnerHTML={{ __html: artist?.biography }} className='text-sm text-gray-400 max-h-[200px] overflow-hidden'>
            </p>
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col gap-1">
                <span className='font-bold text-xl'>{artist?.totalFollow}</span>
                <span className='text-gray-300 font-semibold'>Người quan tâm</span>
              </div>
              {artist?.awards && <div className="flex flex-col gap-1">
                <span className='font-bold text-xl'>{artist?.awards.length}</span>
                <span className='text-gray-300 font-semibold'>Giải thưởng</span>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Singer