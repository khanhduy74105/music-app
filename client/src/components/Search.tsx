import icons from "../utils/icons"
import { useContext } from "react"
import { useNavigate, createSearchParams, useParams } from "react-router-dom"
import path from "../utils/path"
import { SongDetail } from "../context/songContext"
const {BsSearch,AiOutlineClose} =icons
const Search = () => {
  const navigate = useNavigate()
  const {keyword, setKeyword} = useContext(SongDetail)
  const {singer} = useParams()
  const handleScroll = ()=>{
    const scrollY = window.scrollY;
    console.log(scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  const handleSearch =async (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if (e.keyCode === 13 && keyword !== '') {
      navigate(
        {
          pathname :`/${path.SEARCH}/${path.ALL}`,
          search: createSearchParams({
            q: keyword
          }).toString()
        }
      )
    }
  }
  return (
    <div className={`flex items-center flex-auto h-10 min-w-[440px] rounded-full overflow-hidden ${singer ? 'border border-white bg-[#cbc6c654]': 'bg-[#2F2739]'}`}>
        <BsSearch className="text-lg mx-2"/>
        <input type="text" 
            className={`outline-none w-[90%] bg-transparent ${singer ? 'bg-transparent': 'bg-[#2F2739]'}`}
            placeholder="Tìm kiếm bài hát, Nghệ sĩ, lời bài hát"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyUp={e => handleSearch(e)}
        />
        {keyword !=='' && <AiOutlineClose size={20} className='mr-2 cursor-pointer' onClick={()=>setKeyword('')}/>}

    </div>
  )
}

export default Search