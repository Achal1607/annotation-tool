import Head from "next/head";
import DatasetImagesList from "../components/dataset/DatasetImagesList";
import Navbar from "../components/Navbar.jsx";

export default function Dataset({ data }) {
  return (
    <div>
      <Head>
        <title>Datasets</title>
        <meta name="description" content="datasets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <DatasetImagesList datasets={data.datasets} type={'output'}/>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const baseUrl = `${process.env.BASE_URL}:${process.env.PORT}`;
  const res = await fetch(`${baseUrl}/api/dataset?type=output`);
  const datasets = await res.json();
  return {
    props: { data: datasets },
  };
};
