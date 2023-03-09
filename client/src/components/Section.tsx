import SectionItem from './SectionItem';
const Section = ({data, smpadding}: any) => {
    return (
    <div className={`${smpadding ? 'px-[28px]' : 'px-[59px]'} mt-5 flex flex-col gap-5 w-full`}>
        <div className='flex justify-between'>
            <h1 className='font-bold text-lg'>{data?.title}</h1>
            <a href="">Tất Cả</a>
        </div>
        <div className='flex items-start gap-2 w-full'>
            {data?.items?.filter((_:any, index:any)=>index<=4).map((item:any)=> {
                return (
                    <SectionItem key={item.encodeId} item={item} />
                )
            })}
        </div>
    </div>
  )
}

export default Section