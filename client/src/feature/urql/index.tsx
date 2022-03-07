import { createClient, Provider } from 'urql';
import { Todo, TodoResult } from './MutationComponent';
import { Todos, TodosAll, TodosMemo, TodosPause, TodosReexecute } from './QueryComponent';

const client = createClient({
  url: 'http://localhost:3000/graphql',
});

export const App = () => (
  <Provider value={client}>
    <Todos from={1} limit={1} />
    <TodosAll />
    <TodosMemo from={1} limit={1} />
    <TodosPause from={1} limit={1} />
    <TodosReexecute from={1} limit={1} />
    <Todo id={1} title="hello world" />
    <TodoResult id={1} title="hello world" />
  </Provider>
);