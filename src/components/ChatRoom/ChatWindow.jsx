import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Tooltip, Alert } from 'antd';
import React, { useContext, useState, useMemo} from 'react';
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import Message from './_Message';
import { addDocument } from '../../firebase/services';
import useFireStore from '../../hooks/useFireStore';

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
    const {selectedRoom, members, setIsInviteMemberVisible} = useContext(AppContext);
    
    // Du lieu cho message
    const {
        user:{uid, photoURL, displayName},
    } = useContext(AuthContext);
    //du lieu de clear form: input
    const [form] = Form.useForm();

    const [inputValue, setInputValue]= useState('');
    const handleInputChange = (e) =>{
        setInputValue(e.target.value);
    };
    const handleOnSubmit = () =>{
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName,
        });
        form.resetFields(['message']);
        console.log("cos rest");
    };

    const condition = useMemo(()=>({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }),[selectedRoom.id]);

    const messages = useFireStore('messages', condition);
    console.log('$$$$$$$$$$$$mes:', messages)
    return (
            <WrapperStyle>
                {selectedRoom.id ? (
                <>
                    <HeaderStyle>
                        <div className='header_info'>
                                    <p className="header_title">{selectedRoom.name}</p>
                                    <span className='header_desciption'>{selectedRoom.description}</span>
                        </div>
                        <div className='button_group'>
                            <Button className="button_invite" type='text' icon={<UserAddOutlined/>} onClick={()=>setIsInviteMemberVisible(true)} >Mời</Button>
                            <Avatar.Group size='large' maxCount={2}>
                                {
                                    members.map(member => <Tooltip title={member.displayName} key={member.id}>
                                        <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase() }</Avatar>
                                    </Tooltip>)
                                }
                            </Avatar.Group>
                        </div>
                    </HeaderStyle>
                    <ContentStyle>
                        <MessageListStyle>
                            {
                                messages.map((mes)=>
                                    <Message
                                        key={mes.id} 
                                        text={mes.text}
                                        displayName={mes.displayName} 
                                        created_at={mes.created_at}
                                        photoURL={mes.photoURL}
                                    /> 
                                )
                            }
                        </MessageListStyle>
                        <Form form={form}>
                            <FormStyle >
                                <Form.Item name="message" className="form_item">
                                    <Input 
                                        placeholder="Nhap tin nhan"
                                        onChange={handleInputChange}
                                        onPressEnter={handleOnSubmit}
                                        bordered={false}
                                        autoComplete='off'
                                        />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" onClick={handleOnSubmit}>
                                Gửi
                                </Button>
                            </FormStyle>                      
                        </Form>
                    </ContentStyle>
                </>) : <Alert message="Vui lòng chọn phòng" type="info" showIcon style={{ margin: 5 }} closable> </Alert>}
                    
            </WrapperStyle>
    );
}
