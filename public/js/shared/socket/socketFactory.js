var mySocket = function (socketFactory) {
    var mySocket = socketFactory();
    //mySocket.forward('error');
    return mySocket;
};

angular.module("sharedMain").factory("mySocket", ["socketFactory", mySocket]);