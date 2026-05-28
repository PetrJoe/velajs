export function pascalCase(value: string) {
  return value
    .replace(/[-_\s]+(.)?/g, (_, character: string = "") => character.toUpperCase())
    .replace(/^(.)/, (character) => character.toUpperCase());
}

export function camelCase(value: string) {
  const pascal = pascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export function kebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function pluralize(value: string) {
  return value.endsWith("s") ? value : `${value}s`;
}
