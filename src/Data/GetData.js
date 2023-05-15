function getData(api) {
  return fetch(api).then((data) => data.json());
}
export default getData;
