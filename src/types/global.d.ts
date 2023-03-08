export {};

declare global {

    type resultType = {
        reportMsg: string;
        testState: "skipped" | "failed" | "passed" | "timedOut";
    };
}