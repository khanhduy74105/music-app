import { useNavigate } from 'react-router-dom'
import { handleNumber } from '../utils/fn'
import icons from '../utils/icons'
const { MdPersonAddAlt, CiShuffle } = icons
const Artist = ({ data }: any) => {
  const navigate = useNavigate()
  const hanldeClick = (link: string) => {
    navigate(link)
  }
  return (
    <div className='w-full flex flex-col items-center gap-2'>
      <div className="w-[150px] max-w-full h-[150px] rounded-full parent-overlay overflow-hidden transition-all cursor-pointer relative" onClick={(e) => hanldeClick(data.link)}>
        <img src={data?.thumbnailM || data?.thumbnail} alt="" className='w-full h-full object-contain max-w-full' />
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-overlay-20 child-overlay hidden items-center justify-center ">
          <span className='rounded-full p-2 border border-white hover:opacity-60'>
            <CiShuffle size={24} />
          </span>
        </div>
      </div>
      <span className='font-semibold hover:text-main cursor-pointer hover:border-b-[1px] hover:border-main'
        onClick={(e) => hanldeClick(data.link)}
      >{data.name}</span>
      <span className='text-gray-400 text-xs'>{handleNumber(data.totalFollow)} quan tâm</span>
      <button className='px-4 py-1 rounded-r-full rounded-l-full bg-main hover:opacity-70 flex gap-1 items-center justify-center text-xs uppercase'>
        <MdPersonAddAlt size={18} />
        Quan tâm
      </button>
    </div>
  )
}

export default Artist