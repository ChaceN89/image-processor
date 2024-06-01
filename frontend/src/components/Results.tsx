import React from 'react';
import DisplayTasks from './subcomponents/DisplayTasks';


const Results: React.FC = () => {
    return (
        <div>
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

