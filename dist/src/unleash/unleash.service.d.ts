import { Logger } from '@nestjs/common';
import { UnleashStrategiesService } from '../unleash-strategies';
import { MetricsService } from './metrics.service';
import { ToggleRepository } from './repository/toggle-repository';
import { UnleashContext } from './unleash.context';
export declare class UnleashService<TCustomData = unknown> {
    #private;
    private readonly toggles;
    private readonly strategies;
    private readonly metrics;
    private readonly context;
    protected readonly logger: Logger;
    constructor(toggles: ToggleRepository, strategies: UnleashStrategiesService, metrics: MetricsService, context: UnleashContext<TCustomData>);
    isEnabled(name: string, defaultValue?: boolean, customData?: TCustomData): boolean;
}
