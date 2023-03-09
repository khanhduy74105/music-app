import moment from 'moment'
import {memo, useContext} from 'react'
import 'moment/locale/vi'
import { SongDetail } from '../context/songContext'
import { toast } from 'react-toastify'
const SongItem = ({data, order, percent, style, sm, size}:any) => {
  const {setSongId,setRecentSongs} = useContext(SongDetail)
  const handleClickSong = ()=>{
    if (data?.streamingStatus !== 2) {
      setSongId(data.encodeId)
      setRecentSongs((prev:any)  => {
        if (prev.some((item:any)=>item.encodeId === data.encodeId)) {
          const index = prev.indexOf(prev.find((item:any)=>item.encodeId === data.encodeId));
          if (index) {
            prev.splice(index, 1);
          }else{
            return [data, ...prev]
          }
        }else if (prev.length > 4) {
          prev.pop()
        }
        return [data, ...prev]
      })
    }else{
      toast.warn('Bài hát này chỉ dành cho Vip!')
    }
  }
  return (
    <div className={`w-full rounded-md gap-3 cursor-pointer flex ${order ? 'justify-between':'justify-start'} items-center  flex-aut p-[10px]  ${style} ${style || size ? 'bg-[#8c4fa06e] hover:bg-[#edc5fba3]' : 'hover:bg-main-100'}`}
    onClick={()=>handleClickSong()}>
      <div className='flex items-center justify-start gap-3 px-2 py-1'>
        {order && <span className={`text-[32px] font-bold text-main-100 ${order < 4 ? `text-shadow-no${order}` : 'text-shadow'}`}>{order}</span>}
        <img src={data?.thumbnail} alt="thumbnail"  className={`${size ? size : sm ? `w-[40px] h-[40px]` : `w-[50px] h-[50px]`} object-cover rounded-md`}/>
        <div className="flex flex-col gap-1 overflow-hidden">

          <span className='flex items-center gap-2'>
            {data?.streamingStatus === 2 && <span className='text-[10px] uppercase font-semibold rounded-sm px-1 bg-yellow-500'>vip</span>}
            <span className='font-bold text-sm whitespace-nowrap overflow-hidden'>{data?.title.length > 31 ? data?.title.slice(0, 31) : data?.title}</span>
          </span>
          <span className='text-gray-500 whitespace-nowrap text-xs'>{data?.artistsNames}</span>
          {(data?.releaseDate && !sm ) ? <span className='text-gray-500 text-xs'>{moment(data?.releaseDate * 1000).fromNow()}</span> : ''}
        </div>
      </div>
      {percent  && <span className='text-[20px] font-bold'>{percent}%</span>}
    </div>
  )
}

export default memo(SongItem)