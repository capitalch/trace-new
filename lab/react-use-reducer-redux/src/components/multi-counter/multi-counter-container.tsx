import { Counter, Counter1, Counter2, Counter3, Increment1, Increment2, Increment3, NestedCounterA, NestedCounterB, NestedIncrementA, NestedIncrementB } from "./counter";

function MultiCounterContainer() {
    return (<div className="m-10 bg-yellow-50 flex flex-col gap-5">
        <div className="flex flex-row gap-5">
            <Counter />
            <Counter1 />
            <Counter2 />
            <Counter3 />
            <NestedCounterA />
            <NestedCounterB />
        </div>
        <div className="flex flex-row gap-5">
            <Increment1 />
            <Increment2 />
            <Increment3 />
            <NestedIncrementA />
            <NestedIncrementB />
        </div>

    </div>)
}

export { MultiCounterContainer }