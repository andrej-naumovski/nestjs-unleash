import { UnleashContext } from '../../unleash'

export interface UnleashStrategy {
  /**
   * Must match the name you used to create the strategy in your Unleash
   * server UI
   */
  name: string

  /**
   * Determines whether the feature toggle is active
   *
   * @param parameters Custom paramemters as configured in Unleash server UI
   * @param context applicaton/request context, i.e. UserID
   */
  isEnabled(parameters: unknown, context: UnleashContext): boolean
}
