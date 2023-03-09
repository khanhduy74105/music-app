import axios from '../axios'
export const getHome = () => new Promise(async (resolve, rejects)=>{
    try {
        const data:any = await axios.get('/home')
        resolve(data.data.data.items)
    } catch (error) {
        rejects(error)
    }
})