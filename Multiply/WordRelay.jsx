const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: 'color',
        value: '',
        result: ''
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState ({
                result: 'great',
                word: this.state.value,
                value:''
            })
        }else {
            this.setState({
                result: 'wrong',
                value: ''
            })
        } this.input.focus();
    }

    

    onChangeInput = (e) => {
        this.setState({value: e.currentTarget.value})
    }

    input;

    onRefInput = (c) => {
        this.input = c;
    }

    render() {
        return <>
       <div>WORDS RELAY ! {this.state.word}</div>
       <form onSubmit={this.onSubmitForm}>
        <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
        <button>Play!</button>

       </form>
       <div>{this.state.result}</div>
        </>
    }
}
//instead of value={this.state.value} onChangeInput={this.onChangeInput} , defaultValue is possible.
module.exports = WordRelay;