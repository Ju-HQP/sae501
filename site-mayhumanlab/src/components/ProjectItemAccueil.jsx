function ProjectsItemAccueil({ project }) {

    return (
        <li className="w-full rounded-lg shadow-xl h-2/3 pt-4 mb-8 relative">
            
            <div className="rounded-lg bg-white pt-6 relative z-20">
                <h3 className="font-semibold text-xl text-center">
                    {project.titre_p}
                </h3>
                <p className="m-6">
                    {project.description_p}
                </p>
                <img src={project.image_p} className="object-cover h-48 w-96 rounded-b-lg" />
            </div>
            <div aria-hidden="true" class="bottom-0 absolute -z-10 inset-x-0 inset-y-4 rounded-sm blur-md bg-gradient-to-br from-pink-600 via-cyan-500 to-violet-500 opacity-50"></div>
            
        </li>)
};

export default ProjectsItemAccueil;