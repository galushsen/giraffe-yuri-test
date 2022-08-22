
const endpoint = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cf7be2b7-3ade-484e-b98e-9d470cbbbb5b/cadastres_footprints_roads.geojson?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220819%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220819T104829Z&X-Amz-Expires=86400&X-Amz-Signature=c36cec9113c0b5066f284e5f1b0bfac81b1a478dd0c556b8399b1560bf805c8c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22cadastres%2520footprints%2520roads.geojson%22&x-id=GetObject';

export const getGeo = async () => {
  const response = await fetch(endpoint);
  const featureCollection = await response.json();

  return featureCollection;
}