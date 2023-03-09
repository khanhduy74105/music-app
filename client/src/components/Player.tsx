
import { useContext, useEffect, useRef, useState } from 'react'
import icons from "../utils/icons"
import { SongDetail } from "../context/songContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import moment from 'moment'
import { getDetailSOng, getSong } from '../apis'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'
const { SlVolumeOff,SlVolume2,SlVolume1, AiFillHeart, AiOutlineHeart, HiOutlineDotsHorizontal,
    MdSkipPrevious, MdSkipNext, CiRepeat,BsMusicNoteList, CiShuffle, BsPlayFill, BsPauseFill, TbRepeatOnce } = icons
var intervalId: any = 0

const Player = ({setShowRightSidebar}:any) => {
    const { songId, atAlbum, playlistId, setSongId, isPlaying, setIsPlaying } = useContext(SongDetail)
    const [isShuffle, setIsShuffle] = useState(false)
    const [isRepeatMode, setIsRepeatMode] = useState(0)
    const [audio, setAudio] = useState(new Audio())
    const thumbRef: any = useRef()
    const trackRef: any = useRef()
    const audioRef: any = useRef()
    const [currenSeconds, setCurrenSeconds] = useState(0)
    const [songInfo, setSongInfo] = useState<any>()
    const [volume, setVolume] = useState(100)
    const playlistData: any = useQueryClient().getQueryData(['detail-playlist', playlistId])

    const useSource = useQuery<any>({
        queryKey: ['songSource', songId],
        queryFn: () => getSong(songId),
        onSuccess: (data) => {
            if (data?.err === 0) {
                if (data?.data?.['128']) {
                    setAudio(new Audio(data?.data?.['128']))
                    audio.load()
                }
            } else {
                audio.pause()
                setAudio(new Audio())
                toast.warn(data?.msg)
                setCurrenSeconds(0)
                handleNextSong()
            }
        }
    })
    useQuery<any>({
        queryKey: ['songDetail', songId],
        queryFn: () => getDetailSOng(songId),
        onSuccess: (data) => {
            setSongInfo(data?.data)
        }
    })
    const onHandlePlaying = () => {
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }
    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.currentTime = 0
        if (songInfo?.duration) {
            if (isPlaying) {
                audio.play()
            } else {
                audio.pause()
            }
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurrenSeconds(audio.currentTime)
                if (isRepeatMode === 0) {
                    if (audio.ended) {
                        setIsPlaying(false)
                    }
                }
            }, 200)
        }

        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [audio, songInfo])
    const handleClickProcess = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        audio.currentTime = (percent * songInfo.duration) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setCurrenSeconds(Math.round(percent * songInfo.duration / 100))
    }
    const handlePrevSong = () => {
        if (playlistData?.data?.song.items) {
            playlistData?.data?.song.items.forEach((item: any, index: number) => {
                if (item.encodeId === songId && index !== 0) {
                    setSongId(playlistData?.data?.song.items[index - 1]?.encodeId)
                }
            })
        }

    }
    const handleNextSong = () => {
        if (playlistData?.data?.song.items) {
            playlistData?.data?.song.items.forEach((item: any, index: number) => {
                if (item.encodeId === songId && index !== playlistData?.data?.song.items.length - 1) {
                    setSongId(playlistData?.data?.song.items[index + 1]?.encodeId)
                }
            })
        }
    }
    const handleVolume =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setVolume(Number(e.target.value))
        audio.volume = Number(e.target.value) / 100
    }
    useEffect(() => {
        if (isShuffle) {
            audio.addEventListener('ended', function () {
                if (playlistData?.data?.song.items) {
                    const randomIndex = Math.round(Math.random() * playlistData?.data?.song.items.length) - 1
                    setSongId(playlistData?.data?.song.items[randomIndex].encodeId)
                }
            })
        }
        return () => {
            audio.removeEventListener('ended', function () {
                if (playlistData?.data?.song.items) {
                    const randomIndex = Math.round(Math.random() * playlistData?.data?.song.items.length) - 1
                    setSongId(playlistData?.data?.song.items[randomIndex].encodeId)
                }
            })
        }
    }, [isShuffle])
    useEffect(() => {
        const handleEnd = () => {
            if (isRepeatMode === 1) {
                audio.currentTime = 0
                audio.play()
            }
            if (isRepeatMode === 2) {
                handleNextSong()
            }

        }
        if (isRepeatMode) {
            audio.addEventListener('ended', handleEnd)
        }

        return () => {
            audio.removeEventListener('ended', handleEnd)
        }
    }, [isRepeatMode])
    useEffect(()=>{
        audioRef.current.style.cssText = `right: ${100 - volume}%`
    },[volume])
    return (
        <div className="bg-main-300 h-full px-5 flex">
            <div className="flex w-[30%] items-center gap-3">
                <img src={songInfo?.thumbnail}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col">
                    <span className="font-serif text-sm">
                        {songInfo?.title}
                    </span>
                    <span className="text-gray-500 text-[12px]">{songInfo?.artistsNames}</span>
                </div>
                <div className="flex gap-4">
                    <span>
                        <AiFillHeart size={16} />
                        {/* <AiOutlineHeart /> */}
                    </span>
                    <span>
                        <HiOutlineDotsHorizontal size={16} />
                    </span>
                </div>
            </div>
            <div className="w-[40%] gap-2 flex-auto justify-center items-center flex flex-col">
                <div className="flex pt-1 items-center gap-6 justify-center">
                    <span
                        onClick={() => setIsShuffle(!isShuffle)}
                        className={!atAlbum ? 'text-gray-500 p-2' : isShuffle ? 'p-2 text-main cursor-pointer' : 'cursor-pointer hover:bg-main-100 p-2 rounded-full'} title="Bật phát ngẫu nhiên">
                        <CiShuffle size={24} />
                    </span>
                    <span
                        onClick={handlePrevSong}
                        className={!atAlbum ? 'text-gray-500 p-2' : 'cursor-pointer hover:bg-main-100 p-2 rounded-full'}>
                        <MdSkipPrevious size={24} />
                    </span>
                    <span className="cursor-pointer hover:text-main p-1 border border-gray-700 rounded-full"
                        onClick={() => onHandlePlaying()}>
                        {useSource?.isFetching ? (
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="32"
                                visible={true}
                            />
                        ) : isPlaying ? <BsPauseFill size={32} /> : <BsPlayFill size={32} />}
                    </span>
                    <span
                        onClick={handleNextSong}
                        className={!atAlbum ? 'text-gray-500 p-2' : 'cursor-pointer hover:bg-main-100 p-2 rounded-full'}>
                        <MdSkipNext size={24} />
                    </span>
                    <span
                        onClick={() => {
                            atAlbum && setIsRepeatMode((prev: number) => {
                                return prev === 2 ? 0 : prev + 1
                            })
                        }}
                        className={!atAlbum ? 'text-gray-500 p-2' : isRepeatMode ? 'p-2 text-main cursor-pointer' : 'cursor-pointer hover:bg-main-100 p-2 rounded-full'} title="Bật phát tất cả">
                        {isRepeatMode === 1 ? <TbRepeatOnce size={24} /> : <CiRepeat size={24} />}
                    </span>
                </div>
                <div className="w-full flex gap-2 justify-center items-center">
                    <div>
                        <span className='text-xs'>
                            {moment.utc(currenSeconds * 1000).format('mm:ss')}
                        </span>
                    </div>
                    <div
                        ref={trackRef}
                        className="relative m-auto w-3/4 bg-main h-1 rounded-full player-thumb"
                        onClick={e => handleClickProcess(e)}
                    >
                        <div ref={thumbRef} className="absolute top-0 left-0 bg-white h-full rounded-full">
                            <span className='player-point'></span>
                        </div>
                    </div>
                    <div>
                        <span className='text-xs'>
                            {moment.utc(songInfo?.duration * 1000).format('mm:ss')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex-auto w-[30%] flex items-center gap-3 justify-end">
                <div className="flex gap-2 items-center">
                    <span 
                    onClick={()=>{
                        if (volume!==0) {
                            setVolume(0)
                            audio.volume = 0
                        }else{
                            setVolume(100)
                            audio.volume = 1
                        }
                    }}
                    className='p-2 hover:bg-main-100 rounded-full'>
                        {volume === 0 ?<SlVolumeOff /> : volume > 50 ?<SlVolume2 /> :<SlVolume1 /> }
                    </span>
                    <div className="relative">
                        <div className="h-1 bg-red-200 w-32 relative volThumb">
                            <div ref={audioRef} className={`absolute top-0 bottom-0 left-0 h-full bg-main volTrack rounded-md`}>
                                <span className='p-[6px] bg-main absolute top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full right-0 hidden'></span>
                            </div>
                            <input 
                                className='w-32 opacity-0 cursor-pointer absolute right-0 top-0 bottom-0 left-0'
                                type="range" 
                                step={1} 
                                min={0} 
                                max={100}
                                value={volume}
                                onChange={(e)=>handleVolume(e)}
                            />
                        </div>
                    </div>
                </div>
                <span
                onClick={()=>setShowRightSidebar((prev:boolean) => !prev)}
                    className='p-2 cursor-pointer rounded-md bg-main-100 opacity-80 hover:opacity-100'>
                    <BsMusicNoteList />
                </span>
            </div>
        </div>
    )
}

export default Player