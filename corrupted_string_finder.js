

function doesContain (input, lookouts) {
    if (typeof lookouts == "string")
        lookouts = [lookouts];
    for (let j = 0; j < lookouts.length; j++) {
        lookout = lookouts[j];
        let searchExpression = "";
        for (let i = 0; i < lookout.length; i++) {
            searchExpression += lookout[i];
            if (i < lookout.length -1)
                searchExpression += "[^\w]*";
        }
        let regex = new RegExp(searchExpression,"i");
        if (regex.test(input))
            return true;
    }
    return false;
}


module.exports.doesContain = doesContain;