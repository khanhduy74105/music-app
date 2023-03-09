import {useContext, useState} from 'react'
import { SongDetail } from '../context/songContext'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
const FormUser = () => {
    const {isOpenForm,setIsOpenForm} = useContext(SongDetail)
    const [isLogin, setIsLogin] = useState(true)
  return (
    <div className={`${!isOpenForm && 'hidden'} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#44295b] rounded-lg min-h-[60vh] w-[500px] flex flex-col items-center justify-center`}>
        <div className="absolute w-[40px] h-[40px] text-lg flex items-center justify-center cursor-pointer text-white rounded-tr-lg hover:bg-main-100 bg-transparent 0 top-0 right-0" onClick={()=>setIsOpenForm(false)}>
            x
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <h1 className='text-white mt-5'>{isLogin ? 'Đăng ký tài khoản?' : 'Đã có tài khoản?'} <span className='cursor-pointer italic px-1 hover:text-main' onClick={()=>setIsLogin((prev: boolean)=>!prev)}>{isLogin ? 'Đăng ký': 'Đăng nhập'}</span></h1>
    </div>
  )
}

export default FormUser