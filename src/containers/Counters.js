import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchCounters,
    createCounter,
    removeCounter,
    incrementCounter,
    decrementCounter
} from '../actions/counters';
import Counter from '../components/Counter';

class Counters extends Component {

    constructor(props) {
        super(props);
        // We do this because of ES6 class properties do not automatically bind to the React class instance
        this.createCounter = this.createCounter.bind(this);
        this.createCounter = this.createCounter.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.removeCounter = this.removeCounter.bind(this);
        this.inputRef = null;
        this.props.dispatch(fetchCounters());
    }
    createCounter(e) {
        e.preventDefault();
        if (!this.inputRef.value) {
            return;
        }

        this.props.dispatch(createCounter(this.inputRef.value));
    }

    removeCounter(id) {
        this.props.dispatch(removeCounter(id));
    }

    incrementCounter(id) {
        this.props.dispatch(incrementCounter(id));
    }

    decrementCounter(id) {
        this.props.dispatch(decrementCounter(id));
    }

    render() {
        const { counters, total, loading, error } = this.props;
        const countersComponent =
            loading.who === 'ALL' ?
                <i className="fa fa-2x fa-spin fa-spinner"></i>
                : counters.map((counter) => {
                    return <Counter
                            key={counter.id}
                            isLoading={loading.who === counter.id}
                            title={counter.title}
                            count={counter.count}
                            removeCounter={() => this.removeCounter(counter.id)}
                            incrementCounter={() => this.incrementCounter(counter.id)}
                            decrementCounter={() => this.decrementCounter(counter.id)}/>;
                    });

        return (
            <div className="">
                <form onSubmit={this.createCounter}>
                    <input className="form-control" type="text" ref={(ref) => this.inputRef = ref}/>
                </form>
                <hr/>
                {error ? error : countersComponent}
                <br/>
                TOTAL: {total}
            </div>
        );
    }
}

Counters.propTypes = {
    dispatch: PropTypes.func.isRequired,
    counters: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.object.isRequired,
    error: PropTypes.any
};

function mapStateToProps(state) {
    const { counter } = state;
    const counters =  counter.allIds.map(counterId => {
        return counter.byId[counterId];
    });
    return {
        counters,
        loading: counter.loading,
        error: counter.error,
        total: counters.length ?
            counters.map(counter => counter.count)
                .reduce((a,b) => {
                    return a + b;
                })
            : 0
    };
}

export default connect(mapStateToProps)(Counters);  // adds dispatch prop
