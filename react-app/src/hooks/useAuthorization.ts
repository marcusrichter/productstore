import { useState } from 'react';

export default function useAuthorization(): {
  authorizationToken: string | null | boolean; loading: boolean;
  authorize: (username: string, password: string) => Promise<boolean|null>
} {
  const [authorizationToken, setAuthorizationToken] = useState<string | null | boolean>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const authorize = async (username: string, password: string): Promise<boolean|null> => {
    setLoading(true);
    let authorizeResult = null;
    try {
      const response = await window
        .fetch(process.env.REACT_APP_AUTH_URL ?? '', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: username, password }),
        });
      const result = await response.json();
      if ('token' in result) {
        setAuthorizationToken(result.token);
        authorizeResult = true;
      } else {
        authorizeResult = false;
      }
    } catch(error) {
      console.error(error);
      setAuthorizationToken(false);
    } finally {
      setLoading(false);
    }

    return authorizeResult;
  }

  return { authorizationToken, loading, authorize };
}
