var dbParams = require("./parameters").db;
var mongoose = require("mongoose");
var errorHandler = require("../util/errorHandler");
var _ = require("lodash");

function dbConnect() {
    this.connected = null;
    var self = this;
    return {
        connect: function(callback){
            var cs = getConnectionString(dbParams);
            mongoose.connect(cs);

            var connection = mongoose.connection;

            connection.once("open", function() {
                self.connected = true;
                console.log("db conneciton opened"); 
            });

            connection.on("connected", function() {
                self.connected = true;
                if(typeof callback == "Function") callback(self.connected);
                console.log("database connected");
            });

            connection.on("error", function(err) {
                self.connected = false;
                throw err; 
            });

            connection.on("disconnected", function() {
                self.connected = false;
                console.log("database disconnected"); 
            });
        },
        isConnected: function() {
            return self.connected;
        }
    }
}


function getConnectionString(dbParams)
{
    if(!dbParams.hasOwnProperty("name") || dbParams.name == "" || dbParams.name == undefined) {
        throw new Error({status: 500, message: "Database name is required"});
    }
    
    var host = dbParams.host || "localhost",
        port = dbParams.port || 27017;
    
    var cs = _.template("mongodb://<%= host %>:<%= port %>/<%= name %>", {
        host: host,
        port: port,
        name: dbParams.name
    });
    
    return cs;
    
}

module.exports = new dbConnect();