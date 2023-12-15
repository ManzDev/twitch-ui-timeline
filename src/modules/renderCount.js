const MAX = 20;

export const renderCount = () => {
  const list = [];
  for (let i = 0; i < MAX; i++) {
    list.push(/* html */`<div class="number">${i + 1}</div>`);
  }
  return list.join("");
};
