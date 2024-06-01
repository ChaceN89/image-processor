import React from 'react';
import DisplayTasks from './subcomponents/DisplayTasks';
import { useImageContext } from '../context/ImageContext';
import FetchTask from './subcomponents/FetchTask';



const Results: React.FC = () => {

    const { tasks } = useImageContext();

    return (
        <div>
            {tasks.map((obj, index) => (
                <>
                <pre key={index}>{JSON.stringify(obj, null, 2)}</pre>
                <FetchTask/>
                </>
            ))}
            <h1>Results</h1>
            <p>displays all the results</p>
            <p>will have more components that constantly look for resutls  </p>
            <p> will read a list of frontend api calls that is an array storing the task ids</p>
            <p>this component will go through the list of task ids can keep asking the backend if they are done yet</p>
            <DisplayTasks/>
        </div>
    );
};

export default Results;

