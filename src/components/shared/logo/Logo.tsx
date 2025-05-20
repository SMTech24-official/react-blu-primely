import logo from "@/assets/logo/logo.jpeg";
const Logo = () => {
  return (
    <div>
      <img
        src={logo}
        alt="Brand Logo"
        width={100}
        height={100}
        className="w-[250px] h-[130px]"
      />
    </div>
  );
};

export default Logo;
