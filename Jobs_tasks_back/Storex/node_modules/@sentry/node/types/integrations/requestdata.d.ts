import { EventProcessor, Hub, Integration } from '@sentry/types';
import { addRequestDataToEvent, DEFAULT_USER_INCLUDES, TransactionNamingScheme } from '../requestdata';
declare type RequestDataOptions = {
    /**
     * Controls what data is pulled from the request and added to the event
     */
    include: {
        cookies?: boolean;
        data?: boolean;
        headers?: boolean;
        ip?: boolean;
        query_string?: boolean;
        url?: boolean;
        user?: boolean | Array<typeof DEFAULT_USER_INCLUDES[number]>;
    };
    /** Whether to identify transactions by parameterized path, parameterized path with method, or handler name */
    transactionNamingScheme: TransactionNamingScheme;
    /**
     * Function for adding request data to event. Defaults to `addRequestDataToEvent` from `@sentry/node` for now, but
     * left injectable so this integration can be moved to `@sentry/core` and used in browser-based SDKs in the future.
     *
     * @hidden
     */
    addRequestData: typeof addRequestDataToEvent;
};
/** Add data about a request to an event. Primarily for use in Node-based SDKs, but included in `@sentry/integrations`
 * so it can be used in cross-platform SDKs like `@sentry/nextjs`. */
export declare class RequestData implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    private _options;
    /**
     * @inheritDoc
     */
    constructor(options?: Partial<RequestDataOptions>);
    /**
     * @inheritDoc
     */
    setupOnce(addGlobalEventProcessor: (eventProcessor: EventProcessor) => void, getCurrentHub: () => Hub): void;
}
export {};
//# sourceMappingURL=requestdata.d.ts.map