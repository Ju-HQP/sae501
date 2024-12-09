import { formatDate } from "../utils/dateUtils";

function ActualityBlock({ actuality }){

  const { title, description, date, image } = actuality; /* Récupération des informations utiles de l'actualité */
  const formattedDate = formatDate(date); /* Formatte la date sous la forme jour nom du mois année */

  return (
    <article className="flex flex-col border rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <header className="bg-gray-200 text-center py-2">
        <p className="text-sm font-semibold">{formattedDate}</p>
      </header>
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </article>
  );
}

export default ActualityBlock;