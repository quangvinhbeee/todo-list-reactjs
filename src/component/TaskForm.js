import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount = () => {
        var Edit = this.props.onEdit;
        if (Edit.id !== '') {
            this.setState({
                id: Edit.id,
                name: Edit.name,
                status: Edit.status
            })
        } else {
            this.onClear()
        }
    }
    componentWillReceiveProps = (nextProps) => {
        var Edit = this.state;
        if (Edit.id !== nextProps.id) {
            this.setState({
                id: nextProps.onEdit.id,
                name: nextProps.onEdit.name,
                status: nextProps.onEdit.status
            })
        } else {
            this.onClear();
        }
    }
    onChange(value) {
        var name = value.target.name
        var valuee = value.target.value
        if (name === 'status') { valuee = value.target.value === 'true' ? true : false }
        this.setState({
            [name]: valuee
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
        this.onClear();
        this.onCloseForm();
    }
    onCloseForm = () => {
        this.props.onCloseForm();
        this.onClear();
    }
    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        })
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.id === '' ? 'Thêm Công Việc' : 'Sửa Công việc'}
                        <span className="fa fa-times-circle float-right btn"
                            onClick={this.onCloseForm}></span>
                    </h3>

                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button className="btn btn-warning" >{this.state.id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
                            <button type='button' className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
