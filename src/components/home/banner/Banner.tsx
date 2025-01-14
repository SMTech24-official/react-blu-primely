import banner1 from "@/assets/banner/garena-free-fire_734y.jpg"
import banner2 from "@/assets/banner/apex-media-news-saviors-patch-keyart.jpg.adapt_.crop16x9.431p.jpg"
import banner3 from "@/assets/banner/fortnite-og-social-1920x1080-a5adda66fab9.jpg"
import banner4 from "@/assets/banner/BO6_LP-meta_image.jpg"
import banner5 from "@/assets/banner/pubg-battlegrounds-9i69f.jpg"
import banner6 from "@/assets/banner/uncharted.jpg"
import MobileBanner from './MobileBanner';
import PrimaryButton from "../../shared/primaryButton"
import SecondaryButton from "../../shared/secondaryButton"

const Banner = () => {

  const banner = [banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,]
  return (
    <div className="relative  ">
      <div className="css_bg opacity-[26%] absolute w-full z-0 h-full"></div>
      <div className="container section-gap">
        <div className="flex flex-col gap-4 items-center justify-between z-20 relative">
          <h1 className="text-4xl md:text-5xl text-center font-bold text-white uppercase">
            Welcome to Blu Primal Tournaments
          </h1>
          <h6 className="text-center">
            Join the ultimate gaming competition with global players and clans
          </h6>
          <div className="flex items-center justify-end space-x-4 relative">
            <PrimaryButton
              parent="rounded-md lg:block hidden"
              child="rounded-md px-10"
            >
              <button className="">Sign In</button>
            </PrimaryButton>
            <SecondaryButton parent="rounded-md" child="rounded-md px-10">
              <p className="">Join Free</p>
            </SecondaryButton>
          </div>
        </div>
        <div className="mt-14 relative hidden md:block overflow-hidden">
          <div className="grid grid-cols-4 grid-rows-3  h-full">
            <div className=" w-full h-full overflow-hidden">
              <img
                src={banner1}
                alt="Image 1"
                width={1200}
                height={1200}
                className="object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 relative w-full h-[200px] lg:h-[300px] "
              />
            </div>
            <div className=" w-full h-full overflow-hidden">
              <img
                src={banner2}
                alt="Image 2"
                width={1200}
                height={1200}
                className="object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 relative w-full h-[200px] lg:h-[300px] "
              />
            </div>
            <div className=" w-full h-full col-span-2 overflow-hidden">
              <img
                src={banner3}
                alt="Image 3"
                width={1200}
                height={1200}
                className="object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 relative w-full h-[200px] lg:h-[300px] "
              />
            </div>
            <div className=" w-full h-full col-span-2 row-span-2 overflow-hidden">
              <img
                src={banner4}
                alt="Image 4"
                width={1200}
                height={1200}
                className="object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 relative w-full h-[400px] lg:h-[600px] "
              />
            </div>
            <div className=" w-full h-full row-span-2 overflow-hidden">
              <img
                src={banner5}
                alt="Image 5"
                width={1200}
                height={1200}
                className="object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 relative w-full h-[400px] lg:h-[600px] "
              />
            </div>
            <div className=" w-full h-full row-span-2 overflow-hidden">
              <img
                src={banner6}
                alt="Image 6"
                width={1200}
                height={1200}
                className="object-cover hover:cursor-pointer hover:scale-105 transition-all duration-300 relative w-fit h-[400px] lg:h-[600px] "
              />
            </div>
          </div>
        </div>
        <div className="block md:hidden mt-10">
          <MobileBanner banner={banner} />
        </div>
      </div>
    </div>
  );
};

export default Banner;