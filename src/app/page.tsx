import Head from 'next/head';
import Header from '../components/Header';
import Landing from '../components/Landing';
import Features from '../components/Features';

const Home = () => {
  return (
    <div>
      <Header />
      <Landing />
      
      <main className="container mx-auto ">
        <Features />
      </main>
      <footer className="bg-[#030712] pb-10 text-center">
        <div className='h-[1px] mb-10 bg-purple-800'></div>
        <nav>
          <a href="#" className="px-4">FAQ</a>
          <a href="#" className="px-4">About Us</a>
          <a href="#" className="px-4">Privacy Policy</a>
          <a href="#" className="px-4">Contact</a>
        </nav>
        <div className='mt-2'>
          <p className="text-white">©2024 opinionZ.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
