import React from "react";
import {
  graphql, usePreloadedQuery,
  RelayEnvironmentProvider as EnvironmentProvider,
  loadQuery, useRelayEnvironment
} from "react-relay";

const artistsQuery = graphql`
  query ArtistQuery($artistID: String!) {
    artist(id: $artistID) {
      name
      ...ArtistDescription_artist
    }
  }
`;


export default function ArtistPage() {
  const environment = useRelayEnvironment();

  return (
    <EnvironmentProvider environment={environment}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ArtistView />
      </React.Suspense>
    </EnvironmentProvider>
  )
}

function ArtistView() {
  const environment = useRelayEnvironment();
  const artistsQueryReference = loadQuery(
    environment,
    artistsQuery,
    { artistId: "1" }
  );
  const data = usePreloadedQuery<any>(artistsQuery, artistsQueryReference);
  return (
    <>
      <div>{data?.artist?.name}</div>
      {data?.artist && <input value={data?.artist} />}
    </>
  );
}
