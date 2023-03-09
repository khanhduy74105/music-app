import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUserData } from '../apis'
import { SongDetail } from '../context/songContext'
import icons from '../utils/icons'
import path from '../utils/path'
const {BsFillPersonFill, MdOutlineLibraryMusic,MdOutlineLogout} = icons
const UserAcction = () => {
    const {user, setUser,logout} = useContext(SongDetail)
    const [open, setOpen] = useState(false)
    useEffect(()=>{
      const fetch = async ()=>{
        const res = await apiUserData()
        setUser(res?.data?.data)
       }
       fetch() 
    },[])
  return (
    <div className='flex gap-2 items-center cursor-pointer relative' onClick={()=>setOpen((prev:boolean)=> !prev)}>
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
        <BsFillPersonFill size={20}/>
      </div>
      <span className='italic select-none'>{user?.realname}</span>
      <ul className={`absolute top-full mt-2 right-0 border border-red-200 p-4 rounded-lg rounded-tr-none bg-main-100 ${!open && 'hidden'}`}>
        <Link className='hover:text-main flex items-center justify-start gap-2 pr-2 py-1 text-right' to={path.PERSONAL}>
          <MdOutlineLibraryMusic />
          Playlist
        </Link>
        <li className='hover:text-main flex items-center justify-start gap-2 pr-2 py-1 text-right' onClick={(e)=>{
          e.stopPropagation()
          logout()
        }}>
          <MdOutlineLogout />
          Logout
        </li>
      </ul>
    </div>
  )
}

export default UserAcction