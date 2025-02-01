// vérifie si la propriété d'un objet contient ou non la valeur de recherche fournie

export function filterProperty(property) {      
    return function compareValues(search) {
        if (typeof search !== 'string') {
            throw new Error(`Invalid search term: ${search}`);
            }
            
        const lowerSearch = search.toLowerCase();
        return  function compareInObject(object) {
            if (typeof property !== 'string' || !object.hasOwnProperty(property)) {
                throw new Error(`Invalid property: ${property}`);
                }

            return object[property].toLowerCase().includes(lowerSearch);
        }
    }
}

export function filterCompetence(property) {      
    return function compareValues(search) {
        if (typeof search !== 'string') {
            throw new Error(`Invalid search term: ${search}`);
        }
            
        const lowerSearch = search.toLowerCase();

        return function compareInObject(object) {
            if (typeof property !== 'string' || !object.hasOwnProperty(property)) {
                throw new Error(`Invalid property: ${property}`);
            }

            const propValue = object[property];

            // Vérifie si la propriété est un tableau et contient des objets avec `nom_c`
            if (Array.isArray(propValue)) {
                return propValue.some(item => 
                    item.nom_c && item.nom_c.toLowerCase().includes(lowerSearch)
                );
            }

            // Sinon, applique la logique originale
            return propValue.toLowerCase().includes(lowerSearch);
        }
    }
}

//un filtre curry pour vérifier si l'année d'une propriété date d'un objet correspond à l'année
//fournie en paramètre. 

export function filterDate(dateProperty){
    return function searchYear(searchYear){
        if (typeof searchYear !== 'string') {
            throw new Error(`Invalid search term: ${searchYear}`);
            }

        return function compareYears(object) {
            if (typeof dateProperty !== 'string' || !object.hasOwnProperty(dateProperty)) {
                throw new Error(`Invalid property: ${dateProperty}`);
                }

            const objectYear = new Date(object[dateProperty]).getFullYear();

            return searchYear === objectYear.toString(); //on convertir en String car getFullYear renvoie un int
        }
    }

}