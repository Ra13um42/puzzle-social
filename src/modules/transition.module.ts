let transitionState: Promise<void> = Promise.resolve()
let resolveTransition: (() => void)|null = null

/**
 * Call this before the leave phase of the transition
 */
export function transitionOut (): void {
  transitionState = new Promise(resolve => {
    resolveTransition = resolve
  })
}

/**
 * Call this in the enter phase of the transition
 */
export function transitionIn (): void {
  if (resolveTransition != null) {
    resolveTransition()
    resolveTransition = null
  }
}

/**
 * Await this in scrollBehavior
 */
export function pageTransition (): Promise<void> {
  return transitionState
}
