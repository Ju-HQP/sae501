export function required(string) {
    const trimed = string?.trim(); //ne fait trim que si string est défini
    if(!trimed) {
        return 'Ce champ est obligatoire';
    } else {
        return '';
    }
}

export function phoneValidated(nums) {
    console.log(typeof(nums));
    const regex = /(\d\d\s){4}\d\d/;
    
    console.log(regex.test(nums));
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