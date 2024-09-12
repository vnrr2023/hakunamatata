import Logo from './../assets/logo.png';

const Hero = () => {
  return (
    <div className='bg-gradient-to-r from-purple-500 to-pink-500' style={{ height: 'calc(100vh - 64px)' }}>
      <div className="flex justify-center pt-20">
        <img src={Logo} className='h-60 w-60' alt="CSGPT Logo" />
      </div>
      <div className='font-bold font-sans hover:font-mono text-white text-4xl pt-4 flex justify-center text-center'>
        CSGPT - THE REVOLUTIONARY AI
      </div>
      <span className='font-semibold font-serif text-white text-2xl pt-4 flex justify-center text-center md:text-xl'>
        Simple and easy-to-use application where you can get your answers quickly
      </span>
    </div>
  );
}

export default Hero;
