import firebase, {db} from "./config";

export const addDocument = (collection, data) => {
    const query = db.collection(collection);

    query.add({
        ...data,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
};