import Head from "next/head";
import OutputImagesList from "../../components/output/OutputImagesList.jsx";
import Navbar from "../../components/Navbar.jsx";

export default function Input({ images }) {
  return (
    <div>
      <Head>
        <title>Output Images</title>
        <meta name="description" content="input images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <OutputImagesList images={images} />
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { dataset } = query;
  const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

  const res = await fetch(`${baseUrl}/api/outputDatasets?dataset=${dataset}`);
  const { images } = await res.json();

  return {
    props: { images },
  };
};
