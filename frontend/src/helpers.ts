const toTitleCase = (str: string) => str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())

export {
  toTitleCase,
}
