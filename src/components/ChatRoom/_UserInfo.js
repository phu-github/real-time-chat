import React, { useContext, useEffect } from 'react';
import {Row, Col, Button ,Avatar, Typography} from 'antd'
import styled from 'styled-components';
import {auth, db} from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const WapperUserInfo = styled.div`
    display: flex;
    justify-content : space-between;
    padding : 15px 15px;
    
    .username{
        color: white;
        padding-left: 5px;
    }
`;

export default function UserInfo() {
    // useEffect(()=>{
    //     db.collection('users').onSnapshot((snapshot)=>{
    //         // Convert dữ liệu firebase sang javascript
    //         const data = snapshot.docs.map((doc)=>({
    //             ...doc.data(),
    //             id: doc.id
    //         }));
    //         console.log({data, snapshot, docs: snapshot.docs })
    //     });
    // },[])

    // cách lấy sâu dữ liệu của 1 object
    const {user: {
        displayName, 
        email,
        photoURL,
        uid
    }} = useContext(AuthContext);


    return (
        <WapperUserInfo>
                <div>
                    <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                    <Typography.Text className="username">{displayName}</Typography.Text>
                </div>
                <Button ghost onClick={()=> auth.signOut()}>Đăng Xuất</Button>
        </WapperUserInfo>
    );
}
 