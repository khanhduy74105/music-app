import { useQuery } from '@tanstack/react-query'
import {useEffect,useContext, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiSearch } from '../../apis'
import { Artist, SectionItem, SongItem, SongList } from '../../components'
import { SongDetail } from '../../context/songContext'
import { handleNumber } from '../../utils/fn'
const SearchAll = () => {
    const [searchParams] = useSearchParams();
    const {keyword, setKeyword} = useContext(SongDetail)
    const [data, setData] =useState<any>(null)
    useQuery({
        queryKey:['search', keyword],
        queryFn: ()=> apiSearch(keyword),
        onSuccess:(data:any)=>{
            setData(data.data.data)
        }
    })
    useEffect(()=>{
        setKeyword(searchParams.get('q'))
    },[searchParams])
    
  return (
    <div className='flex w-full flex-col px-[59px] pb-10'>
        <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Nổi bật</h3>
            <div className="text-lg flex gap-8">
                {data?.top && 
                <div className='flex flex-1 items-center gap-4 bg-[#8c4fa06e] hover:bg-[#edc5fba3] cursor-pointer p-2 rounded-md'>
                    <img src={data.top.thumbnail} alt="avatar" className={`h-[60px] w-[60px] object-cover ${data.top.objectType === 'artist' ? 'rounded-full' :'rounded-md'}`} />
                    <div className='flex flex-col gap-1'>
                        <span className='text-gray-400 text-xs'>{data.top.objectType === 'artist' ? 'Nghệ sĩ' :''}</span>
                        <span className='text-sm'>{data.top.title || data.top.name}</span>
                        <span className='text-[12px] text-gray-400'>{data.top.objectType === 'artist' && handleNumber(data.artists[0].totalFollow)} quan tâm</span>
                    </div>
                </div>}
                {data?.songs?.filter((item:any, index:any)=> [...Array<any>(2).keys()].some((i:any)=>i===index)).map((item: any)=>(
                    <div className="flex-1" key={item.encodeId}>
                        <SongItem  data={item} size='h-[60px] w-[60px]'/>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col mt-5">
            <h3 className="font-bold text-lg mb-4">Bài hát</h3>
            <div className="flex gap-2 flex-wrap w-full justify-between">
                {data?.songs?.map((item:any)=>(
                    <div className='w-[45%] ' key={item.encodeId}>
                        <SongList songData={item} isHideAlbum={true} artists={null}/>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col mt-5">
            <h3 className="font-bold text-lg mb-4">Playlist/Album</h3>
            <div className="flex items-start gap-5 mt-5">
                {data?.playlists?.filter((_:any, index:any)=>index<=4).map((item:any)=> {
                        return (
                            <SectionItem key={item.encodeId} item={item}/>
                        )
                    })}
            </div>
        </div>
        <div className="flex flex-col mt-5">
            <h3 className="font-bold text-lg mb-4">Nghệ sĩ</h3>
            <div className="flex items-start justify-start gap-5 mt-5">
                {data?.artists?.filter((_:any, index:any)=>index < 4).map((item:any,idx: any)=> {
                        return (
                            <Artist data={item} key={idx}/>
                        )
                    })}
            </div>
        </div>
    </div>
  )
}

export default SearchAll