import React from 'react';
import Login from './components/Login';
import ProductList from './components/ProductList';
import { RestfulProvider } from "restful-react";
import useMapApiData from './hooks/useMapApiData';
import useAuthorization from './hooks/useAuthorization';

const App: React.FC = () => {
  const {authorize, authorizationToken} = useAuthorization();

  const mapApiData = useMapApiData();

  const requestOptions: object = {headers: {Authorization: (authorizationToken ?? '').toString()}};

  return (
    <>
      {/* @ts-ignore*/}
      <RestfulProvider
        base={process.env.REACT_APP_API_URL ?? ''}
        resolve={async (response): Promise<object|null> => {
          if (!response) {
            return null;
          }

          const result = await response.json();

          return mapApiData(result);
        }}
        requestOptions={() => requestOptions}
      >
        <>
          {authorizationToken ? <ProductList/> : <Login authorize={authorize}/>}
        </>
      </RestfulProvider>
    </>
  );
}

export default App;
