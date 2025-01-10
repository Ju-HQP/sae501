import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import ConnectionForm from "./ConnectionForm";
import { startConnecting } from "../features/user/userSlice";
import { selectUserIsConnected, selectUserIsConnecting } from "../features/user/userSelector";
import { logout } from "../features/user/connexion";

function Home() {
  const dispatch = useDispatch();

  // pour l'état de connexion (utilisateur connecté ou non)
  const isConnected = useSelector(selectUserIsConnected);

  // pour le Call to action de connexion
  const isConnecting = useSelector(selectUserIsConnecting);

  function handleConnecting() {
    dispatch(startConnecting()); //isModifying passe à true
  }

  const handleDisconnecting = async () => {
      dispatch(logout());
    };

  return (
    <>
      <Header />
      <main className='flex flex-col items-center p-8'>
      <h1 className="text-center my-6 font-bold text-2xl lg:text-4xl">
          Accueil
        </h1>
        <div className="w-full flex justify-end">
          { isConnected?
          <button
          onClick={handleDisconnecting}
          className=" text-white text-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center"
        >
          Déconnexion
        </button>
          :
          <button
            onClick={handleConnecting}
            className=" text-white text-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center"
          >
            Connexion
          </button>
}
        </div>
        {isConnecting && <ConnectionForm />}
      </main>
    </>
  );
}

export default Home;
