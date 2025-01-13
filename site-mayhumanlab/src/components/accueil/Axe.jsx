function Axe({ axe }) {

    return (
        <li className="w-full rounded-lg lg:rounded-3xl h-2/3 pt-4 mb-8 relative">
            
            <div className="rounded-lg bg-white pt-8 relative z-20 lg:grid grid-cols-2 lg:pt-0 lg:rounded-3xl">
                <h3 className="font-montserrat font-extralight text-3xl text-center col-start-2 lg:mt-8">
                    {axe.titre}
                </h3>
                <p className="m-6 col-start-2 lg:mx-8">
                    {axe.description}
                </p>
                <img src={axe.image} className="object-cover h-52 w-full rounded-b-lg row-start-1 row-end-3 lg:rounded-b-none lg:rounded-l-3xl lg:h-60" />
            </div>
            <div aria-hidden="true" class="bottom-0 absolute -z-10 inset-x-0 inset-y-4 lg:rounded-3xl blur-md bg-gradient-to-br from-pink-600 via-cyan-500 to-violet-500 opacity-50"></div>
            
        </li>)
};

export default Axe;