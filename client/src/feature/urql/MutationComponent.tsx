import { gql, useMutation } from "urql";

const UpdateTodo = gql`
  mutation ($id: ID!, $title: String!) {
    updateTodo (id: $id, title: $title) {
      id
      title
    }
  }
`;

export const Todo = ({ id, title }: { id: any, title: any }) => {
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);
  return <div></div>
};


export const TodoResult = ({ id, title }: { id: any, title: any }) => {
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);

  const submit = (newTitle: string) => {
    const variables = { id, title: newTitle || '' };
    updateTodo(variables).then(result => {
      // The result is almost identical to `updateTodoResult` with the exception
      // of `result.fetching` not being set.
      // It is an OperationResult.
    });
  };
  return <div onClick={() => submit('new title')}></div>
};

const TodoError = ({ id, title }: { id: any, title: any }) => {
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);

  const submit = (newTitle: string) => {
    const variables = { id, title: newTitle || '' };
    updateTodo(variables).then(result => {
      if (result.error) {
        console.error('Oh no!', result.error);
      }
    });
  };
  return <div onClick={() => submit('new title')}></div>
};