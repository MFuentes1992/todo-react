import React, { useReducer } from 'react';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'reactstrap';
import { TODO } from './lib/interface';
import { reducer } from './lib/reducer';
import useFetch from './lib/useFetch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // const initialState: TODO[] = [{
  //   uuid: `${new Date().getTime()}`,
  //   description: 'Pasear a Nico',
  //   done: false,
  //   display: true,
  //   createdAt:'',
  //   updatedAt: ''
  // }];
  const [todos, setTodos, loading, error]: any = useFetch();
  console.log(error);
  //const [_todos, dispatch] = useReducer(reducer, todos);
const dispatchHandler = (action: any) => {
  setTodos( reducer(todos, action) );
}
  return (
    <div className="App">
      <h1 className="app-title">TODO APP</h1>
      <hr />
      <div className="todo-body">
        <div className="todo-list">
          {loading && !error && <div>
            <FontAwesomeIcon icon={faCircleNotch} className="loader" />
          </div>}
          {error && <div className="alert-container">
            <Alert color="danger">
              Network Error.
            </Alert>            
          </div>}
          { !loading && !error && <TodoList todos={todos} dispatch={dispatchHandler} /> }
        </div>
        <div className="todo-add">
          <TodoAdd dispatch={dispatchHandler} />
        </div>
      </div>
      <div className="footer">
        <p><strong>Markcraft 2021</strong></p>
      </div>
    </div>
  );
}

export default App;
