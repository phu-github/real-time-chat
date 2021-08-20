import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
import Message from './_Message';

const WrapperStyle = styled.div`
    height: 100vh;
`;
const HeaderStyle =  styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    height: 56px;
    border: 1px solid gray;

    .header {
        &_info{
            display: flex;
            flex-direction:  column;
            justify-content: center;
        }
        &_title{
            margin: 0;
            font-weight: bold;
        }
        &_description{
            font-size: 16px;
        }
    }
    .button_group{
        display: flex;
        justify-content: space-bettween;
        align-items: center;

        .ant-btn.button_invite {
            margin-right: 5px;
        }
    }
    
`;
const ContentStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100% - 56px);
    padding: 0px 16px 16px 16px;
`;
const MessageListStyle = styled.div`
    overflow-y: auto;
    margin-bottom: 20px;
`;
const FormStyle = styled.div`
    display: flex;
    justify-content: space-bettween;

    .form_item{
        flex-grow: 1;
    }
`;
export default function ChatWindow() {
    const {rooms, selectedRoomId} = useContext(AppContext);
    
    const selectedRoom = useMemo(
        () => rooms.find((room)=> room.id === selectedRoomId)
    ,[rooms, selectedRoomId]);

    // console.log( rooms, selectedRoomId, selectedRoom);
    console.log(selectedRoom);

    return (
            <WrapperStyle>
                <HeaderStyle>
                    <div className='header_info'>
                        <p className="header_title">{selectedRoom.name}</p>
                        <span className='header_desciption'>{selectedRoom.description}</span>
                    </div>
                    <div className='button_group'>
                        <Button className="button_invite" type='text' icon={<UserAddOutlined/>} >Mời</Button>
                        <Avatar.Group size='large' maxCount={2}>
                            <Tooltip placement="bottom" title="prompt text A">
                                <Avatar>A</Avatar>
                            </Tooltip>
                            <Tooltip placement="bottom" title="prompt text B">
                                <Avatar>B</Avatar>
                            </Tooltip>
                            <Tooltip placement="bottom" title="prompt text C">
                                <Avatar>C</Avatar>
                            </Tooltip>
                            <Tooltip placement="bottom" title="prompt text D">
                                <Avatar>D</Avatar>
                            </Tooltip>
                        </Avatar.Group>
                    </div>
                </HeaderStyle>
                <ContentStyle>
                    <MessageListStyle>
                        <Message text="text 1ádasdasdddddddddddddddd" displayName="Tùng" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 2" displayName="Quân" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 3" displayName="Sơn" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 4" displayName="AN" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 5" displayName="Trường" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 1" displayName="Tùng" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="textsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss 2" displayName="Quân" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 3" displayName="Sơn" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 4" displayName="AN" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 5" displayName="Trường" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 1" displayName="Tùng" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 2" displayName="Quân" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 3" displayName="Sơn" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 4" displayName="AN" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 5" displayName="Trường" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 1" displayName="Tùng" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 2" displayName="Quân" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 3" displayName="Sơn" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 4" displayName="AN" createdAt={123456} photoURL={null}  ></Message>
                        <Message text="text 5" displayName="Trường" createdAt={123456} photoURL={null}  ></Message>
                    </MessageListStyle>
                    <Form>
                        <FormStyle>
                            <Form.Item 
                                className="form_item"
                                name="username"
                            >
                                <Input placeholder="Nhắn vào đây" bordered={false}/>
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                            Gửi
                            </Button>
                        </FormStyle>
                    </Form>
                </ContentStyle>
            </WrapperStyle>
    );
}
