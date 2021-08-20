import {Modal, Form, Input} from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

function AddRoomModal(props) {
    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);

    const [form] = Form.useForm();

    const handleOk = ()=> {
        // Thêm phòng mới vào firestore
        console.log('======= uid :', uid);
        console.log({formData: form.getFieldValue() });
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

        // Reset Fields
        form.resetFields();
        setIsAddRoomVisible(false);
    }
    const handleCancel= () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    }

    return (
        <div>
            <Modal 
                title="Tạo Phòng" 
                visible={isAddRoomVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label='Tên Phòng' name='name'>
                        <Input placeholder='Nhập tên phòng'/>
                    </Form.Item>
                    <Form.Item label='Mô tả' name='description'>
                        <Input.TextArea placeholder='Nhập mô tả'/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;