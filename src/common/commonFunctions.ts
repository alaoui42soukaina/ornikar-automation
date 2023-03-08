import {expect} from "chai";
import {TestInfo} from "@playwright/test";
export var result : resultType
result = { reportMsg : "", testState : "passed" }

/**
 * Resets the value of the variable result by emptying reportMsg and defaulting to a passed testState
 */
export function resetResult( ) {
    result = { reportMsg : "", testState : "passed" };
}

/**
 * Pushes the test results of the specified tests including status and report message
 * @param testId  Test ID in Qase test repository
 * @param testInfo  The playwright test info corresponding to the current test
 */
export function pushTestResults(testInfo: TestInfo){
    if (testInfo.status == "timedOut" || testInfo.error ) {
        result.testState = "failed";
        if(result.reportMsg==""){
            result.reportMsg = testInfo.error.message
        }
    }

    testInfo.status = result.testState;
    testInfo.annotations.push({type : 'Message', description :result.reportMsg});
}


/**
 * Compares a value that should equal another and logs the error message and the failed test state if the comparison fails.
 * @param expectedData  The data we expect to find
 * @param realData  The data to be verified
 * @param {reportMsg: string; testState: string} result The error messages and testState (failed or passed)
 * @param verificationTitle The title of the verification step
 */
export function expectEquals(expectedData : any, realData : any, result: {reportMsg: string; testState: string}, verificationTitle?:string) {
    try {
        expect(expectedData).equals(realData);
    } catch (Error) {
        if(verificationTitle) {result.reportMsg = result.reportMsg + '\n - ' + verificationTitle}
        result.reportMsg = result.reportMsg + '\n' + "Expected Data : '" + expectedData + "', Observed data : '" + realData + "'" + '\n';
        result.testState = "failed";
    }

    return result
}


/**
 * Compares a value that should contain another and logs the error message and the failed test state if the verification fails.
 * @param expectedData  The data we expect to find
 * @param realData  The data to be verified
 * @param {reportMsg: string; testState: string} result The error messages and testState (failed or passed)
 */
export function expectContains(expectedData : any, realData : any, result: {reportMsg: string; testState: string}, errorTitle?:string ) {
    try {
        expect(realData).contains(expectedData);
    } catch (Error) {
        if (errorTitle) {
            errorTitle = errorTitle + '\n'
        } else {
            errorTitle = ""
        }
        result.reportMsg = result.reportMsg  + '\n' + errorTitle + "Expected '" + expectedData + "' to contain '" + realData + "'";
        result.testState = "failed";
    }
    ;

    return result
}
