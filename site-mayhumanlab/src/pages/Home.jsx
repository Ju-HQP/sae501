import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import ConnectionForm from "./ConnectionForm";
import { selectUserConnecting } from "../features/volunteer/volunteerSelector";
import { startConnecting } from "../features/volunteer/volunteerSlice";

function Home() {
  const dispatch = useDispatch();

  const isConnecting = useSelector(selectUserConnecting);

  function handleConnecting() {
    dispatch(startConnecting()); //isModifying passe à true
  }

  return (
    <>
      <Header />
      <main className='flex flex-col items-center p-8'>
      <h1 className="text-center my-6 font-bold text-2xl lg:text-4xl">
          Accueil
        </h1>
        <div className="w-full flex justify-end">
          <button
            onClick={handleConnecting}
            className=" text-white text-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center"
          >
            Connexion
          </button>
        </div>
        {isConnecting && <ConnectionForm />}
      </main>
    </>
  );
}

export default Home;
