function textUpperCase(text: string): string {
  const result = text.replace(/ |'/gi, (x) => {
    return x === ' ' ? (x = '_') : (x = '');
  });
  return result.toLowerCase();
}

export { textUpperCase };
