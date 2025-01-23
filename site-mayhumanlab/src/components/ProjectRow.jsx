import { formatDate } from '../utils/dateUtils';
import { useDispatch } from 'react-redux';
import { startEditProject } from '../features/project/projectSlice';
import DeleteModale from './DeleteModale';

function ProjectRow({ project, width, handleDelete }) {

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(startEditProject(project.id_projet));
  };

  return (
    width < 1024
      ?
      <section className="mt-12 grid grid-cols-2 w-full gap-2 max-w-md">
          <img src={project.image_p} className="col-end-3 m-auto row-start-1 row-end-4 w-24 h-24 rounded-lg bg-slate-500"></img>
          <p className="col-start-1 text-xl font-semibold">{project.titre_p}</p>
          <p className="col-start-1">{project.description_p}</p>
          <div className="flex col-span-2 m-auto w-full">
              <button className='primary-btn-small mr-2 w-full' onClick={handleEdit}>Modifier</button>
              <DeleteModale title={project.titre_p} id={project.id_projet} handleDelete={handleDelete}/>
          </div>
      </section>

      :
      <tr className="h-16">
        <td className="text-left max-w-[300px] truncate p-2">{project.titre_p}</td>
        <td className="text-center p-2"><img src={project.image_p} className="text-center mx-auto rounded-lg w-12 h-12 object-cover"></img></td>
        <td className="text-left max-w-[400px] truncate p-2">{project.description_p}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteModale title={project.titre_p} id={project.id_projet} handleDelete={handleDelete}/>
        </td>
      </tr>
  );

}

export default ProjectRow;