import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiAddPlaylist, apiRemoveFavPlaylist } from '../apis'
import icons from '../utils/icons'
const {AiOutlineHeart,BsPlayFill,HiOutlineDotsHorizontal,ImBin} =icons
const SectionItem = ({item,inPersonal}: any) => {
    const navigate = useNavigate()
    const handleClickBanner =(link:any)=>{
        const albumPath =link.split('.')[0]
        navigate(albumPath, {state: {playAlbum: false}})
    }
    const handleAddPlaylist = async (playlistId: any)=>{
        const res =await apiAddPlaylist({playlistId})
        if (res.status.toString()[0]==='2') {
            toast.success(res.data.message)
        }else{
            toast.warn(res.data.message)
        }
    }
    const handleRemovePlaylist = async (playlistId: any)=>{
        const res =await apiRemoveFavPlaylist({playlistId})
        if (res.status.toString()[0]==='2') {
            toast.success(res.data.message)
        }else{
            toast.warn(res.data.message)
        }
    }
  return (
    <div 
    key={item.encodeId}
    className=' flex flex-col gap-2 w-1/5 p-2'
    onClick={()=>handleClickBanner(item.link)}
>
    <div className="overflow-hidden cursor-pointer parent-overlay relative w-full rounded-md">
        <img src={item.thumbnailM} alt="" className='w-full h-auto  rounded-md'/>
        <div className="justify-around items-center child-overlay absolute hidden top-0 bottom-0 left-0 right-0 bg-overlay-20 rounded-md">
            <span
                onClick={(e)=>{
                    e.stopPropagation()
                    handleAddPlaylist(item.encodeId)
                }} 
                className='p-1 hover:bg-overlay-20 rounded-full'>
                <AiOutlineHeart size={26}/>
            </span>
            <span 
                onClick={(e)=>{
                    e.stopPropagation()
                    navigate(item.link.split('.')[0], {state: {playAlbum: true}})
                }}
            className='p-2 border rounded-full'>
                <BsPlayFill size={30} />
            </span>
            <span 
                onClick={(e)=>{e.stopPropagation()
                {inPersonal && handleRemovePlaylist(item.encodeId)}}} 
                className='p-1 hover:bg-overlay-20 rounded-full'>
                {inPersonal ? <ImBin size={22}/> :<HiOutlineDotsHorizontal size={26}/>}
            </span>
        </div>
    </div>
    {<span className='font-semibold'>{item?.title?.length > 18 ? `${item.title.slice(0, 17)}...` : item.title}</span>}
    <span className='text-xs cursor-default'>{item.sortDescription.slice(0, 50) || item.artistsNames}</span>
</div>
  )
}

export default SectionItem