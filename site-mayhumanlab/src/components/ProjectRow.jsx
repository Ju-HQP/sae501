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
      <tr className="h-16">
        <td className="text-center">{project.titre_p}</td>
        <td className="text-center">{project.image_p}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteModale title={project.titre_p} id={project.id_projet} handleDelete={handleDelete}/>
        </td>
      </tr>
      :
      <tr className="h-16">
        <td className="text-center">{project.titre_p}</td>
        <td className="text-center">{project.image_p}</td>
        <td className="text-center">{project.description_p}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteModale title={project.titre_p} id={project.id_projet} handleDelete={handleDelete}/>
        </td>
      </tr>
  );

}

export default ProjectRow;