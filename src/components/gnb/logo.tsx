import logo from '../../assets/logo.png'

const Logo: React.FC = () => {
  return (
    <div className="w-[4.4%] absolute left-[2%] top-[10%] bottom-[10%] flex items-center justify-center rounded-full bg-gray-200">
      <img src={logo} alt="Logo" className="" />
    </div>
  );
};

export default Logo;
