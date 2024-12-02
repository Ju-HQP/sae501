export function required(string) {
    const trimed = string?.trim(); //ne fait trim que si string est défini
    if(!trimed) {
        return 'Ce champ est obligatoire';
    } else {
        return '';
    }
}