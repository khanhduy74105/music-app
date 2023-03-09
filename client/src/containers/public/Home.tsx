import useFetchBannerHome from "../../getApis";
import { Slider as Sliderr, Section } from "../../components";
import { Artist, ChartSection, NewRelease } from "../../components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const Home = () => {
  const homes = useFetchBannerHome();
  const weekendMusic: any = homes.weekenMusics;
  const newEveryday: any = homes.newEveryday;
  const top100: any = homes.top100
  const hotArtist: any = homes.hotArtist
  const hAlbum: any = homes.hAlbum
  const weekChart: any = homes.weekChart
  const artists: any = homes.artists
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };
  return (
    <div className="overflow-y-auto w-full pb-32">
      <Sliderr />
      <Section data={weekendMusic} />
      <NewRelease />
      <Section data={newEveryday} />
      <div className="w-full px-[59px] flex flex-col gap-5 my-5">
        <h3 className="font-bold text-lg ">Spotlight </h3>
        <Slider {...settings} className={'w-full flex'}>
          {artists?.map((item: any) => (
            <div className='w-1/5' key={item.id}>
              <Artist data={item} />
            </div>
          ))}
        </Slider>
      </div>
      <Section data={top100} />
      <ChartSection />
      <Section data={hotArtist} />
      <div className="flex justify-between items-center px-[59px] w-full mt-12">
        {weekChart?.map((item: any, index: number) => {
          return (
            <Link to={item.link.split('.')[0]}
              className='w-[45%] md:w-[32%]'
              key={index}>
              <img src={item.cover} alt="" className="w-full rounded-md transition-all hover:scale-105" />
            </Link>
          )
        })}
      </div>
      <Section data={hAlbum} />
    </div>
  )
}

export default Home