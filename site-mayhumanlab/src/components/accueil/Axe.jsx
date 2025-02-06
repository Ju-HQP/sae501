function Axe({ axe }) {

    return (
        <li className="w-full h-2/3 pt-4 mb-8 lg:m-0 lg:pt-0">

            <div>
                <h3 className="font-jura text-3xl text-center">
                    {axe.titre}
                </h3>
                <img src={axe.image} className="object-cover h-60 w-60 m-auto rounded-lg my-6" />
                <p className="my-4 px-2 lg:mx-8 lg:leading-7">
                    {axe.description}
                </p>

            </div>
        </li>)
};

export default Axe;