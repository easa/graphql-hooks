# GraphQL use cases

> I'm going to compare different graph ql tools.
> Then I'll try suggest different graph ql - client side implementations for a react app.
> -easa 
> 10:51 3/6/2022 GMT+03:30 

## A comparison between different graph ql hooks and tools

The following table shows the differences between the different graph ql hooks and tools.

<!-- | **Name** | **Usage** | **Tools** | **Pros** | **Cons** | -->
| Name          | Downloads | Stars / Issues | Version | Last Update |
| ------------- | --------- | -------------- | ------- | ----------- |
| apollo-client | 1,030,721 | 16,728/447     | 2.6.10  | 2020        |
| apollo-boost  | 303,390   | 16,579/406     | 0.4.9   | 2020        |
| react-relay   | 185,666   | 16,734/375     | 13.1.1  | 2022        |
| urql          | 111,374   | 6,940/23       | 2.2.0   | 2022        |

## Goals of this project

The goal of this project is to compare the different graph ql hooks and tools and to see which one is the best for a given use case. The following use cases are considered:

1. Have a hook named `useQuery` and use it to fetch data from a graphql endpoint.
2. The hook should accept a `query` and a `variables` as parameters.
3. The hook should return a `data`, a `error` and a `fetch` function as properties.
4. The `fetch` function should be called when the data is needed.
5. The `fetch` function should return a `Promise` that resolves to the `data` property.
6. The `fetch` function should return a `Promise` that rejects with the `error` property.
7. The hook should be used in a `React.Component`.
8. The hook should return a loading state.
9. The hook should have an internal state to indicate whether running the `fetch` function at the first time or not.
10. The hook should have an internal state to indicate whether the data is loading or not.
11. The hook should accept configuration options.
12. The configuration options should be able to be passed to the `useQuery` hook.
13. The configuration options should be able to be passed to the `fetch` function.
14. The configuration options should be able to reset all the internal states.

## Examples of use cases

```tsx
export default ()=>{
  const {data, error, fetch} = useQuery({
    query: gql`
      query getUser($id: ID!){
        user(id: $id){
          id
          name
          email
        }
      }
    `,
    variables: {
      id: '1'
    }
  })
  return (
    <div>
      {data && data.user.name}
      {error && error.message}
      <button onClick={()=>fetch()}>Fetch</button>
    </div>
  )
}
```
