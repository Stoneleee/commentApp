import React, { Component } from 'react'
import  PropTypes from 'prop-types'

class CommentInput extends Component {

    static propTypes = {
        username: PropTypes.string,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    };

	constructor (){
		super();
		this.state = {
			username: this.props.username,
			content: '',
		}
	}

	handleUsernameChange (event){
		this.setState({
			username: event.target.value
		})
	}

	handleContentChange (event){
		this.setState({
			content: event.target.value
		})
	}

    componentDidMount () {
        this.textarea.focus()
    }

	handleUsernameBlur (event) {
		if (this.props.onUserNameInputBlur) {
		    this.props.onUserNameInputBlur(event.target.value);
        }
	}

	handleSubmit = () => {
		if(this.props.onSubmit){
			this.props.onSubmit({
				username: this.state.username,
				content: this.state.content,
				createdTime: + new Date(),
			})
		}
		this.setState({content: ''})
	};

	render(){
		return (
			<div className="comment-input">
				<div className="comment-field">
					<span className="comment-field-name">用户名：</span>
					<div className="comment-field-input">
					  <input
						  value={this.state.username}
						  onBlur={this.handleUsernameBlur.bind(this)}
						  onChange={this.handleUsernameChange.bind(this)} />
					</div>
				</div>

				<div className="comment-field">
					<span className="comment-field-name">评论内容：</span>
					<div className="comment-field-input">
					  <textarea
						ref={(textarea) => this.textarea = textarea}
					  	value={this.state.content}
						onChange={this.handleContentChange.bind(this)}>
					  </textarea>
					</div>
				</div>

				<div className="comment-field-button">
				  <button onClick={this.handleSubmit}>提交</button>
				</div>
			</div>
		)

	}
}

export default CommentInput