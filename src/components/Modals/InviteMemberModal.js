import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { db } from '../../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout=300, ...props}){
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    
    const debounceFetcher = useMemo(()=>{
        const loadOptions = (value) =>{
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then(newOptions=>{
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
        },[debounceTimeout, fetchOptions]);
        
    return(
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"></Spin> : null} 
            {...props}
        >
            {   
                //[label, value, displayName]
                options.map(opt=>(
                    <Select.Option key={opt.value} value={opt.value} title={opt.lable}>
                        <Avatar size="small" src={opt.photoURL}>
                            {opt.photoURL?'': opt.label?.charAt(0)?.toUpperCase()}
                        </Avatar>  
                        {`${opt.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}

async function fetchUserList(search, curMembers){
    return db
    .collection('users')
    .where('keywords', 'array-contains', search)
    .orderBy('displayName')
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        })).filter((opt) => !curMembers.includes(opt.value));
    });
} 

function InviteMemberModal(props) {
    const {isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = useContext(AppContext);
    
    const {
        user: { uid },
    } = useContext(AuthContext);
    const [form] = Form.useForm();
    const [value, setValue] = useState([]);

    const handleOk = ()=> {

        // Reset Fields
        form.resetFields();
        setIsInviteMemberVisible(false);

        //update members
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members,...value.map((val)=>val.value)]
        })
    }
    const handleCancel= () => {
        form.resetFields();
        setIsInviteMemberVisible(false);
    }

    return (
        <div>
            <Modal 
                title="Th??m th??nh vi??n" 
                visible={isInviteMemberVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                   <DebounceSelect
                        mode="multiple"
                        label="T??n c??c th??nh vi??n"
                        value={value}
                        placeholder="Vui l??ng nh???p th??nh vi??n"
                        fetchOptions= {fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                   >
                   </DebounceSelect>
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberModal;