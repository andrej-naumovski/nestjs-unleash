import { UnleashModuleOptions } from '.';
import { Request } from '../unleash-strategies';
export declare class UnleashContext<TCustomData = unknown> {
    #private;
    private request;
    private readonly options;
    constructor(request: Request<{
        id: string;
    }>, options: UnleashModuleOptions);
    getUserId(): string | undefined;
    getRemoteAddress(): string | undefined;
    getSessionId(): string | undefined;
    getRequest<T = Request<{
        id: string;
    }>>(): T;
    get customData(): TCustomData | undefined;
    extend(customData: TCustomData | undefined): UnleashContext<TCustomData>;
}
