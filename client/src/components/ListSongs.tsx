import SongList from './SongList'
import icons from '../utils/icons'
import moment from 'moment'
const {GoPrimitiveDot} = icons
type Songs = {
  songs: Array<any>,
  totalDuration: number
}
const ListSongs = ({songs, totalDuration}: Songs) => {
  return (
    <div className='w-full text-xs'>
      <div className='text-gray-400 flex justify-between items-center uppercase p-[10px] font-semibold'>
        <span>Bài hát</span>
        <span>Album</span>
        <span>Thời gian</span>
      </div>
      <div className='flex flex-col gap-1'>
        {songs?.map((song)=>{
          return <SongList isHideAlbum={false} songData={song} key={song.encodeId} artists={null}/>
        })}
      </div>
      <span className='flex items-center gap-2 p-2 border-t-[1px] border-main-100'>
        <span>{songs?.length} bài hát</span>
        <span><GoPrimitiveDot /></span>
        <span>{moment.utc(totalDuration * 1000).format('HH:mm')}</span>
      </span>
    </div>
  )
}

export default ListSongs