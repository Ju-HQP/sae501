const LoadingModale = () => {
    return (
       <div className="h-fit bg-white shadow-xl rounded flex flex-col items-center justify-center w-fit p-4">
           <p className="font-semibold mb-3">
               Requête en cours de traitement...
           </p>
           <img src="/loading.svg" className="w-16" />
       </div>
    );
}
export default LoadingModale;