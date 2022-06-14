export default function useMapApiData(): (apiData: any) => any {
  const mapApiData = (apiData: any): any => {
    if (!apiData) {
      return null;
    }

    if (apiData['@type'] === 'hydra:Collection') {
      const mappedData: any = {};
      mappedData.totalItems = apiData['hydra:totalItems'];
      mappedData.items = apiData['hydra:member'];

      return mappedData;
    } else {
      if (!('id' in apiData) && '@id' in apiData) {
        const idString = apiData['@id'];
        if (idString.indexOf('?id=') >= 0) {
          apiData.id = parseInt(idString.split('?id=')[1]);
        } else {
          apiData.id = null;
        }
      }
    }

    return apiData;
  };

  return mapApiData;
}
