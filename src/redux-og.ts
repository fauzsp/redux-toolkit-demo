import { combineReducers, createStore, applyMiddleware } from "redux";
import {Todo} from "./type";
import {v1 as uuid} from "uuid";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";

interface CreateTodoActionType {
    type: typeof CREATE_TODO,
    payload: Todo,
}
export const createTodoActionCreator = (data: {desc: string}): CreateTodoActionType => {
    const {desc} = data;
    return {
        type: CREATE_TODO,
        payload: {
            id: uuid(),
            desc: desc,
            isComplete: false,
        }
    }
}

interface EditTodoActionType {
    type: typeof EDIT_TODO,
    payload: {id: string, desc: string}
}
export const editTodoActionCreator = (data: {id: string,desc: string}): EditTodoActionType => {
    const {id, desc} = data;
    return {
        type: EDIT_TODO,
        payload: {id, desc}
    }
}
interface ToggleTodoActionType {
    type: typeof TOGGLE_TODO,
    payload: {id: string, isComplete: boolean}
}

export const toggleTodoActionCreator = (data: {id: string, isComplete: boolean}): ToggleTodoActionType => {
    const {id, isComplete} = data;
    return {
        type: TOGGLE_TODO,
        payload: {id, isComplete}
    }
}

interface DeleteTodoActionType {
    type: typeof DELETE_TODO,
    payload: {id: string}
}

export const deleteTodoActionCreator = (data: {id: string}): DeleteTodoActionType => {
    const {id} = data;
    return {
        type: DELETE_TODO,
        payload: {id}
    }
}
interface SelectTodoActionType {
    type: typeof SELECT_TODO,
    payload: {id: string}
}

export const selectTodoActionCreator = (data: {id: string}): SelectTodoActionType => {
    const {id} = data;
    return {
        type: SELECT_TODO,
        payload: {id}
    }
}

//Reducers

const todosInitialState: Todo[] = [
    {
      id: uuid(),
      desc: "Learn React",
      isComplete: true
    },
    {
      id: uuid(),
      desc: "Learn Redux",
      isComplete: true
    },
    {
      id: uuid(),
      desc: "Learn Redux-ToolKit",
      isComplete: false
    }
  ];

  type TodoActionTypes = CreateTodoActionType | EditTodoActionType | ToggleTodoActionType | DeleteTodoActionType | SelectTodoActionType;
  const todoReducer = (
      state: Todo[] = todosInitialState,
      action: TodoActionTypes
  ) => {
        switch(action.type) {
            case CREATE_TODO: {
                return [...state, action.payload]
            }
            case EDIT_TODO: {
                return state.map((todo) => todo.id === action.payload.id ? {...todo, desc: action.payload.desc} : todo)
            }
            case TOGGLE_TODO: {
                return state.map((todo) => todo.id === action.payload.id ? {...todo, isComplete: action.payload.isComplete} : todo)
            }
            case DELETE_TODO: {
                return state.filter((todo) => todo.id !== action.payload.id)
            }
            default: {
            return state
            }
        }
  }

  type SelectedTodoActionTypes = SelectTodoActionType;
  const SelectedTodoReducer = (
      state: string | null = null,
      action: SelectedTodoActionTypes
  ) => {
        switch(action.type) {
            case SELECT_TODO: {
            return action.payload.id
            }
            default: {
            return state
            }
        }
  }
  const counterReducer = (state: number = 0, action: TodoActionTypes) => {
      switch(action.type) {
        case CREATE_TODO: {
            return state + 1
        }
        case EDIT_TODO: {
            return state + 1
        }
        case TOGGLE_TODO: {
            return state + 1
        }
        case DELETE_TODO: {
            return state + 1
        }
        default: {
            return state
        }
      }
  }
  const reducers = combineReducers({
      todos: todoReducer,
      selectedTodo: SelectedTodoReducer,
      counter: counterReducer
  })

  export default createStore(reducers, composeWithDevTools(applyMiddleware(logger)))