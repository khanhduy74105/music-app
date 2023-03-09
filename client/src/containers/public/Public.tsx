import {Outlet, useParams} from 'react-router-dom' 
import {useState} from 'react'
import { Header, Player, SideBarLeft, SideBarRight } from '../../components'
import { Scrollbar } from 'react-scrollbars-custom'

const Public = () => {
  const [ShowRightSidebar, setShowRightSidebar] = useState(true)
  const {singer} = useParams()

  return (
    <div className='relative w-full flex flex-col bg-main-200 text-white h-screen'>
        <div className="w-full h-full flex">
          <div className='w-[240px]'>
              <SideBarLeft />
          </div>
          <div className='flex-auto flex flex-col relative'>
              <div className={`mb-5 flex-none h-[70px] px-[59px] flex items-center absolute z-10 right-0 top-0 left-0 ${singer ? 'bg-transparent': 'bg-main-200'}`}>
                <Header />
              </div>
              {!singer && <div className='w-full h-[70px]'></div>}
              <div className="flex-auto w-full">
                <Scrollbar style={{ width: '100%', height: '80vh' }} color={'red'}>
                  <Outlet />
                </Scrollbar>
              </div>
          </div>
          {ShowRightSidebar && <div className='w-[329px] flex-none hidden 1400:block animate-slide-left'>
              <SideBarRight />
          </div>}
        </div>
        <div className='fixed bottom-0 right-0 left-0 h-[90px]'>
            <Player setShowRightSidebar={setShowRightSidebar}/>
        </div>
    </div>
  )
}

export default Public
