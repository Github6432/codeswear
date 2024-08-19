import Head from "next/head";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>CodesWear.com - wear the code</title>
        <meta name="description" content="CodesWear.com - wear the code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex justify-center">
        <Image src="/assets/slide7.png" alt="slide7.png" width={800} height={40} />
      </div>
      <main >
      </main>
      <Footer />
    </>
  );
}
