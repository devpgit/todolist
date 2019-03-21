import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TodoItem from '../../components/todoList/TodoItem';
import { message, Spin } from 'antd';
import axios from '../../utils/axios';
import parseUrl from '../../utils/parseUrl';
import AddItem from '../../components/todoList/addItem';

import './../../sass/all.scss';
import './../../assets/icon-font.css';
import './index.scss';

class Todolist extends Component {
	token = '';
	state = {
		inputValue: '',
		list: [],
		loading: false,
		edit: false
	}
	render() {
		const confirmed = this.state.list.filter((item) => {
			if(item.status === "confirmed"){
				return item
			}
			return false
		})
		const notConfirmed = this.state.list.filter((item) => {
			if(item.status !== "confirmed"){
				return item
			}
			return false
		})
		return (
			<main className="wrapper">
				<section className="section section-todo">
					<div className="todo">
						<h1 className="heading-primary">
							<span className="heading-primary--main">Todo List</span>
							<span className="heading-primary--sub">Built by Wilson for her CSS AND SASS. Copyright © by Wilson</span>
						</h1>											
						<ul className="todo__list">
							<Spin
								spinning={this.state.loading}
							>
								<h5>代辦清單</h5>	
								{
									notConfirmed.map((item, index)=>{
										return (
											<TodoItem
												key={item.id}
												id={item.id}
												content={item.summary}
												status={item.status}
												token={this.token}
												reload={this.reload}
											/>
										)
									})
								}
								
								<h5>已完成</h5>				
								{
									confirmed.map((item, index)=>{
										return (
											<TodoItem  		
												key={item.id}
												id={item.id}
												content={item.summary}
												status={item.status}
												token={this.token}
												reload={this.reload}
											/>
										)
									})
								}
							</Spin>

							<h5>新增任務</h5>	
							<AddItem
								token={this.token}
								reload={this.reload}
							/>
						</ul>
					</div>
				</section>
			</main>
		);
  	}
	async componentDidMount(){
		this.token = parseUrl(document.location.href).token;
		this.setState({loading: true});
		const result = await axios.get(`/todolist?token=${this.token}`);
		this.getListResultHandler(result);
	}

	getListResultHandler = (result) => {
		if(result.data.code === 500){
			message.error(result.data.msg);
			this.props.history.push('/')
		}
		console.log('data',result.data.data);
		this.setState({
			list: result.data.data,
			loading: false
		})
	}

	reload = async () => {
		this.setState({loading: true});
		const result = await axios.get(`/todolist?token=${this.token}`);
		this.getListResultHandler(result);
	}
}

export default withRouter(Todolist);
