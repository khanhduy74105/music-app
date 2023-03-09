import icons from "../utils/icons"
import {useState,useContext, useEffect} from 'react'
import { SongDetail } from "../context/songContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import SongItem from "./SongItem"
import { Link } from "react-router-dom"
import path from "../utils/path"
import { getDetailPlaylist } from "../apis"
import { Scrollbar } from "react-scrollbars-custom"
const {ImBin} = icons
const SideBarRight = () => {
  const queryCLient = useQueryClient()
  const {songId, recentSongs,isPlaying} = useContext(SongDetail)
  const [isRecent, setIsRecent] = useState(true)
  const [playList, setPlayList] = useState([])
  const data:any=queryCLient.getQueryData(['songDetail', songId])
  useQuery({
    queryKey: ['detail-playlist', data?.data?.album?.encodeId],
    queryFn: ()=>getDetailPlaylist(data?.data?.album?.encodeId),
    onSuccess: (data: any)=>{
      setPlayList(data?.data?.song?.items)
    }
  })
  useEffect(()=>{
    if (isPlaying) setIsRecent(true)
  }, [isPlaying])
  return (
    <div className="flex flex-col text-xs w-full">
      <div className="flex items-center justify-between h-[70px] flex-none py-[14px] px-2">
        <div className="flex items-center justify-center py-[4px] bg-[#c9acda42] rounded-full px-[4px] cursor-pointer" >
          <span className={`py-[5px] ${isRecent && `bg-[#6A6475]`} rounded-full px-4`}
            onClick={()=>setIsRecent((prev: boolean)=>!prev)}
          >Danh sách phát</span>
          <span className={`py-[5px] ${!isRecent && `bg-[#6A6475]`} rounded-full px-4`}
            onClick={()=>setIsRecent((prev: boolean)=>!prev)}
          >Nghe gần đây</span>
        </div>
        <span className="p-2 rounded-full hover:bg-main cursor-pointer">
          <ImBin size={14}/>
        </span>
      </div>
      {isRecent ? (<div className="w-full flex flex-col">
        <Scrollbar style={{width: '100%', height: '80vh'}}>
          <SongItem data={data?.data} sm={true} style={'bg-main'}/>
          <div className="flex flex-col gap-1 pt-[15px] px-2 pb-[5px]">
            <span className="font-bold textsm">Tiếp theo</span>
            <span className="text-xs text-gray-500 flex gap-2">
              <span>Từ Playlist</span>
              <Link to={path.ALBUM_TITLE_PID}>
                <span className="text-main">{data?.data.title}</span>
              </Link>
            </span>
          </div>
          {playList?.map((item:any)=>{
            return <SongItem key={item.encodeId} data={item} sm={true}/>
          })}

        </Scrollbar>
      </div>)
      :
      (<div className='w-full flex flex-col'>
        <div>
          <Scrollbar style={{width: '100%', height: '80vh'}} >
          {recentSongs?.map((item: any)=> {
            return <SongItem key={item.encodeId} data={item} sm={true}/>
          })}
        </Scrollbar>
        </div>
        asdasdasd
      </div>)
      }
    </div>
  )
}

export default SideBarRight