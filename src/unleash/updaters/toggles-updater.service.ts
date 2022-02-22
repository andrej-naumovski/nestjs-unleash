import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { AxiosError } from 'axios'
import {
  REFRESH_INTERVAL,
  UnleashModuleOptions,
  UNLEASH_MODULE_OPTIONS,
} from '..'
import { UnleashFeaturesClient } from '../../unleash-client'
import { ToggleEntity } from '../entity/toggle.entity'
import { ToggleRepository } from '../repository/toggle-repository'
import { BaseUpdater } from './base-updater'

@Injectable()
export class TogglesUpdaterService extends BaseUpdater {
  constructor(
    @Inject(REFRESH_INTERVAL) protected readonly interval: number,
    private readonly features: UnleashFeaturesClient,
    protected readonly scheduler: SchedulerRegistry,
    private readonly toggles: ToggleRepository,
    @Inject(UNLEASH_MODULE_OPTIONS) private options: UnleashModuleOptions,
  ) {
    super()
  }

  isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError
  }

  async update(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      this.options.logger?.info('Refetching feature flags')
      const features = await this.features.getFeatures()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      this.options.logger?.info('Successfully fetched feature flags', {
        features: JSON.stringify(features),
      })

      features.features.forEach((feature) => {
        this.toggles.updateOrCreate(feature.name, new ToggleEntity(feature))
      })
    } catch (error) {
      if (
        this.isAxiosError(error) &&
        error.response?.status === HttpStatus.NOT_FOUND
      ) {
        const { url, baseURL } = error.config

        this.logger.warn(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          `Could not retrieve ${baseURL!}${url!}: ${error.message}`,
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        this.options.logger?.error(
          `Could not retrieve ${baseURL!}${url!}: ${error.message}`,
        )
      }
    }
  }
}
