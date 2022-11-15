import Head from "next/head";
import InputImagesList from "../../components/input/InputImagesList.jsx";
import Navbar from "../../components/Navbar.jsx";

export default function Input({ images }) {
  return (
    <div>
      <Head>
        <title>Input Images</title>
        <meta name="description" content="input images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <InputImagesList images={images} />
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { dataset } = query;
  const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

  const res = await fetch(`${baseUrl}/api/input?dataset=${dataset}`);
  const { images } = await res.json();

  return {
    props: { images },
  };
};
