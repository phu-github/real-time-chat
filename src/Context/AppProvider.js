import React, { useContext, useMemo, useState } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext()

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible ] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
   
    
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

    //selectedRooom = 1 giá trị / hoặc empty object
    const selectedRoom = useMemo(
        () => rooms.find((room)=> room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );
    
    console.log('selectedRoom =====', selectedRoom);
    console.log('selectedRoom.members=====', selectedRoom.members);
    const usersCondition = useMemo(()=>{
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    },[selectedRoom.members]);
    console.log('usersCondition======', usersCondition)
    const members =  useFireStore('users', usersCondition);
    console.log('members', members);
    return (
        <AppContext.Provider value={{ 
            rooms, 
            members,
            selectedRoom, 
            isAddRoomVisible,
            selectedRoomId, 
            setIsAddRoomVisible, 
            isInviteMemberVisible,
            setIsInviteMemberVisible,
            setSelectedRoomId }}>
            {children}
        </AppContext.Provider> 
    );
}
