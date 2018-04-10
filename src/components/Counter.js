import React, { PropTypes } from 'react';

const Counter = ({ title, count, isLoading, incrementCounter, decrementCounter, removeCounter }) => (
    <div>
        <div className="pull-left">
            <i className="fa fa-times" onClick={removeCounter}></i>
            {title || 'No title'}
        </div>
        <div className="pull-right">
            <button className="controls" onClick={incrementCounter}><i className="fa fa-plus"></i></button>
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : <span className="count">{count}</span>}
            <button className="controls" onClick={decrementCounter}><i className="fa fa-minus"></i></button>
        </div>
        <div className="clearfix"></div>
    </div>
);

Counter.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    incrementCounter: PropTypes.func.isRequired,
    decrementCounter: PropTypes.func.isRequired,
    removeCounter: PropTypes.func.isRequired
};

export default Counter;