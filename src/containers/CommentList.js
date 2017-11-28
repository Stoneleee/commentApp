/**
 * Created by Stoneleee on 2017/8/28.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentList from '../components/CommentList';
import { connect } from 'react-redux';
import { initComments, deleteComment } from '../reducers/comments';

class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        deleteComment: PropTypes.func
    };

    componentWillMount () {
        this._loadComments();
    }

    _loadComments = () => {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.stringify(comments) : [];
        this.props.initComments(comments);
    };

    handleDeleteComment = (index) => {
        const { comments } = this.props;
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ];
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        }
    };

    render () {
        return (
            <CommentList comments={this.props.comments} onDeleteComment={this.handleDeleteComment} />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer);