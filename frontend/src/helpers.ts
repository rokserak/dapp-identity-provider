const toTitleCase = (str: string) => str.toLowerCase().replace(/(^|\s)\S/g, s => s.toUpperCase())

export {
  toTitleCase,
}
