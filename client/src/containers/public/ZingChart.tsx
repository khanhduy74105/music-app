import { useEffect, useState, useRef } from 'react'
import bgChart from '../../assets/bg-chart.jpg'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { SongItem, SongList } from '../../components'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import path from '../../utils/path'
import icons from '../../utils/icons'
import { useQuery } from '@tanstack/react-query'
import { apiChart } from '../../apis'
import WeekRank from '../../components/WeekRank'
Chart.register(
  CategoryScale
)
const { BsPlayFill } = icons
const ZingChart = () => {

  useQuery({
    queryKey: ['api-chart'],
    queryFn: () => apiChart(),
    onSuccess: (data: any) => {
      setChartData(data?.data.data)
    }
  })
  const [chartData, setChartData] = useState<any>(null)
  const [data, setData] = useState<any>(null)
  const [selected, setSelected] = useState<any>()
  const chartRef: any = useRef()
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
        min: chartData?.RTChart?.chart?.minScore,
        max: chartData?.RTChart?.chart?.maxScore,
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
              setTooltipState((prev: any) => {
                return { ...prev, opacity: 0 }
              })
              return
            }
            return
          }
          const counters = []
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter((item: any) => +item.hour % 2 === 0).map((item: any) => item.counter),
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i]
            })

          }
          const rs = counters.find(i => i.data.some((n: number) => n === +tooltip.body?.[0].lines[0].replace('.', '')))
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
    const labels = chartData?.RTChart?.chart?.times?.filter((item: any) => +item.hour % 2 === 0).map((item: any) => `${item.hour}:00`)
    const datasets = []
    if (chartData?.RTChart?.chart?.times) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart.items)[i]].filter((item: any) => +item.hour % 2 === 0).map((item: any) => item.counter),
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
  }, [chartData])
  return (
    <div className="flex flex-col gap-4">
      <div className='px-[59px] mt-5 relative max-h-[400px] overflow-hidden'>
        <img src={bgChart} alt="" className='w-full rounded-m h-full' />
        <div className="absolute top-0 left-[59px] right-[59px] bottom-0 bg-gradient-to-t from-main-200 to-main-100 opacity-90"></div>
        <div className="absolute top-0 left-[59px] right-[59px] bottom-0">
          <Link to={`/${path.ZINGCHART_TITLE_ID}`} className={'flex items-center '}>
            <h3 className='font-bold text-4xl p-2 hover:text-main'>#zingchart</h3>
            <span className='p-2 rounded-full bg-main h-8 w-8 flex items-center'>
              <BsPlayFill size={18} />
            </span>
          </Link>
          <div className="flex gap-4 h-full justify-around items-center">
            <div className="w-full h-full relative">
              {data && <Line ref={chartRef} data={data} options={options} />}
              <div className="tooltip absolute" style={{ ...tooltipState }}>
                <SongItem data={chartData?.RTChart?.items.find((item: any) => item.encodeId === selected)} style={true} sm={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {chartData?.RTChart?.items.filter((_: any, index: any) => index < 10).map((item: any, idx: any) => (
          <SongList songData={item} isHideAlbum={false} artists={false} order={idx + 1} key={idx}/>
        ))}
      </div>
      <div className="mt-4 w-full mb-10 relative">
        <div className="w-full h-[600px] relative">
          <img src={bgChart} alt="" className='grayscale h-full w-full object-cover' />
          <div className="bg-[#4a3868c0] absolute top-0 bottom-0 right-0 left-0"></div>
        </div>
        <div className="absolute top-0 bottom-0 right-0 left-0 flex flex-col gap-2 px-[59px]">
          <h1 className="font-bold text-3xl py-4">Bảng xếp hạng tuần</h1>
          <div className="flex w-full items-start justify-between gap-4">
            <div className="flex-1">
              <WeekRank data={chartData?.weekChart?.vn} />
            </div>
            <div className="flex-1">
              <WeekRank data={chartData?.weekChart?.korea} />
            </div>
            <div className="flex-1">
              <WeekRank data={chartData?.weekChart?.us} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZingChart