import Head from "next/head";

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
          <div className="mx-6">This is Test 1</div>
          <div className="mx-40 bg-green-800">This is Test 2</div>
        </div>
      </main>
    </>
  );
}
