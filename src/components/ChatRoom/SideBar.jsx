import { Col, Row } from 'antd';
import React from 'react';
import RoomList from './_RoomList';
import UserInfo from './_UserInfo';
import styled from 'styled-components';

const SideBarStyle = styled.div`
    background: #1f2937;
    color: white;
    height: 100vh;
    font-weight: 500;
`;

export default function SideBar() {
    return (
        <SideBarStyle>
            <Row>
                <Col span={24}> <UserInfo/> </Col>
                <Col span={24}> <RoomList/> </Col>  
            </Row>
        </SideBarStyle>
    );
}
