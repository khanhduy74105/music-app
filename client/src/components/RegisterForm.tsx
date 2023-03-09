import { useForm } from 'react-hook-form'
import { apiRegister } from '../apis'
import logo from '../assets/logo-dark.svg'
import { SongDetail } from '../context/songContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'
const RegisterForm = () => {
  const { setToken, setIsOpenForm } = useContext(SongDetail)
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const onSubmit = async (data: any) => {
    const res = await apiRegister({
      username: data.username,
      realname: data.realname,
      email: data.email,
      password: data.password
    })
    if (res.data.success) {
      localStorage.setItem("access_token", res.data.access_token)
      setToken(res.data.access_token)
      setIsOpenForm(false)
      toast.success("tạo tài khoản thành công!")
    }
  }
  return (
    <div className='w-full h-4/5 text-white flex justify-center items-center flex-col gap-6'>
      <h1 className='font-bold text-3xl text-center'>
        <img src={logo} alt="" className='w-[200px]' />
      </h1>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center justify-center'>
        <div className="flex gap-3 w-full justify-between">
          <label htmlFor="" className='text-lg capitalize font-semibold'>tài khoản</label>
          <input className='bg-main-100 h-8 w-72 rounded-md outline-none gap-2 p-1 border border-white' type="text" {...register('username', { required: { value: true, message: "Tài khoản không được trống" }, minLength: 6 })} />
        </div>
        <div className="flex gap-3 w-full justify-between">
          <label htmlFor="" className='text-lg capitalize font-semibold'>tên</label>
          <input className='bg-main-100 h-8 w-72 rounded-md outline-none gap-2 p-1 border border-white' type="text" {...register('realname', { required: { value: true, message: "Tên không được trống" } })} />
        </div>
        <div className="flex gap-3 w-full justify-between">
          <label htmlFor="" className='text-lg capitalize font-semibold'>email</label>
          <input className='bg-main-100 h-8 w-72 rounded-md outline-none gap-2 p-1 border border-white' type="email" {...register('email', { required: { value: true, message: "Email không được trống" } })} />
        </div>
        <div className="flex gap-3 w-full justify-between">
          <label htmlFor="" className='text-lg capitalize font-semibold'>mật khẩu</label>
          <input className='bg-main-100 h-8 w-72 rounded-md outline-none gap-2 p-1 border border-white' type="password" {...register('password', { required: { value: true, message: "Mật khẩu không được trống" }, minLength: 6 })} />
        </div>
        <div className="flex gap-3 w-full justify-between">
          <label htmlFor="" className='text-sm capitalize font-semibold'>xác nhận <br /> mật khẩu</label>
          <input className='bg-main-100 h-8 w-72 rounded-md outline-none gap-2 p-1 border border-white' type="password"
            {...register('cfpassword', {
              required: true, minLength: 6
              ,
              validate: (val: string) => {
                if (watch('password') != val) {
                  return "Your passwords do no match";
                }
              }
            })} />
        </div>
        <div className="flex gap-2 justify-end">
          {Object.entries(errors)?.[0] && <span className='flex-none text-xs p-0 text-red-300'>{Object.entries(errors)?.[0]?.[1]?.message as string}</span>}
        </div>

        <div>
          <button type='submit' className='px-2 py-1 rounded-md bg-main-100 text-white hover:opacity-70'>Đăng ký</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm