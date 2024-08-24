import { customAlphabet } from 'nanoid';

const generateID = async (model, prefix, fieldName, randomLength) => {
    // Define the alphabet for the custom
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nanoid = customAlphabet(alphabet, randomLength);
    let isUnique = false;
    let uniqueId = '';
    while (!isUnique) {
        // Generate a new unique ID using nanoId
        uniqueId = prefix + await nanoid();    //=> "DCQO20Z19OK"
        try {
            // Attempt to find a record with this ID
            let existingRecord = await model.find().where(fieldName).equals(uniqueId);
            if (existingRecord.length === 0) {
                isUnique = true;
            }
        } catch (error) {
            console.error('Error checking for existing record:', error);
        }
    }
    return uniqueId;
}

export default generateID;