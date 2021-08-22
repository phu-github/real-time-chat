import React, { useContext, useMemo, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext()

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible ] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    // console.log("=====isAddRoomVisible = ", isAddRoomVisible);
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
    // const usersCondition = useMemo(()=>{
    //     return {
    //         fieldName: 'users',
    //         operator: 'in',
    //         compareValue: uid
    //     }
    // },[uid]);
    const rooms = useFireStore('rooms', roomsCondition);
    // const members =  useFireStore('users', usersCondition);
    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId }}>
            {children}
        </AppContext.Provider> 
    );
}
