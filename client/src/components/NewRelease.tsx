import {useEffect, useState} from 'react'
import useFetchBannerHome from '../getApis';
import SongItem from './SongItem';

const NewRelease = () => {
  const homes = useFetchBannerHome();
    const newReleaseList = homes.newRelease
    const [isActive, setIsActive] = useState(0)
    const [songs, setSongs] = useState([])
    useEffect(()=>{
        if (isActive === 0) {
            setSongs(newReleaseList?.items.all)
        }else if(isActive === 1 ){
            setSongs(newReleaseList?.items.vPop)
        }else{
            setSongs(newReleaseList?.items.others)
        }
    },[isActive])
  return (
    <div className='px-[59px] mt-5'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-lg'>{newReleaseList?.title}</h1>
            <a href="">Tất Cả</a>
        </div>
        <div className="flex items-center gap-5 mt-2">
            <button
                onClick={()=>setIsActive(0)} 
                className={`py-1 uppercase text-xs px-4 rounded-l-full rounded-r-full border-gray-500 ${isActive === 0 ? 'bg-main'  : `bg-transparent`} border`}>
                tất cả
            </button>
            <button
                onClick={()=>setIsActive(1)} 
                className={`py-1 uppercase text-xs px-4 rounded-l-full rounded-r-full border-gray-500 ${isActive===1 ? 'bg-main'  : `bg-transparent`} border`}>
                việt nam
            </button>
            <button
                onClick={()=>setIsActive(2)} 
                className={`py-1 uppercase text-xs px-4 rounded-l-full rounded-r-full border-gray-500 ${isActive===2 ? 'bg-main'  : `bg-transparent`} border`}>
                quốc tế
            </button>
        </div>
        <div className='flex flex-wrap w-full my-2'>
            {songs ? songs.map((item:any)=>{
                return (
                    <div className='w-[45%] md:w-[30%]' key={item.encodeId} >
                        <SongItem data={item}/>
                    </div>
                )
            }): newReleaseList?.items.all?.map((item:any)=>{
                return (
                    <div className='w-[45%] md:w-[30%]' key={item.encodeId} >
                    <SongItem data={item}/>
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default NewRelease