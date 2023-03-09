const setCurrentSong = (id: string)=>{
    localStorage.setItem("currentSong", id)
}
const getCurrentSong= () => localStorage.getItem('currentSong')

const setCurrentSongs = (songs: any)=>{

    if (songs) {
        localStorage.setItem("currentSongs", JSON.stringify(songs))
    }
}
const getCurrentSongs = ()=>{
    const songs = localStorage.getItem('currentSongs')
   if (songs) {
    return JSON.parse(songs)
   }
   return null
}

const setToken = (access_token: any)=>{
    localStorage.setItem("access_token", access_token)
}

const getToken = ()=>{
    return localStorage.getItem("access_token")
}

export default {setCurrentSong, getCurrentSong,setCurrentSongs,getCurrentSongs,setToken,getToken}