import { gql, useQuery } from 'urql';
import { useMemo } from 'react';


const TodosQuery = gql`
  query {
    todos {
      id
      title
    }
  }
`;

export const TodosAll = () => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data.todos.map((todo: any) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};


const TodosListQuery = gql`
  query ($from: Int!, $limit: Int!) {
    todos (from: $from, limit: $limit) {
      id
      title
    }
  }
`;

export const Todos = ({ from, limit }: { from: any, limit: any }) => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosListQuery,
    variables: { from, limit },
  });

  return <div />
};

export const TodosPause = ({ from, limit }: { from: any, limit: any }) => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosListQuery,
    variables: { from, limit },
    pause: !from || !limit,
  });

  return <div />
};


export const TodosMemo = ({ from, limit }: { from: any, limit: any }) => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosListQuery,
    variables: { from, limit },
    context: useMemo(
      () => ({
        requestPolicy: 'cache-and-network',
        url: 'http://localhost:3000/graphql?debug=true',
      }),
      []
    ),
  });

  return <div />
};

export const TodosReexecute = ({ from, limit }: { from: any, limit: any }) => {
  const [result, reexecuteQuery] = useQuery({
    query: TodosListQuery,
    variables: { from, limit },
  });

  const refresh = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: 'network-only' });
  };

  return <div />
};