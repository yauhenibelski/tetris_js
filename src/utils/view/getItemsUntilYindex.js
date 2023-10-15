const getItemsUntilYIndex = (items, index) => {
  return items.filter((elem) => Number(elem.getAttribute('y')) < index);
};

export default getItemsUntilYIndex;