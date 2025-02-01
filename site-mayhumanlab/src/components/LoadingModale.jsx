const LoadingModale = () => {
    return (
        <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
            <div className="h-fit bg-white shadow-xl rounded flex flex-col items-center justify-center w-fit p-4">
                <p className="font-semibold mb-3">
                    Requête en cours de traitement...
                </p>
                <img src="/loading.svg" className="w-16" />
            </div>
        </div>
    );
}
export default LoadingModale;