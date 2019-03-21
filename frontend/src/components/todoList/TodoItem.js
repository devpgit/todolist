import React from 'react';
import axios from '../../utils/axios';
import { message, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

class TodoItem extends React.Component{
	state = {
		edit: false,
		default: {
			startTime: '2019/01/01',
			endTime: '2019/01/01',
			summary: ''
		}
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const config = {
			initialValue: moment(this.state.default.startTime, 'YYYY-MM-DD'),
			rules: [{ type: 'object', required: true, message: '請選擇日期' }],
		};
		const config2 = {
			initialValue: moment(this.state.default.endTime, 'YYYY-MM-DD'),
			rules: [{ type: 'object', required: true, message: '請選擇日期' }],
		};
		return (
			<li className={this.props.status!=="confirmed" ? 'todo__item': 'todo__item--complete'}>
				<div className="form__checkbox-group">
					<input 
						onChange={(e)=>this.confirmHandler(this.props.id, this.props.token, this.props.status)}
						// checked={this.props.type === "ok"? true: ""}
						type="checkbox" className="form__checkbox-input" id={this.props.id} 
					/>
					<label htmlFor={this.props.id} className="form__checkbox-label">
						<span className="form__checkbox-button"></span>									         
					</label>               
				</div>
				<div className="todo__content">
					<div className="form__group">
						<span>
							{this.props.content}
						</span>							
					</div>
				</div>
				<div className="todo__actions">
					<a 
						onClick={(e) => this.setVisible(e, true, this.props.id, this.props.token)}
						href='./'><i className="todo__icon icon-basic-todolist-pen"></i>編輯</a>
					<a 
						onClick={(e)=>this.deleteHandler(e, this.props.id, this.props.token)}
						href='./'><i className="todo__icon icon-basic-trashcan"></i>刪除</a>
				</div>
				<Modal
					title="更新"
					style={{ top: 20 }}
					visible={this.state.edit}
					onOk={() => this.updateHandler(this.props.id, this.props.token)}
					onCancel={(e) => this.setVisible(e,false)}
				>
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
                            {getFieldDecorator('endDate', config2)(
                                <DatePicker />
                            )}
                        </Form.Item>
						<Form.Item label="活動標題" >
                            {
                                getFieldDecorator('summary',{
                                    initialValue: this.state.default.summary, 
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
				</Modal>
			</li>
		);
	}
	deleteHandler = async (e, id, token) => {
		e.preventDefault();
		const result = await axios.delete('/todolist', { 
			data: {
				id,
				token
			}
		})
		this.resultHandler(result, '刪除成功', '刪除失敗')
	}
	resultHandler = (result, msg, errMsg) => {
		if(result.data.data === 'OK'){
			message.success(msg);
			this.props.reload();
		}else{
			message.error(errMsg);
		}
	}
	confirmHandler = async (id, token, status) => {
		status = status === 'confirmed' ? 'tentative' : 'confirmed';
		const result = await axios.patch('/todolist', {
			id, token, status
		});
		this.resultHandler(result, '設定完成', '設定失敗')
	}
	setVisible = (e, show, id, token) => {
		if(e != null){
			e.preventDefault();
		}
		this.setState({edit: show});
		this.props.form.resetFields();
		if(show){
			this.getDefault(id, token);
		}
	}
	getDefault = async (id, token) => {
		const result = await axios.get(`/todolist/${id}?token=${token}`);
		let defaultState = {...this.state.default};
		defaultState.startTime = result.data.data.start.dateTime;
		defaultState.endTime = result.data.data.end.dateTime;
		defaultState.summary = result.data.data.summary;
		this.setState({default: defaultState})
		// console.log('result', result);
	}
	updateHandler = async (id, token) => {
		console.log('update',id, token);
		let inputInfo = this.props.form.getFieldsValue();
		this.props.form.validateFields(async (err) => {
			if(err){
				return;
			}
			const endDate = inputInfo.endDate.format('YYYY-MM-DD');
			const startDate = inputInfo.startDate.format('YYYY-MM-DD');
			const summary = inputInfo.summary;
			console.log('input',inputInfo);
			this.setVisible(null, false);
			const result = await axios.patch('/todolist',{
				id, token, summary, startDate, endDate
			})
			this.resultHandler(result, '設定完成', '設定失敗');
		})
	}
}

export default Form.create()(TodoItem);
