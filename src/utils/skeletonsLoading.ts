export const skeletonsLoading = (n = 8) =>
  Array.from({ length: n }, (_, i) => ({
    key: i,
  }));
