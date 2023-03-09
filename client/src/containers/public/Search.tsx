import {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {Outlet} from 'react-router-dom'
import { SongDetail } from '../../context/songContext'
import { searchItems } from '../../utils/menu'
import path from '../../utils/path'
const Search = () => {
  const {keyword} = useContext(SongDetail)
  return (
    <div>
        <div className="flex h-[50px] mb-6 items-center text-sm border-b border-gray-200 pl-[60px] pb-1">
            <span className="text-[24px] font-bold border-r border-gray-400 pr-3">Kết quả tìm kiếm</span>
            <div className="flex items-center h-full">
              {searchItems?.map((item:any)=>(
                <NavLink 
                  key={item.path}
                  to={`/${path.SEARCH}/${item.path}?q=${keyword.replace(' ','+')}`}
                  className={({isActive})=>`px-4 uppercase h-full flex items-center -mb-2 font-bold cursor-pointer ${isActive ? 'text-main border-b-main border-b-[2px]' :'hover:text-main'}`}
                >
                  {item.text}
                </NavLink>
              ))}
                
            </div>
        </div>
    <Outlet />
    </div>
  )
}

export default Search