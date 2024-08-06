export const skeletonsLoading = (n: number = 8) =>
  Array.from({ length: n }, (_, i) => ({
    key: i,
  }));
