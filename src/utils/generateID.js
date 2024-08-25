import { customAlphabet } from 'nanoid';


// Function to generate a unique ID for a record
// model: The Mongoose model to check for existing records
// prefix: The prefix to add to the generated ID
// fieldName: The field name to check for existing records
// randomLength: The length of the random part of the ID
// returns a unique ID (prefix + random part) length will be prefix length + randomLength 
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