import React, { useEffect, useState } from 'react';
import {auth, db} from '../firebase/config';


 const  useFireStore = (collection, condition ) => {
    const [documents, setDocument] = useState([]);

    useEffect(()=>{
        let collectionRef = db.collection(collection).orderBy('created_at');
        
        //condition
        /*
            fieldName:'abc'
            operator: '=='
            compareValue: 'abc' 
         */
        if (condition) {
            // Check nếu n
            if(!condition.compareValue || !condition.compareValue.length){
                return;
            }
            collectionRef = collectionRef.where(
                condition.fieldName,
                condition.operator,
                condition.compareValue )
        }

        const unsubscribed = collectionRef.onSnapshot((snapshot)=>{
            const documents = snapshot.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }))
            setDocument(documents);
            // console.log('========= documents ',documents);
        });

        return unsubscribed; 
    },[collection, condition]);
    return documents;
}

export default useFireStore;