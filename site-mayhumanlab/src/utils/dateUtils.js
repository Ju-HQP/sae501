export const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formattedDate;
}