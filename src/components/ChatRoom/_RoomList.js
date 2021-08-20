import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;
const PanelStyle = styled(Panel)`
 &&&{
    .ant-collapse-header{
        color: white;
    }
    a.ant-typography, .ant-typography a {
        color: white;
    }
    .ant-collapse-content-box{
        padding: 15px 40px;
        color: white;
    }
    .addroom{
        color: white;
        padding: 0;
    }
`;
const TypographyStyle = styled(Typography.Link)`
    display: block;

`;


export default function RoomList(props) {
    const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext);

    const handleAddRoom = () =>{
        console.log("them phong");
        setIsAddRoomVisible(true); 
    }
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanelStyle header="Danh sách các phòng" key="1">
                {rooms.map( (room) =>( 
                    <TypographyStyle key={room.id} onClick={()=> setSelectedRoomId(room.id) }> {room.name}</TypographyStyle>
                ))}
                <Button 
                    type='text' icon={<PlusSquareOutlined/>} 
                    className='addroom'
                    onClick={handleAddRoom}
                >Thêm phòng
                </Button>
            </PanelStyle>
            
        </Collapse>
    );
}