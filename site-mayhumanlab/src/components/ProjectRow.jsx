import { formatDate } from '../utils/dateUtils';
import { useDispatch } from 'react-redux';
import { startEditProject } from '../features/project/projectSlice';
import { deleteProject } from '../features/project/projectAsyncAction';
import DeleteButton from './DeleteButton';

function ProjectRow({ projet, width, handleDelete }) {

  const dispatch = useDispatch();

  // Fonction qui sera passé en paramètre du composant DeleteButton
     const handleDeleteProject = (id) => {
        dispatch(deleteProject({id}));
      };

  const handleEdit = () => {
    dispatch(startEditProject(projet.id_projet));
  };

  return (
    width < 1024
      ?
      <tr className="h-16">
        <td className="text-center">{projet.titre_p}</td>
        <td className="text-center">{projet.image_p}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteButton
          name={projet.titre_p}
          id={projet.id_projet}
          deleteEntityById={handleDeleteProject}
        ></DeleteButton></td>
      </tr>
      :
      <tr className="h-16">
        <td className="text-center">{projet.titre_p}</td>
        <td className="text-center">{projet.image_p}</td>
        <td className="text-center">{projet.description_p}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteButton
          name={projet.titre_p}
          id={projet.id_projet}
          deleteEntityById={handleDeleteProject}
        ></DeleteButton></td>
      </tr>
  );

}

export default ProjectRow;