
import TaskFrom from './component/TaskForm'
import Control from './component/Control'
import TaskList from './component/TaskList'
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [// id: unique, name, status

      ],
      isDisplayForm: false,
      taskEdit: {
        id: '',
        name: '',
        status: false
      },
      keyword: '',
      onSort: {
        sortBy: '',
        sortStatus: ''
      }
    }
    this.onGenerateDta = this.onGenerateDta.bind(this)
    this.randomString = this.randomString.bind(this)
  }
  componentWillMount() {
    if (window.localStorage && window.localStorage.getItem('tasks')) {
      var tasks = JSON.parse(window.localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      })
    }
  }
  onGenerateDta = () => {
    var tasks = [
      {
        id: this.randomString(),
        name: 'Học lập trình',
        status: false
      },
      {
        id: this.randomString(),
        name: 'Học nhảy',
        status: true
      },
      {
        id: this.randomString(),
        name: 'Học chơi',
        status: false
      }
    ];
    this.setState({
      tasks: tasks
    });
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onToggleForm = () => {
    this.setState({
      isDisplayForm: true,
      taskEdit: {
        id: '',
        name: '',
        status: false
      }
    })
  }

  randomString() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEdit: {
        id: '',
        name: '',
        status: false
      }
    })
  }
  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id != '') {
      var task = {
        id: data.id,
        name: data.name,
        status: data.status
      }
      let index = this.findID(data.id)
      tasks[index] = task
    } else {
      var task = {
        id: this.randomString(),
        name: data.name,
        status: data.status
      }
      tasks.push(task);

    }
    this.setState({
      tasks: tasks
    })
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    //this.onToggleForm();
  }
  findID = (value) => {
    var { tasks } = this.state;
    var kkk = -1;
    tasks.forEach((task, index) => {
      if (task.id === value) {
        kkk = index;
      }
    });
    return kkk
  }
  onUpdate = (value) => {
    var { tasks } = this.state
    let index = this.findID(value);
    if (index != -1) {
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks
    })
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onDelete = (value) => {
    var { tasks } = this.state;
    let index = this.findID(value)
    tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    })
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onEdit = (value) => {
    this.setState({
      isDisplayForm: true
    })
    var index = this.findID(value)
    var { tasks } = this.state
    this.setState({
      taskEdit: this.state.tasks[index]
    })
  }
  onFilter = (value) => {
    console.log(value.target.value)
  }
  onSearch = (value) => {
    this.setState({
      keyword: value
    })
  }
  onSort = (value) => {
    this.setState({
      onSort: value
    })
  }
  render() {
    var { tasks, isDisplayForm } = this.state;// lay gia tri tasks trong state
    if (this.state.onSort.sortBy == 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return this.state.onSort.sortStatus;
        else if (a.name < b.name) return -this.state.onSort.sortStatus;
        else return 0;
      })
    } else {
      tasks.sort((a, b) => {
        if (a.status < b.status) return this.state.onSort.sortStatus;
        else if (a.status > b.status) return -this.state.onSort.sortStatus;
        else return 0;
      })
    }
    var elemTaskForm = isDisplayForm ? <TaskFrom onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} onEdit={this.state.taskEdit} /> : '';
    return (
      <div className="container" >
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4 " : ""}>
            {/*TaskFrom*/}
            {elemTaskForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8 " : "col-xs-12 col-sm-12 col-md-12 col-lg-12 "}  >
            <button type="button" className="btn btn-primary mb-3" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-2 " />Thêm Công Việc
            </button>
            <button type="button" className="btn btn-warning ml-1 mb-3" onClick={this.onGenerateDta}>
              <span className="" />Generate Data
            </button>
            {/*Control*/}
            <Control onSearch={this.onSearch} onSort={this.onSort} />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/*TaskList*/}
                <TaskList tasks={tasks} onSearch={this.state.keyword} onUpdateStatus={this.onUpdate} onDeleteItem={this.onDelete} onEditItem={this.onEdit} onFilter={this.onFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
