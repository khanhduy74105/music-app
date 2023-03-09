import { useContext } from 'react'
import { SongDetail } from '../context/songContext'
import { useForm } from "react-hook-form"
import icons from '../utils/icons'
import logo from '../assets/logo-dark.svg'
import { Login } from '../apis'
const { BsGoogle } = icons
const LoginForm = () => {
  const { setIsOpenForm, setToken } = useContext(SongDetail)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (data: any) => {
    const res = await Login(data)
    if (res.status === 200) {
      setToken(res.data.access_token)
      localStorage.setItem("access_token", res.data.access_token)
      setIsOpenForm(false)
    }
  }

  return (
    <div className='w-full h-4/5 text-white flex justify-center items-center flex-col gap-6'>
      <h1 className='font-bold text-3xl text-center'>
        <img src={logo} alt="" className='w-[200px]' />
      </h1>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center justify-center'>
        <div className="flex gap-3">
          <label htmlFor="" className='text-lg capitalize font-semibold'>tài khoản </label>
          <input className='bg-main-100 w-72 rounded-md outline-none gap-2 p-1 border border-white' type="text" {...register('username', { required: true, minLength: 6 })} />
        </div>

        <div className="flex gap-3">
          <label htmlFor="" className='text-lg capitalize font-semibold'>mật khẩu</label>
          <input className='bg-main-100 w-72 rounded-md outline-none gap-2 p-1 border border-white' type="password" {...register('password', { required: true, minLength: 6 })} />
        </div>
        <div className="flex gap-2 justify-end">
          {errors.username && <span className='flex-none text-xs p-0 text-red-300'>Tài khoản sai định dạng</span>}
          {errors.password && <span className='flex-none text-xs p-0 text-red-300'>Mật khẩu sai định dạng</span>}
        </div>
        
        <div>
          <button type='submit' className='px-2 py-1 rounded-md bg-main-100 text-white hover:opacity-70'>Đăng nhập</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm