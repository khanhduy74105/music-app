import { useNavigate } from "react-router-dom"
import { SongDetail } from "../context/songContext"
import icons from "../utils/icons"
import Search from "./Search"
import {useContext} from 'react'
import UserAcction from "./UserAcction"
const { AiOutlineArrowRight, AiOutlineArrowLeft,BsFillPersonFill } = icons
const Header = () => {
  const navigate = useNavigate()
  const {setIsOpenForm, token, user} = useContext(SongDetail)
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <span className="w-[30px] h-[30px] rounded-full hover:bg-main-100 cursor-pointer flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <AiOutlineArrowLeft className="text-2xl" />
          </span>
          <span className="w-[30px] h-[30px] rounded-full hover:bg-main-100 cursor-pointer flex items-center justify-center"
            onClick={() => navigate(+1)}
          >
            <AiOutlineArrowRight className="text-2xl" />
          </span>
        </div>
        <div>
          <Search />
        </div>
      </div>
      {!token ? <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center" onClick={()=>setIsOpenForm(true)}>
        <BsFillPersonFill size={24}/>
      </div> : <UserAcction />}
    </div>
  )
}

export default Header