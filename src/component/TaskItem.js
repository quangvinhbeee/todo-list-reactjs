import React, { Component } from 'react';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
            , name: ''
            , status: false
        }
    }
    onEdit = () => {
        this.props.onEditItem(this.props.task.id)
    }
    onDelete = () => {
        this.props.onDeleteItem(this.props.task.id)
    }
    onUpdate = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center"
                    onClick={this.onUpdate}>
                    <span className={task.status === true ? "label label-success" : "label label-danger"}>
                        {task.status === true ? "Kích hoạt" : "Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onEdit}>
                        <span className="fa fa-pencil mr-5" />Sửa
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5" />Xóa
                        </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
