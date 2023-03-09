import { IconType } from 'react-icons/lib'
import icons from './icons'
const { MdOutlineLibraryMusic, TbChartArcs,TbChartCircles,MdOutlineFeed,IoMdRadio } = icons
type sidebarItem = {
    path: string,
    text: string,
    icon: IconType
}
export const sidebarMenu: sidebarItem[] = [
    {
        path: 'personal',
        text: 'Cá nhân',
        icon: MdOutlineLibraryMusic
    },
    {
        path: '',
        text: 'Khám phá',
        icon: TbChartArcs
    },
    {
        path: 'chart',
        text: '#zingchart',
        icon: TbChartCircles
    },
    {
        path: 'radio',
        text: 'Radio',
        icon: IoMdRadio
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: MdOutlineFeed
    },
]

export const searchItems: any[] = [
    {
        path: 'tat-ca',
        text: 'Tất cả',
    },
    {
        path: 'bai-hat',
        text: 'Bài hát',
    },
    {
        path: 'playlist',
        text: 'Playlist/Album',
    }
]