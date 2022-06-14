import { useState } from 'react';

export default function useAwaitData(dataRequest: Promise<any>): any | null {
  const [data, setData] = useState<any | null>(null);

  if (dataRequest) {
    dataRequest.then((value: any) => {
      setData(value);
    });
  }

  return data;
}
