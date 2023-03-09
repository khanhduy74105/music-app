import { useQuery } from "@tanstack/react-query"
import { NavLink, useParams } from "react-router-dom"
import { apiChart } from "../../apis"
import icons from "../../utils/icons"
import {useEffect, useState} from 'react'
import {  SongList } from "../../components"
import { Scrollbar } from "react-scrollbars-custom"
const {BsPlayFill}= icons
const WeekRankPage = () => {
  const [chartData, setChartData] = useState<any>(null)
  const [songs, setSongs] = useState<any>(null)
  const {title} = useParams()
    useQuery({
        queryKey: ['api-chart'],
        queryFn: () => apiChart(),
        onSuccess: (data: any) => {
          setChartData(Object.entries(data?.data.data?.weekChart))
        }
      })
    useEffect(()=>{ 
        if (title==='Bai-hat-Viet-Nam') {
            setSongs(chartData?.filter((item:any)=>item[0]==='vn')[0][1].items)
        }else if(title === 'Bai-hat-US-UK'){
            setSongs(chartData?.filter((item:any)=>item[0]==='us')[0][1].items)
        }else{
            setSongs(chartData?.filter((item:any)=>item[0]==='korea')[0][1].items)

        }
    },[title, chartData])
  return (
    <div className="flex flex-col h-full justify-end">
        <div className="flex items-center px-[59px]">
            <h3 className='font-bold text-4xl p-2 hover:text-main'>Bảng xếp hạng tuần</h3>
            <span className='p-2 rounded-full bg-main h-8 w-8 flex items-center'>
            <BsPlayFill size={18} />
            </span>
        </div>
        <div className="flex px-[59px]">
            {chartData?.map((item:any)=>(
                <NavLink to={item?.[1].link?.split('.')[0]} className={({isActive})=>`p-2 text-2xl font-bold uppercase hover:text-main ${isActive ? 'border-b-main border-b-[2px]' :''}`} key={item?.[0]}>
                    {item?.[0]==='vn' ? 'việt nam' : item?.[0]==='us' ? 'us/uk' : 'kpop'}
                </NavLink>
            ))}
        </div>
        <Scrollbar style={{width: '100%', height:'60vh'}}>
            <div className="flex flex-col gap-2">
                {songs?.map((item: any, idx:any)=>(
                    <div className="w-full" key={item.encodeId}>
                        <SongList songData={item}  isHideAlbum={false} order={idx+1}/>
                    </div>
                ))}
            </div>
        </Scrollbar>
    </div>
  )
}

export default WeekRankPage