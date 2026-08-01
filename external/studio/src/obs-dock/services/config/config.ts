export async function init(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
}
