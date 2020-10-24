import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onSearch = (value) => {
        this.props.onSearch(this.state.keyword);
    }
    onInputSearch = (value) => {
        this.setState({
            keyword: value.target.value
        })
    }
    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Nhập từ khóa..." name='inputsearch' value={this.state.keyword} onChange={this.onInputSearch} />
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit" onClick={this.onSearch}>
                        <span className="fa fa-search mr-5" />Tìm
                    </button>
                </span>
            </div>
        );
    }
}

export default Search;
