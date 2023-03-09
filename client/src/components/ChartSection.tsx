import { useEffect, useState, useRef } from 'react'
import { memo } from 'react'
import bgChart from '../assets/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import useFetchBannerHome from '../getApis'
import { CategoryScale } from 'chart.js'
import SongItem from './SongItem'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import icons from '../utils/icons'
const {BsPlayFill}  = icons
Chart.register(
  CategoryScale
)
const ChartSection = () => {
  const homes = useFetchBannerHome()
  const chart = homes.chart
  const rank = homes.rank
  const [data, setData] = useState<any>(null)
  const [selected, setSelected] = useState<any>()
  const chartRef:any = useRef()
  const [tooltipState, setTooltipState] = useState<any>({
    opacity: 0,
    top: 0,
    left: 0
  })
  const options: any = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 4,
    scales: {
      y: {
        ticks: { display: false },
        grid: {
          color: 'gray',
          drawTicks: false
        }
        ,
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 6] }
      },
      x: {
        ticks: { color: 'gray' },
        grid: {
          color: 'transparent'
        }
      }
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }: any) => {
          if (!chartRef || !chartRef.current) return
          if (tooltip.opacity === 0) {
            if (tooltipState.opacity !== 0) {
              setTooltipState((prev:any)=>{
                return {...prev, opacity: 0}
              })
              return
            }
            return
          }
          const counters = []
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]?.filter((item: any) => +item.hour % 2 === 0).map((item: any) => item.counter),
              encodeId: Object.keys(chart?.items)[i]
            })
            
          }
          const rs = counters.find( i =>i.data.some((n:number) => n ===+tooltip.body?.[0].lines[0].replace('.','')))
          setSelected(rs?.encodeId)
          const newTooltipData = {
            opacity: 1,
            top: tooltip.caretY,
            left: tooltip.caretX
          }
          if (!_.isEqual(tooltipState, newTooltipData)) {
            setTooltipState(newTooltipData)
          }
        }
      },

    },
    hover: {
      mode: 'dataset',
      intersect: false
    }
  }
  useEffect(() => {
    const labels = chart?.times?.filter((item: any) => +item.hour % 2 === 0).map((item: any) => `${item.hour}:00`)
    const datasets = []
    if (chart?.times) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart.items)[i]].filter((item: any) => +item.hour % 2 === 0).map((item: any) => item.counter),
          borderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
          tension: 0.2,
          borderWidth: 2,
          pointBackgroundColor: 'white',
          pointHoverRadius: 5,
          pointBorderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
          pointHoverBorderWidth: 3
        })
      }
    }

    setData({ labels, datasets })
  }, [chart])
  return (
    <div className='px-[59px] mt-5 relative max-h-[400px] overflow-hidden'>
      <img src={bgChart} alt="" className='w-full rounded-m h-full' />
      <div className="absolute top-0 left-[59px] right-[59px] bottom-0 bg-gradient-to-t from-main to-main-100 opacity-90"></div>
      <div className="absolute top-0 left-[59px] right-[59px] bottom-0">
        <Link to={path.ZINGCHART_TITLE_ID} className={'flex items-center'}>
          <h3 className='font-bold text-2xl p-2 hover:text-main'>#zingchart</h3>
          <span className='p-2 rounded-full hover:bg-[#27BD9C] h-8 w-8'>
            <BsPlayFill size={18}/>
          </span>
        </Link>
        <div className="flex gap-4 h-full justify-around items-center">
          <div className='w-[50%] xl:w-[30%] h-full flex flex-col gap-3'>
            {rank?.filter((_: any, index: number) => index < 3).map((item: any, idx: number) => {
              return (
                <SongItem key={item.encodeId} style={true} data={item} sm order={idx + 1} percent={Math.round(item.score * 100 / chart?.totalScore)} />
              )
            })}
          </div>
          <div className="w-[45%] xl:w-[65%] h-full relative">
            {data && <Line ref={chartRef} data={data} options={options} />}
            <div className="tooltip absolute" style={{...tooltipState}}>
              <SongItem data={rank?.find((item:any) =>item.encodeId === selected)} style={true}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartSection)