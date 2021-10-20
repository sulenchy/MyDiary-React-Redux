import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLoading } = this.props;
    let style;
    if (!isLoading) {
      style = { display: 'none' };
    } else {
      style = { display: 'block' };
    }
    return (
      <div style={style} className="spinner-overlay">
        <i className="fas fa-spinner" />
      </div>
    );
  }
}


Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ isLoading: state.globalreducer.isLoading });


export default connect(mapStateToProps)(Spinner);
