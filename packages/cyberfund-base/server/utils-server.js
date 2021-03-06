var Future = Npm.require("fibers/future");

_.extend(CF.Utils, {
    /**
     * aimed to return resolved promises from methods. i.e. if method uses promises inside
     * , we can use `return CF.Utils.extractFromPromise(promise)` to return value from method, not promise.
     * @param promise - promise
     * @returns promise {*}
     */
    extractFromPromise: function extractFromPromise(promise) {
        if (promise.then) {
            var fut = new Future();
            promise.then(function (result) {
                fut["return"](result);
            }, function (error) {
                fut["throw"](error);
            });
            return fut.wait();
        } else { //in case promise already resolved
            return promise;
        }
    },
    escapeRegExp: function escapeRegexp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
});
