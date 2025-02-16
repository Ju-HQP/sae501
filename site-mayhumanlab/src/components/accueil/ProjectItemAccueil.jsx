function ProjectsItemAccueil({ project }) {

    return (
        <li className="w-full rounded-lg lg:rounded-3xl h-2/3 pt-4 mb-8 relative">
            
            <div className="rounded-lg bg-white pt-8 relative z-20 lg:grid grid-cols-2 lg:pt-0 lg:rounded-3xl">
                <h3 className="font-jura text-3xl text-center col-start-2 lg:mt-8">
                    {project.titre_p}
                </h3>
                <p className="m-6 col-start-2 lg:mx-8">
                    {project.description_p}
                </p>
                <img alt={project.titre_p} src={project.image_p} className="object-cover h-52 w-full rounded-b-lg row-start-1 row-end-3 lg:rounded-b-none lg:rounded-l-3xl lg:h-60" />
            </div>
            <div aria-hidden="true" className="bottom-0 absolute -z-10 inset-x-0 inset-y-4 lg:rounded-3xl blur-lg bg-blue-300"></div>
            
        </li>)
};

export default ProjectsItemAccueil;