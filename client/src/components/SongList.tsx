import icons from "../utils/icons"
import { memo } from 'react'
import moment from "moment"
import {useContext} from 'react'
import { SongDetail } from "../context/songContext"
import { useNavigate } from "react-router-dom"
import { apiAddFav, apiRemoveFav } from "../apis"
import { toast } from "react-toastify"
const {BsMusicNoteBeamed,IoMdAdd,ImBin} = icons

const SongList = ({songData, isHideAlbum, artists, order,inPersonal}: any) => {
  const navigate = useNavigate()
  const {setSongId, setAtAlbum, setRecentSongs} = useContext(SongDetail)
  const handleAddFavoriteSong = async (songId: any)=>{
    if (songData?.streamingStatus === 1) {
      const res:any = await apiAddFav({songId: songId})
      if (res.data.success === true) {
        toast.success(res.data.message)
      }else{
        toast.warn((res.data.message))
      }
    }else{
      toast.dark("Only for VIP")
    }
  }
  const handleRemoveFavoriteSong = async (songId: any)=>{
    if (songData?.streamingStatus === 1) {
      const res = await apiRemoveFav({songId: songId})
      if (res.data.success === true) {
        toast.success(res.data.message)
      }else{
        toast.warn((res.data.message))
      }
    }
  }
  const handleClickSong = (id: string)=>{
    setSongId(id)
    setAtAlbum(true)
    setRecentSongs((prev:any)  => {
      if (prev.some((item:any)=>item.encodeId === songData.encodeId)) {
        const index = prev.indexOf(prev.find((item:any)=>item.encodeId === songData.encodeId));
        if (index) {
          prev.splice(index, 1);
        }
      }
      if (prev.length > 4) {
        prev.pop()
      }
      return [songData, ...prev]
    })
  }
  return (
    <div className='flex justify-between items-center p-[10px] border-t-[1px] border-main-100 hover:bg-main-100 cursor-pointer songitem'
      onClick={()=>handleClickSong(songData?.encodeId)}
    >
      <div className="flex items-center gap-3 flex-1">
      {order && <span className={`text-[32px] font-bold text-main-200 ${order<4 ? `text-shadow-no${order}` : 'text-shadow'} min-w-[50px] text-center`}>{order}</span>}
        {!isHideAlbum && !order && <BsMusicNoteBeamed />}
        <img 
          src={songData?.thumbnail} 
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md" 
        />
        <span className="flex flex-col w-[60%]">
          <span className="flex items-center gap-2">
            {songData?.streamingStatus === 2 && <span className='text-[10px] uppercase font-semibold rounded-sm px-1 bg-yellow-500'>vip</span>}
            <span className="text-sm font-semibold whitespace-nowrap">{songData?.title.length >= 16 ? `${songData?.title.slice(0,17)}...` : songData?.title}</span>
          </span>
          <span className="text-xs gap-2 flex items-center">{songData?.artists?.map((item:any)=>(
            <span className="hover:text-main hover:border-b-[1px] border-b-main" key={item.id} onClick={()=>navigate(item.link)}>{item.name}</span>
          ))}</span>
        </span>
      </div>
     {!isHideAlbum && <div className="flex-1 justify-start font-semibold text-xs text-gray-400 hover:text-main" onClick={(e)=>{
      e.stopPropagation()
      navigate(songData?.album?.link.split('.')[0])
      }}>
        {songData?.album?.title}
      </div>}
      <div className="flex-none flex justify-end min-w-[100px] text-xs text-gray-400">
        <span className="songtime">{moment.utc(songData?.duration * 1000).format('mm:ss')}</span>
        {<span className="songadd w-10 h-10 rounded-full font-bold hidden items-center justify-center hover:bg-[#76737392]"
          onClick={e => {
            e.stopPropagation()
            {!inPersonal ? handleAddFavoriteSong(songData?.encodeId): handleRemoveFavoriteSong(songData?.encodeId)}
          }}
        > {inPersonal ? <ImBin  size={18}/> : <IoMdAdd />} </span>}
      </div>
    </div>
  )
}

export default memo (SongList)