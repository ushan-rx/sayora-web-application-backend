const generateID = (prefix, lastItem, numLength) => {
    let newId = prefix;
    if(lastItem){
        const currentNumber = parseInt(lastItem.slice(prefix.length));
        newId += String(currentNumber + 1).padStart(numLength, '0');
    } else {
        newId += String(1).padStart(numLength, '0');
    }
    return newId;
}

module.exports = generateID;