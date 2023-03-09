import { useQuery,  } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { getDetailSOng } from '../apis'
import storage from '../storage'
import axios from '../axios'
import setAuthToken from '../utils/setAuthToken'
type Props = {
    children: string | JSX.Element | JSX.Element[]
  }
export const SongDetail = createContext<any>(null)
const SongContextProvider = ({children}: Props) => {
  const [songId, setSongId] = useState<string>(storage.getCurrentSong()||'')
  const [playlistId, setPlaylistId] = useState<any>(null)
  const [atAlbum, setAtAlbum] = useState(false)  
  const [isPlaying, setIsPlaying] = useState(true)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [keyword, setKeyword] = useState<any>('')
  const [token, setToken] = useState<any>(storage.getToken())
  const [user, setUser] = useState<any>()
  const [recentSongs , setRecentSongs ] = useState(storage.getCurrentSongs()|| [])

  const logout = async ()=>{
    setToken(null)
    localStorage.removeItem('access_token')
    setUser(null)
    await axios({
      url:'/logout',
      method: 'post'
    })
    setAuthToken(null)
  }
  if (token) {
    setAuthToken(token)
  }
  useQuery({
    queryKey: ['songDetail', songId],
    queryFn: () => getDetailSOng(songId)
  })
  const songContextData = {
        songId,
        setSongId,
        atAlbum,
        setAtAlbum,
        playlistId,
        setPlaylistId,
        isPlaying,
        setIsPlaying,
        recentSongs,
        setRecentSongs,
        keyword,
        setKeyword,
        isOpenForm,
        setIsOpenForm,
        user,
        setUser,token, setToken,logout
    }
  useEffect(()=>{
      storage.setCurrentSong(songId)
  }, [songId])
  useEffect(()=>{
    if (recentSongs) {
      storage.setCurrentSongs(recentSongs)
    }
  }, [recentSongs])
  return (
    <SongDetail.Provider value={songContextData}>
        {children}
    </SongDetail.Provider>
  )
}

export default SongContextProvider