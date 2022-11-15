import Head from "next/head";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Annotation Tool</title>
        <meta name="description" content="Keypoint annotation tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
      </main>
    </div>
  );
}
