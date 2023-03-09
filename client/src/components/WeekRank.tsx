import { useNavigate } from 'react-router-dom'
import icons from '../utils/icons'
import SongItem from './SongItem'
const {BsPlayFill} =icons
const WeekRank = ({data}:  any) => {
  const navigate =useNavigate()
  return (
    <div className='flex bg-[#18181a5a] w-full rounded-lg flex-col'>
      <div className="flex items-center pl-3 mt-2">
            <h3 className='font-bold cursor-pointer text-2xl p-2 hover:text-main'>{data?.country === 'us' ? 'US - UK' : data?.country === 'vn' ? 'Việt Nam' :'Kpop'}</h3>
            <span className='p-2 rounded-full bg-main h-8 w-8 flex items-center'>
              <BsPlayFill size={18}/>
            </span>
      </div>
        <div className="flex w-full flex-col">
          {data?.items?.filter((_:any,idx:any)=>idx<=4).map((item:any,idx:any)=>(
            <SongItem data={item} order={idx+1} key={idx+1} sm/>
          ))}
        </div>
        <div className="text-center pb-6">
          <button className='rounded-l-full rounded-r-full px-6 py-1 border border-white bg-main-100' onClick={()=>navigate(data?.link?.split('.')[0])}>Xem tất cả</button>
        </div>
    </div>
  )
}

export default WeekRank