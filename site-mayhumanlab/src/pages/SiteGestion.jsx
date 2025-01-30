import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import ActualiteForm from "../components/formulaires/ActualiteForm";
import { selectEditActu, selectLoadingActu } from "../features/actualite/actualiteSelector";
import { loadActus } from "../features/actualite/actualiteAsyncAction";
import { useEffect, useState } from "react";
import { selectSortedActusByReleaseDate } from "../features/actualite/actualiteSelector";
import { startEditActu } from '../features/actualite/actualiteSlice';
import { deleteActu } from "../features/actualite/actualiteAsyncAction";
import ActualiteRow from "../components/ActualiteRow";
import { selectEditProject, selectLoadingProject, selectSortedProjectsByTitle } from "../features/project/projectSelector";
import { deleteProject, loadProjects } from "../features/project/projectAsyncAction";
import ProjectForm from "../components/formulaires/ProjectForm";
import { startEditProject } from "../features/project/projectSlice";
import ProjectRow from "../components/ProjectRow";
import Footer from "../components/Footer";

function SiteGestion(){
    
  const dispatch = useDispatch();  
  const [width, setWidth] = useState(window.innerWidth);

  const editActu = useSelector(selectEditActu);
  const loadingActu = useSelector(selectLoadingActu);
  const listeActualite = useSelector(selectSortedActusByReleaseDate);

  const editProject = useSelector(selectEditProject);
  const loadingProject = useSelector(selectLoadingProject);
  const listeProject = useSelector(selectSortedProjectsByTitle);

  function handleResize() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    document.title = "Gestion du site | May'Humanlab";
  }, []);

  const handleAddActu = () => {
    dispatch(startEditActu());
  };

  const handleDeleteActu = (id) => {
    dispatch(deleteActu({ id }));
  };


  const handleAddProject = () => {
    dispatch(startEditProject());
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject({ id }));
  };


  useEffect(() => {
    dispatch(loadActus());
    dispatch(loadProjects());
    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return(
  <>
      <Header />
      <main className='flex flex-col items-center p-8'>
        
      <h1 className='text-center my-6 font-bold text-2xl lg:text-4xl'>Gestion du site</h1>
        
        {editActu && <ActualiteForm/>}

        {loadingActu 
        
          ? 
          <p>Chargement des actualités...</p> 
          : 

          width < 1024 
          ?
            <div>
              <div className='w-full flex justify-between mt-14'>
                <h3 className="font-montserrat font-extralight text-3xl text-center">Actualités</h3>
                <button onClick={handleAddActu} className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600">
                  +
                </button>
              </div>

              {listeActualite.map((actualite) => (
                <ActualiteRow key={actualite.id_actualite} actualite={actualite} handleDelete={handleDeleteActu} width={width}/>
              ))}
            </div>
          :

          <div className='w-full px-14'>
            <div className='w-full flex justify-between mt-14'>
              <h3 className="font-montserrat font-extralight text-3xl text-center">Actualités</h3>
              <button onClick={handleAddActu} className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600">
                Créer une nouvelle actualité
              </button>
            </div>

            <table className='mt-8 w-full min-w-fit'>
              <thead className='h-16'>
                <tr>
                  <th className='px-2'>Titre</th>
                  <th className='px-2'>Date</th>
                  <th className='px-2'>Image</th>
                  <th className='px-2'>Description</th>
                  <th className='text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
              {listeActualite.map((actualite) => (
                <ActualiteRow key={actualite.id_actualite} actualite={actualite} handleDelete={handleDeleteActu} />
              ))}
              </tbody>
            </table>
          </div>
        }

        
        {editProject && <ProjectForm/>}

        {loadingProject
        
          ? 
          <p>Chargement des projets...</p> 
          : 

          width < 1024 

          ?

          <div className='mt-14'>
            <div className='w-full flex justify-between mt-14'>
              <h3 className="font-montserrat font-extralight text-3xl text-center">Projets</h3>
              <button onClick={handleAddProject} className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600">
                +
              </button>
            </div>

            {listeProject.map((project) => (
              <ProjectRow key={project.id_projet} project={project} handleDelete={handleDeleteProject} width={width}/>
            ))}
          </div>

          :

          <div className='w-full px-14'>
            <div className='w-full flex justify-between mt-14'>
              <h3 className="font-montserrat font-extralight text-3xl text-center">Projets</h3>
              <button onClick={handleAddProject} className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600">
                Créer un nouveau projet
              </button>
            </div>

            <table className='mt-8 w-full min-w-fit'>
              <thead className='h-16'>
                <tr>
                  <th className='px-2'>Titre</th>
                  <th className='px-2'>Image</th>
                  <th className='px-2'>Description</th>
                  <th className='text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
              {listeProject.map((project) => (
                <ProjectRow key={project.id_projet} project={project} handleDelete={handleDeleteProject} />
              ))}
              </tbody>
            </table>
          </div>
        }

      </main>
      <Footer contactVisible={false}/>
  </>)

};

export default SiteGestion;