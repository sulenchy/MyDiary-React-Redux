import React from 'react';

import { paginateFunc } from '../../services/groupEntries';

const Paginate = ({ WrappedComponent, itemsPerPage, entries }) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slices: [],
      currPage: 0
    };
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
  }

  componentDidMount() {
    const res = paginateFunc({ itemsPerPage, totalList: entries });
    this.setState({ slices: res });
  }

  handlePreviousPage() {
    const { currPage } = this.state;
    if (currPage > 0) {
      this.setState({ currPage: currPage - 1 });
    }
  }

  handleNextPage() {
    const { currPage, slices } = this.state;
    if (currPage < slices.length - 1) {
      this.setState({ currPage: currPage + 1 });
    }
  }

  render() {
    const { currPage, slices } = this.state;
    return (
        <>
          {slices.length && <WrappedComponent entries={slices[currPage]} {...this.props} /> }
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
              slices.length > 1
              && <>
                <button
              type="button"
              className="rounded"
              style={{ margin: '5px' }}
              onClick={() => this.handlePreviousPage()}>
              Previous
                </button>
                {
              slices.map((_, index) => (
                <button
                  type="button"
                  className={`${currPage === index && 'btn-rounded'} rounded`}
                  style={{ margin: '5px' }}
                  key={index}
                  onClick={() => this.setState({ currPage: index })}>
                  {index + 1}
                </button>
              ))
            }
                <button
              type="button"
              className="rounded"
              style={{ margin: '5px' }}
              onClick={() => this.handleNextPage()}>
              Next
                </button>
            </>
            }
          </div>
        </>
    );
  }
};

export default Paginate;
