import Head from 'next/head';
import Header from '../components/Header';
import Landing from '../components/Landing';
import Features from '../components/Features';

const Home = () => {
  return (
    <div>
      <Head>
        <title>opinionZ.com | Share Your Opinions Anonymously</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Add meta tags for SEO */}
      </Head>
      <Header />
      <Landing />
      <main className="container mx-auto px-4">
        <Features />
      </main>
      <footer className="bg-gray-950 py-8 text-center">
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
