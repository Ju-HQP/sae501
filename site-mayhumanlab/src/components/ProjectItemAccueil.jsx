function ProjectsItemAccueil({ project }) {

    return (
        <section>
            <h3>
                {project.titre_p}
            </h3>
            <p>
                {project.description_p}
            </p>
            <img src={project.image_p} />
        </section>)
};

export default ProjectsItemAccueil;