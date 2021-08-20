import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';


const MessageMeStyle = styled.div`
    margin-bottom: 5px;

    .author{
        font-size: 16px;
        font-weight: bold;
        margin-left: 5px;
    }
    .date{
        font-size: 12px;
        margin-left: 5px;
        color: gray;
    }
    .content{
        margin-left: 30px;
        background-color: #e4e6eb;
        padding-bottom: 8px;
        padding-top: 7px;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 18px 18px 18px 18px;
    }

`;

export default function Message({text, displayName, createdAt, photoURL}) {
    return (
        <MessageMeStyle>
            <div>
                <Avatar size='small' src={photoURL}>A</Avatar>
                <Typography.Text className='author'>{displayName}</Typography.Text>
                <Typography.Text className='date'>{createdAt}</Typography.Text>
            </div>
            <div>
                <Typography.Text className='content'>{text}</Typography.Text>
            </div>
        </MessageMeStyle>
    );
}
