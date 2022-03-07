import React, { useState } from 'react'
import { gql, useMutation } from 'urql'
import { useQuery } from './useQuery'

export default function MyCustomElement() {
  // const { data } = useQuery<{ name: string }, {}>(gql`
  //   query {
  //     todos {
  //       id
  //       title
  //     }
  //   }`)

  const { data } = useQuery(gql`
    query GetUserInfo {  
      user {
          username
          firstName
        }
      }
  `)


  const [, execute] = useMutation(gql`
  mutation Login($username: String!) {
    login{
      username
    }
  }`)

  const [name, setName] = useState('')
  const login = () => {
    execute({ username: 'easa' }).then(result => {
      setName(JSON.stringify(result.data))
    })
  }
  return (
    <div className="App">
      <p>{JSON.stringify(data)}</p>
      <button onClick={login}>Login</button>
      <p>{name}</p>

    </div>
  )
}