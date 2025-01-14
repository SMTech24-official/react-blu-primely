import FeaturedSlider from './FeaturedSlider';

const FeatureTournments = () => {
  return (
    <div className="section-gap">
      <div className="space-y-5 container">
        <h1 className="text-4xl md:text-5xl text-start font-bold text-white uppercase">
          Featured Tournaments
        </h1>
        <h6 className="text-start capitalize">
          Join the Battle for Ultimate Supremacy
        </h6>
      </div>
      <div className="lg:my-20 my-14">
        <FeaturedSlider />
      </div>
    </div>
  );
};

export default FeatureTournments;