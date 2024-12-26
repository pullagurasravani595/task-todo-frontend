import { Routes, Route, Navigate } from 'react-router-dom';
import { Component } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import TaskList from './context/TaskList';
import ProtectedRouter from './components/ProtectedRouter';
import NotFound from './components/NotFound';
import './App.css';

class App extends Component {
  state = { taskListArr: [] };

  addTaskDetails = taskItem => {
    this.setState(prevState => ({
      taskListArr: [...prevState.taskListArr, taskItem],
    }));
  };

  removedTaskDetails = id => {
    const { taskListArr } = this.state;
    const filterTasksListArr = taskListArr.filter(
      eachValue => eachValue.id !== id
    );
    this.setState({ taskListArr: filterTasksListArr });
  };

  render() {
    const { taskListArr } = this.state;
    return (
      <TaskList.Provider
        value={{
          taskListArr,
          addTaskDetails: this.addTaskDetails,
          removedTaskDetails: this.removedTaskDetails,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </TaskList.Provider>
    );
  }
}

export default App;
