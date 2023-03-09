import { useQuery } from "@tanstack/react-query"
import { Link, useLocation, useParams } from "react-router-dom"
import { apiAddPlaylist, getDetailPlaylist } from "../../apis"
import {useState,useContext, useEffect} from "react"
import moment from "moment"
import { ListSongs } from "../../components"
import { Scrollbar } from "react-scrollbars-custom"
import {SongDetail} from '../../context/songContext'
import { Audio,CirclesWithBar } from "react-loader-spinner"
import icons from "../../utils/icons"
import { toast } from "react-toastify"
const {BsPlayFill, BsMusicNoteList} = icons
const Album = () => {
    const {id} = useParams()
    const location = useLocation()
    const [playlistData, setPlaylistData] = useState<any>({})
    const {setPlaylistId, setAtAlbum,setSongId, isPlaying, setIsPlaying} = useContext(SongDetail)
    const detailPlaylist = useQuery({
        queryKey: ['detail-playlist', id],
        queryFn: ()=>getDetailPlaylist(id),
        onSuccess: (data: any) => {
            if(data.err === 0){
                setPlaylistData(data.data)
                setPlaylistId(id)
                setAtAlbum(true)
            }
        }
    })
    const handleAddPlaylist = async (playlistId: any)=>{
        const res =await apiAddPlaylist({playlistId})
        if (res.status.toString()[0]==='2') {
            toast.success(res.data.message)
        }else{
            toast.warn(res.data.message)
        }
    }
    useEffect(() => {
      if (location.state?.playAlbum && playlistData?.song?.items) {
        const randomSong = Math.round(Math.random() * playlistData?.song?.items.length) - 1
        setSongId(playlistData?.song?.items?.[randomSong].encodeId)
        setIsPlaying(true)
    }
    
      return () => {
        
      }
    }, [id,playlistData])
  return (
        <div className="flex gap-6 w-full px-[59px] relative">
            <div className="gap-2 flex flex-col items-center flex-none w-1/4">
                <div className="w-full relative ">
                    <img src={playlistData?.thumbnail} 
                        className={`w-full hover:scale-105 object-contain ${isPlaying ? `rounded-full animate-rotate-center` : 'animate-rotate-center-pause rounded-md'} shadow-md transition-all`}
                        alt="thumbnail" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center hover:bg-overlay-20">
                        <span className="border border-white rounded-full p-2">
                            {isPlaying ? <Audio
                            height="26"
                            width="26"
                            color="white"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                            
                        /> : <BsPlayFill size={36} />}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <h3 className="text-lg font-bold">
                        {playlistData?.title}
                    </h3>
                    <div className="text-gray-400 text-xs flex flex-col items-center gap-1">
                        <span className="">Cập nhật: {moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}</span>
                        <div className="flex flex-wrap gap-x-2 gap-y-[1px] py-1 items-center justify-center">{playlistData?.artists?.map((item:any,
                        ind: any)=>(
                            <Link to={item.link} className="w-fit border-b-[1px] border-transparent hover:border-main hover:text-main py-1 box-border" key={item.id}>
                                {item.name}
                                {++ind < playlistData.artists.length && ','}
                            </Link>
                        ))}</div>
                        <span>{Math.round(playlistData?.like / 1000)}k người yêu thích</span>
                    </div>
                </div>

                <button 
                    onClick={()=>handleAddPlaylist(id)}
                    className="flex gap-2 px-2 py-[2px] hover:bg-main rounded-l-full rounded-r-full bg bg-main-100 items-center border-main border">
                    <BsMusicNoteList />
                    Thêm playlist
                </button>
            </div>
            <Scrollbar style={{width: '100%', height: '76vh'}} className="flex-auto">
                <div className="">
                    <span className="text-sm">
                        <span className="text-gray-600">Lời tựa: </span>
                        <span>{playlistData?.sortDescription}</span>
                    </span>
                    <div>
                        <ListSongs songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration}/>
                    </div>
                </div>
            </Scrollbar>
            {detailPlaylist.isFetching && <div className="absolute top-0 right-0 left-0 bottom-0 bg-main-200 flex items-center justify-center">
                <CirclesWithBar
                    height="100"
                    width="100"
                    color="purple"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    outerCircleColor="purple"
                    innerCircleColor="purple"
                    barColor=""
                    ariaLabel='circles-with-bar-loading'
                />
            </div>}

        </div>
  )
}

export default Album