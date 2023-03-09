import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getHome } from "../apis"
type Item = {
    sectionType: String,
    viewType: string,
    title: string,
    link: string,
    sectionId: string,
    chart: any,
    items: Array<{
        type:any,
        link:any,
        banner:any,
        cover: any,
    }> | [{
        all: any,
        vPop:any,
        others:any
    }]
        
    ,
    adId?:string,
    pageType?:string,

}
type Result = {
    getBanners: any,
    weekenMusics:any,
    newEveryday: any,
    hotArtist:any,
    top100:any,
    hAlbum:any,
    newRelease: any,
    weekChart:any,
    chart: any,
    rank:any,
    artists:any
}
const useFetchBannerHome = ()=>{
    const {data}: UseQueryResult<Item[], Error> = useQuery({
        queryKey: ['gethome'],
        queryFn: getHome,
    })
    const rs:Result = {
        getBanners: data?.find((item: Item) => item.sectionId ==='hSlider'),
        weekenMusics: data?.find((item: Item) => item.sectionId ==="hAutoTheme1"),
        newEveryday :data?.find((item: Item) => item.sectionId ==="hAutoTheme2"),
        hotArtist :data?.find((item: Item) => item.sectionId ==="hArtistTheme"),
        top100: data?.find((item: Item) => item.sectionId ==="h100"),
        hAlbum: {...data?.find((item: Item) => item.sectionId ==="hAlbum"), title: "Nhạc mới"},
        newRelease: data?.find((item: Item) => item.sectionType ==="new-release"),
        weekChart: data?.find((item: Item) => item.sectionType ==="weekChart")?.items,
        chart: data?.find((item: Item) => item.sectionId ==="hZC")?.chart,
        rank: data?.find((item: Item) => item.sectionId ==="hZC")?.items,
        artists: data?.find((item: Item) => item.sectionType ==="artistSpotlight")?.items,
    }
    return rs
}


export default useFetchBannerHome