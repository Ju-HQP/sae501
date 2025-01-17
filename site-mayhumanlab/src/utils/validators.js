export function required(string) {
    // Pour le champ Select des rôles
    if (typeof string === 'object'){
        string = string.label;
    }
    const trimed = string?.trim(); //ne fait trim que si string est défini
    if(!trimed) {
        return 'Ce champ est obligatoire';
    } else {
        return '';
    }
}

export function phoneValidated(nums) {
    //const regex = /(\d\d\s){4}\d\d/;
    const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/g;

    if(regex.test(nums) && nums.length < 15) {
        return '';
    } else {
        return 'Le numero doit être au format xx xx xx xx xx';
    }  
}

export function combineValidators(...filterFunctions) {
    return function filter(value) {
        const initialValue = "";
        const res = filterFunctions.reduce((accu, filter) => {
            return accu || filter(value);
        }, initialValue)
        if(res !== "") {
            return res;
        }
    }
}