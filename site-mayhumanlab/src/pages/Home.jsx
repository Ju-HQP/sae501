import Header from "../components/Header";

function Home() {

  return (
    <>
      <Header />
      <main className="flex flex-col items-center p-8">
        <h1 className="text-center my-6 font-bold text-2xl lg:text-4xl">
          Accueil
        </h1>
        <div className="w-full flex justify-end">
        </div>
      </main>
    </>
  );
}

export default Home;
