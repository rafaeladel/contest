function handle(errStatus, errMessage) {
    var errorJson = {
        status: errStatus,
        message: errMessage
    };
    
    return errorJson;
}

module.exports = handle;