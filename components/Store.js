import create from 'zustand';

const useStore = create((set) => ({
  todos: [],
  completedTodos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  editTodo: (editedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      ),
    })),
  markAsDone: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      ),
      completedTodos: [...state.completedTodos, state.todos.find((todo) => todo.id === id)],
    })),
}));

export default useStore;
