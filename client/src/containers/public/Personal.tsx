import { useQuery } from '@tanstack/react-query'
import React, { useState, useContext } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { apiGetFavPlaylist, apiGetFavSongs } from '../../apis'
import { SectionItem, SongList } from '../../components'
import { SongDetail } from '../../context/songContext'
import icons from '../../utils/icons'
const { BsPlayFill } = icons
const Personal = () => {
  const { user } = useContext(SongDetail)
  const [favSongs, setFavSongs] = useState<any>()
  const [favPlaylists, setFavPlaylists] = useState<any>()
  const [selected, setSelected] = useState('bh')
  const Tabs = [{
    field: 'bh',
    text: 'Bài hát'
  }, {
    field: 'pl',
    text: 'Playlist'
  }]
  useQuery({
    queryKey: ['fav-songs'],
    queryFn: () => apiGetFavSongs(),
    onSuccess: (data: any) => {
      setFavSongs(data)
    }
  })
  useQuery({
    queryKey: ['fav-playlist'],
    queryFn: () => apiGetFavPlaylist(),
    onSuccess: (data: any) => {
      setFavPlaylists(data)
    },
  })

  return user ? (
    <div className='flex flex-col'>
      <div className="flex items-center px-[59px]">
        <h3 className='font-bold text-4xl p-2 hover:text-main'>Thư viện</h3>
        <span className='p-2 rounded-full bg-main h-8 w-8 flex items-center'>
          <BsPlayFill size={18} />
        </span>
      </div>
      <div className="flex px-[59px]">
        {Tabs.map((item: any, idx: any) => (
          <div className={`text-xl font-semibold px-2 ${selected === item.field && 'border-b-2 border-main'} hover:text-main cursor-pointer`}
            onClick={() => setSelected(item.field)}
            key={idx}>
            {item.text}
          </div>
        ))}
      </div>

      {selected === 'bh' ? <div className="flex px-[59px] flex-col pt-6 gap-2">
        {favSongs?.map((item: any) => (
          <SongList songData={item.infoRes} inPersonal key={Math.random()} />
        ))}
      </div> : <div className="flex px-[59px] pt-6 flex-wrap">
        {favPlaylists?.map((item: any) => (<SectionItem item={item} key={item.encodeId} inPersonal/>))}
      </div>}


    </div>
  ) : <Navigate to={'/'} />
}

export default Personal