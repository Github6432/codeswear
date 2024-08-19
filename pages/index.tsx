import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>CodesWear.com - wear the code</title>
        <meta name="description" content="CodesWear.com - wear the code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div >
          <h1>CodesWear.com - wear the code</h1>
        </div>
      </main>
    </>
  );
}
