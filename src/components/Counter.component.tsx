import React, {useState} from "react";
interface CounterProps {
    num: number
}
const Counter: React.FC<CounterProps> = ({num}) => {

    // const [count, setCount] = useState(0)
    const local = localStorage.getItem('count' || '0')
    const [count, setCount] = useState(Number(local))
    const save = () => {
        localStorage.setItem('count', count.toString())
        console.log('Saved')
    }


    save()
    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        if (count < 0) {
            return
        } else {
            setCount(count - 1)
        }

    }
    return (
        <>
         <h1 className="text-6xl font-bold underline">
                Hello world!
                </h1>
            <h1>
                This is count {count}
            </h1>
            <button onClick={increment}>
                Count +
            </button>
            <button onClick={decrement} disabled={count === 0} className="button">
                Count -
            </button>

        </>
    )
}

export default Counter