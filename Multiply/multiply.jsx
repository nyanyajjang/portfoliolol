const React = require('react');
const { useState, useRef } = React;

const MultiPly = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (parseInt(value) === first * second) {
            setResult((prevResult) => {
                return 'Answer :' + value
            })
        
                   setFirst(Math.ceil(Math.random()*9));
                   setSecond(Math.ceil(Math.random()*9));
                   setValue('');
                   
                } else {
                    setResult('wrong');
                    setValue('');
                }
               inputRef.current.focus();
            };
   
    return (
        <>
    <div> MULTIPLY ! {first} x {second}? </div>
    <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} value={value} />
        <button> Go </button>
    </form>
    <div id="result">{result}</div>
    </>
    );

}

module.exports = MultiPly;