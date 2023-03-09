import axios from '../axios'
import { getSong, getDetailSOng, getDetailPlaylist } from './music'
export const Login = async (data: any)=>{
    const res = await axios({
        url:'/user/login',
        method: 'post',
        data: data,
        headers: {
            'Content-type': 'application/json'
        }
    })

    return res
}
export const apiRegister = async (data: any)=>{
    const res = await axios({
        url:'/user/create',
        method: 'post',
        data: data
    })

    return res
}
export const apiUserData = async ()=>{
    const res = await axios({
        url:'/user/get-userdata',
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    })
    return res
}

export const apiAddFav = async (data: any)=>{
   try {
    const res = await axios({
        url:'/user/add-favorite-song',
        method: 'post',
        data:data,
        headers: {
            'Content-type': 'application/json'
        }
    })
    return res
   } catch (error:any) {
   }
}

export const apiRemoveFav = async (data: any)=>{
    const res = await axios({
        url:'/user/delete-favorite-song',
        method: 'delete',
        data:data,
        headers: {
            'Content-type': 'application/json'
        }
    })
    return res
}

export const apiGetFavSongs = async ()=>{
    const res = await axios({
        url:'/user/get-favorite-songs',
        method: 'get'
    })
    let ListPrm : Promise<any>[] = []
    if (res.data.songs) {
        res.data.songs.forEach((songId: any) => {
            ListPrm.push(new Promise(async (resolve, reject)=>{
                try {
                    const sourceRes: any = await getSong(songId)
                    const infoRes: any = await getDetailSOng(songId)
                    resolve({sourceRes: sourceRes.data, infoRes : infoRes.data})
                } catch (error) {
                    reject(error)
                }
            })

            )
        });
    }
    return Promise.all(ListPrm)
}

export const apiAddPlaylist = async (data: any)=>{
    const res = await axios({
        url:'/user/add-favorite-playlist',
        method: 'post',
        data:data,
        headers: {
            'Content-type': 'application/json'
        }
    })
    return res
}

export const apiRemoveFavPlaylist = async (data: any)=>{
    const res = await axios({
        url:'/user/delete-favorite-playlist',
        method: 'delete',
        data:data,
        headers: {
            'Content-type': 'application/json'
        }
    })
    return res
}

export const apiGetFavPlaylist = async ()=>{
    const res = await axios({
        url:'/user/get-favorite-playlists',
        method: 'get'
    })
    let ListPrm : Promise<any>[] = []
    if (res.data.playlists) {
        res.data.playlists.forEach((playlistId: any) => {
            ListPrm.push(new Promise(async (resolve, reject)=>{
                try {
                    const sourceRes: any = await getDetailPlaylist(playlistId)
                    resolve (sourceRes.data)
                } catch (error) {
                    reject(error)
                }
            })

            )
        });
    }
    return Promise.all(ListPrm)
}