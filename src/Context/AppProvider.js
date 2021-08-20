import React, { useContext, useMemo, useState } from 'react';
import {useHistory} from 'react-router-dom';
import firebase, { auth } from '../firebase/config';
import { Spin } from 'antd';
import { AuthContext } from './AuthProvider';
import useFireStore from '../hooks/useFireStore';

export const AppContext = React.createContext()

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible ] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    console.log("=====isAddRoomVisible = ", isAddRoomVisible);
    const {user: {uid}} = useContext(AuthContext); 
    /* 
    name: room-name,
    description: 'mo ta',
    member: [uid1, uid3, uid3,...]
     */
    const roomsCondition = useMemo(()=>{
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    },[uid]);
    const rooms = useFireStore('rooms', roomsCondition);

    console.log('=========== rooms', rooms);
    
    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId }}>
            {children}
        </AppContext.Provider> 
    );
}
