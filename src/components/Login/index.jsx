import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { useHistory } from "react-router";
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const {Title} = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
    let history = useHistory();
    console.log(history);

    // Nhấn nút đăng nhập bằng Facebook
    const handleFbLogin = async () =>{
        const {additionalUserInfo, user} = await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()); 
        // Nếu là người đăng nhập mới thì add dữ liệu vào  store database
        console.log("additionalUserInfo", additionalUserInfo);
        console.log("user", user);
        if(additionalUserInfo?.isNewUser){
            addDocument(
                'users', 
                {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: additionalUserInfo.providerId,
                    keywords: generateKeywords(user.displayName),
                }
            )
        }
    };
    auth.onAuthStateChanged((user) =>{
        console.log({user});

        // nếu login thành công sẽ chuyển hướng đến trang khác
        if(user){
            history.push("/");
        }
    });
    return (
        <div>
            <Row >
                <Title level={3}>Chat for fun</Title>
                <Col span={8}>
                    <Button>Đăng nhập bằng GOOGLE</Button>
                </Col>
                <Col>
                    <Title></Title>
                    <Button onClick={handleFbLogin}>Đăng nhập bằng FACEBOOK</Button>
                </Col>
            </Row>
        </div>
    );
}
