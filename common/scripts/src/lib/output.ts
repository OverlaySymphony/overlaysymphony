import chalk from "chalk"

export function title(message: string): string {
  return `${chalk.white(message)}`
}

export function label(message: string): string {
  return `${chalk.bold(message)}`
}

export function value(message: string): string {
  return `${chalk.cyan(message)}`
}

export function cmd(message: string): string {
  return `${chalk.yellow(message)}`
}

export function error(message: string): string {
  return `${chalk.red(message)}`
}

export function print(message: string): void {
  // eslint-disable-next-line no-console
  console.log(message)
}

export default {
  title,
  label,
  value,
  cmd,
  error,
  print,
}
