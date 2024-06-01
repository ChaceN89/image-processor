import React from 'react';
import { useImageContext } from '../../context/ImageContext';

const DisplayTasks: React.FC = () => {
  const { tasks } = useImageContext();

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            <p>Task ID: {task.taskId} | Operation: {task.operation} | Status: {task.status}</p>
            {task.convertTo && <p>Convert To: {task.convertTo}</p>}
            {task.resizeHeight && <p>Resize Height: {task.resizeHeight}</p>}
            {task.resizeWidth && <p>Resize Width: {task.resizeWidth}</p>}
            {task.enhanceFactor && <p>Enhance Factor: {task.enhanceFactor}</p>}
            {task.rotateDegrees && <p>Rotate Degrees: {task.rotateDegrees}</p>}
            {task.flipDirection && <p>Flip Direction: {task.flipDirection}</p>}
            {task.alteredImageUrl && (
              <p>
                Altered Image URL: <a href={task.alteredImageUrl} target="_blank" rel="noopener noreferrer">{task.alteredImageUrl}</a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayTasks;
