import { sidebarMenu } from "../utils/menu"
import {NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from "../utils/path"
import logo from '../assets/logo-dark.svg'
const notActiveStyle = 'py-2 px-[25px] text-[#dadada] flex gap-2 justify-start items-center'
const activeStyle = 'relative after:left-0 after:absolute after:contents-[""] after:w-full after:border-l-2 after:border-[#9b4de0] after:bg-[#c9acda42] after:h-full py-2 px-[25px] flex text-white gap-2 justify-start items-center '
const SideBarLeft = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full bg-main-100 h-full">
      <div className="w-full cursor-pointer h-[70px] py-[15px] pl-[25px] flex justify-start items-center"
        onClick={()=>navigate(`/${path.HOME}`)}
      >
        <img 
          src={logo}
          alt="logo" 
          className="w-[120px] h-10"
        />
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item)=> {
          return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive})=>isActive ?  activeStyle: notActiveStyle}
          >
            <item.icon className="text-2xl"/>
            <span className="font-bold text-[14px]">{item.text}</span>
          </NavLink>)
        })}
      </div>
    </div>
  )
}

export default SideBarLeft