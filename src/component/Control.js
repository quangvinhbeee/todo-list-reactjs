import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'


class Control extends Component {
    constructor(props) {
        super(props);
    }

    onSort = (value) => {
        this.props.onSort(value)
    }
    onSearch = (value) => {
        this.props.onSearch(value)
    }
    render() {
        return (
            <div className="row mt-15">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    {/*Search*/}
                    <Search onSearch={this.onSearch} />
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    {/*Sort*/}
                    <Sort onSort={this.onSort} />
                </div>
            </div>
        );
    }
}

export default Control;
