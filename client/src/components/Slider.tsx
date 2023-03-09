import useFetchBannerHome from "../getApis";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Slider = () => {
  const homes = useFetchBannerHome();
  const banners: Array<any> = homes.getBanners?.items;
  const navigate = useNavigate()

  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;
    const interValId = setInterval(() => {
      for (let i = 0; i < sliderEls.length; i++) {
        const slideItem = sliderEls[i] as HTMLElement;
        slideItem.classList.remove(
          "animate-slide-right",
          "order-last",
          "order-first",
          "order-2",
          "animate-slide-left",
          "animate-slide-left2"
        );
        if (i <= max && i >= min) {
          if (i == max)
            slideItem.classList.add("animate-slide-right", "order-last");
          if (i < max && i > min)
            slideItem.classList.add("animate-slide-left2", "order-2");
          if (i == min)
            slideItem.classList.add("animate-slide-left", "order-first");
          slideItem.style.cssText = "display:block";
        } else {
          slideItem.style.cssText = "display:none";
        }
      }

      min += 1;
      max += 1;
      if (min === 4 && max === 6) {
        min = 0;
        max = 2;
      }
    }, 2000);
    return () => {
      interValId && clearInterval(interValId);
    };
  }, []);

  const handleClickBanner = (banner: any)=>{
    if (banner.type === 4) {
      const albumPath = banner?.link.split('.')[0]
      navigate(albumPath)
      
    }
  }
  return (
    <div className="max-w-full flex gap-4 px-[59px] pt-8 overflow-hidden">
      {banners?.map((banner: any, idx: any) => {
        return (
          <div key={banner.encodeId} 
            className="slide-left w-1/3 slider-item"
            onClick={()=>handleClickBanner(banner)}
          >
            <img src={banner.banner} alt="" className="w-full rounded-lg" />
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
