import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentVal: '',
            post: this.props.post,
            commentlist: this.props.post.comments.reverse()
        }

        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    onChange(e) {
        this.setState({
            commentVal: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        let { post, nickname } = this.props
        let tempComments = post.comments;
        let com = {
            nickname: nickname,
            comment: this.state.commentVal,
            date: moment().format('YYYY-MM-DD hh:mma').toString()
        }
        tempComments.unshift(com);
        this.setState({
            comments: tempComments
        })
        axios.put(`http://storytime-matt.herokuapp.com/home/posts/comments/${post._id}`, com)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            });

    }

    render() {

        return (

            < div className="conatiner" >
                <form className="form-row input-group"
                    onSubmit={this.handleSubmit}
                >

                    <input
                        className="col-9 offset-1"
                        placeholder="..."
                        value={this.state.commentVal}
                        onChange={this.onChange}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn buttonsecondary input-group-append">
                            Sumbit
                    </button>
                    </div>
                </form>
                <div className="row">
                    <div className="col">
                        {this.state.commentlist.map((comment, key) => {
                            return (
                                <div key={key} className="row">
                                    <div className="col">
                                        <div className="form-row">
                                            <hr />
                                        </div>
                                        <div className="form-row row-bottom-margin">
                                            <div className="col-10 offset-1">
                                                <label className="float-left"><b>{comment.nickname}</b></label>
                                                <label className="float-right"><b>{comment.date}</b></label>
                                            </div>
                                        </div>
                                        <div className="form-row row-bottom-margin">
                                            <div className="col-10 offset-1">
                                                <p className="float-left  mx-4">{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            )
                        })}
                    </div>

                </div>
            </div >
        )
    }
}