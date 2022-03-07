import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";
import { Client, GraphQLRequest } from "urql";
const url = "http://localhost:4000/graphql"

type Options = {
  runAtStart: boolean;
  variables?: any;
  url?: string;
  requestPolicy?: "cache-and-network" | "network-only" | "cache-first" | "cache-only";
  pollInterval?: number;
  requestCredentials?: "include" | "omit" | "same-origin";
  requestHeaders?: { [key: string]: string };
  requestCache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
  requestCredentialsPolicy?: "include" | "omit" | "same-origin";
  requestHeadersPolicy?: "default" | "no-cache" | "no-store" | "no-transform" | "only-if-cached" | "force-cache" | "same-origin" | "include" | "omit";
  requestMode?: "navigate" | "same-origin" | "no-cors" | "cors";
  requestRedirect?: "follow" | "error" | "manual";
  requestReferrer?: "client" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
  requestReferrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
  requestUserAgent?: string;
}

const client = new Client({ url })

export const useQuery = <Data, Variables extends {}>(query: DocumentNode, options?: Options) => {
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const promisedResults = await client.query<Data, Variables>(query, options?.variables)
        const result = await promisedResults.toPromise()
        setResult(result.data)
      } catch (error) {

        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [query, options])

  return {
    loading,
    error,
    data: result, // && result.data,
    refetch: () => client.query<Data, Variables>(query, options?.variables),
  }
};