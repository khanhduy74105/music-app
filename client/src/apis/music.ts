import axios from "../axios"
export const getSong = (id: string|null) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url:'/song',
            params: {
                id: id
            },
            method: 'get'
        })

        resolve(response?.data)
    } catch (error) {
        reject(error)
    }
    
})
export const getDetailSOng = (id: string|null) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url:'/infosong',
            params: {
                id: id
            },
            method: 'get'
        })

        resolve(response?.data)
    } catch (error) {
        reject(error)
    }
    
})

export const getDetailPlaylist = (id: string|undefined) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url:'/detailplaylist',
            params: {
                id: id
            },
            method: 'get'
        })

        resolve(response?.data)
    } catch (error) {
        reject(error)
    }
    
})

export const apiSearch = (keyword: string|undefined) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url:'/search',
            params: {
                keyword
            },
            method: 'get'
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiArtist = (name: string|undefined) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url:'/artist',
            params: {
                name
            },
            method: 'get'
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiArtistSongs = (id: string|undefined, page: string|undefined,count: string|undefined) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url:'/artistsong',
            params: {
                id,
                page,
                count
            },
            method: 'get'
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiChart = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url:'/charthome',
            method: 'get'
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})