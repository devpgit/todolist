import React from 'react';
import { Button, Input, Form, DatePicker, message } from 'antd';
import axios from '../../utils/axios';
import moment from 'moment';
import './additem.scss';

const addItem = (props) => {
    const { getFieldDecorator } = props.form;
    const config = {
        rules: [{ type: 'object', required: true, message: '請選擇日期' }],
    };
    return(
        <li className="todo__item--add">		
            <div className="todo__content">
                <div className="form__group">
                    <Form>
                        <Form.Item
                            label="開始日期"
                        >
                            {getFieldDecorator('startDate', config)(
                                <DatePicker />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="結束日期"
                        >
                            {getFieldDecorator('endDate', config)(
                                <DatePicker />
                            )}
                        </Form.Item>
                        <Form.Item label="活動標題" hasFeedback >
                            {
                                getFieldDecorator('summary',{
                                    initialValue: '', 
                                    rules: [
                                        {
                                            required: true,
                                            message: '必填欄位唷',
                                        },
                                        {
                                            validator: (rule, value, callback) => {
                                                const patt = /^[\u4e00-\u9fa5a-zA-Z0-9.]{0,30}$/
                                                if(patt.test(value)){
                                                    callback();
                                                }else{
                                                    callback('含錯誤字元');
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <Input placeholder='活動標題'/>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="todo__actions">
                <Button onClick={()=>{
                    let inputInfo = props.form.getFieldsValue();
                    props.form.validateFields(async (err) => {
                        if(err){
                            return;
                        }
                        inputInfo.endDate = inputInfo.endDate.format('YYYY-MM-DD');
                        inputInfo.startDate = inputInfo.startDate.format('YYYY-MM-DD');
                        inputInfo.token = props.token
                        const res = await axios.post('/todolist',inputInfo)
                        resHandler(props, res.data.data);
                    })
                }} type="primary">送出</Button>
                <Button>取消</Button>
            </div>
        </li>
    )
}
var resHandler = (props, res) => {
    if(res === 'OK'){
        props.reload();
        props.form.resetFields();
        message.success('創建完成');
    }else{
        message.error('創建失敗');
    }
}

export default Form.create()(addItem);