import React, { Component } from 'react';

class Sort extends Component {
    constructor(props) {
        super(props);

    }


    onSort = (sortBy, sortStatus) => {
        var onSort = {
            sortBy: sortBy,
            sortStatus: sortStatus
        }
        this.props.onSort(onSort)
    }
    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li >
                        <a role="button" >
                            <span className="fa fa-sort-alpha-asc pr-5" value={1} onClick={() => { this.onSort('name', 1) }}>
                                Tên A-Z
                        </span>
                        </a>
                    </li>
                    <li >
                        <a role="button">
                            <span className="fa fa-sort-alpha-desc pr-5" value={2} onClick={() => { this.onSort('name', -1) }}>
                                Tên Z-A
                        </span>
                        </a>
                    </li>
                    <li role="separator" className="divider" />
                    <li value={3}><a role="button" onClick={() => { this.onSort('status', 1) }}>Trạng Thái Kích Hoạt</a></li>
                    <li value={4}><a role="button" onClick={() => { this.onSort('status', -1) }}>Trạng Thái Ẩn</a></li>
                </ul>
            </div >
        );
    }
}

export default Sort;
