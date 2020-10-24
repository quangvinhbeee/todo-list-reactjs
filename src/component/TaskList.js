import React, { Component } from 'react';
import TaskItem from './TaskItem'

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
            filter: '',
            statusFilter: -1,
            keyword: ''
        }
    }
    componentWillReceiveProps(nextprops) {
        this.setState({
            keyword: nextprops.onSearch
        })
    }
    onEdit = (value) => {
        this.props.onEditItem(value)
    }
    onDelete = (value) => {
        this.props.onDeleteItem(value)
    }
    onUpdateStatus = (value) => {
        this.props.onUpdateStatus(value)
    }
    onFilter = (value) => {
        this.setState({
            [value.target.name]: value.target.value
        })
    }
    render() {
        console.log(this.state.filter)
        var { tasks } = this.props;
        var elemTasks = tasks.map((task, index) => {
            if (this.state.keyword != '') {
                if (task.name.toUpperCase().search(this.state.keyword.toUpperCase()) > -1) {
                    return <TaskItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDelete} onEditItem={this.onEdit} />
                }
            } else {
                if (this.state.filter != '') {
                    if (task.name.toUpperCase().search(this.state.filter.toUpperCase()) > -1) {
                        if (this.state.statusFilter == -1)
                            return <TaskItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDelete} onEditItem={this.onEdit} />
                        else if (this.state.statusFilter == 0 && !task.status)
                            return <TaskItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDelete} onEditItem={this.onEdit} />
                        else if (this.state.statusFilter == 1 && task.status)
                            return <TaskItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDelete} onEditItem={this.onEdit} />
                    }
                } else {
                    if (this.state.statusFilter == -1)
                        return <TaskItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDelete} onEditItem={this.onEdit} />
                    else if (this.state.statusFilter == 0 && !task.status)
                        return <TaskItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDelete} onEditItem={this.onEdit} />
                    else if (this.state.statusFilter == 1 && task.status)
                        return <TaskItem key={index} task={task} index={index} onUpdateStatus={this.onUpdateStatus} onDeleteItem={this.onDelete} onEditItem={this.onEdit} />
                }
            }


        })
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <input type="text" className="form-control" name='filter' onChange={this.onFilter} />
                        </td>
                        <td>
                            <select className="form-control" onChange={this.onFilter} name='statusFilter'>
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    {elemTasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;
