function search(items, query = "", searchParam = []) {
  if (items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          String(item[newItem]).toLowerCase().indexOf(query?.toLowerCase()) > -1
        );
      });
    });
  } else return [];
}

export { search };
