/**
 * This script is used to download the configuration in a Google spreadsheet.
 */

var fs     = require('fs'),
    http   = require('http'),
    sys    = require('sys');

var config = {
    key: '0AsaNuB7SmOf9dGo2aHdXT1ByaFVTLUszdmxEV0NSeWc',
    worksheetId: '1'
};

var debug = {
    enabled: false,
    log: function (msg) {
        if (this.enabled) {
            sys.puts(msg);
        }
    }
};

var Worksheet = function (key, worksheetId) {
    this.key = key;
    this.worksheetId = worksheetId;
};
(function (proto) {
    
    proto.host = 'spreadsheets.google.com';
    proto.port = 443;
    
    proto.cols = [
        'townname', 'suburb', 'tartinepage', 'suburbwoeid', 'townwoeid', 'release', 'state'
    ];
    
    proto.path = function () {
        return '/feeds/list/' + this.key + '/' + this.worksheetId + '/public/values?alt=json';
    };
    
    proto.feed = function (callback, context) {
        if (!context) {
            context = this;
        }
        
        var c = http.createClient(443, this.host, true),
            r = c.request('GET', this.path(), { host: this.host });
        
        debug.log("Initialized request. [" + this.host + this.path() + "]");
        
        r.end();
        r.addListener('response', function (resp) {
            var body = [];
            
            resp.setEncoding('utf8');
            resp.on('data', function (data) {
                body.push(data)
            });
            resp.on('end', function () {
                callback.call(context, body.join(''));
            });
        });
    };
    
    proto.parse = function (data) {
        data = JSON.parse(data.toString());
        
        var rows = [];
        
        var entries = data.feed.entry;
        for (var i = 0, max = entries.length; i < max; i++) {
            var row = this.parseEntry(entries[i]);
            rows.push(row);
        }
        
        return rows;
    };
    
    proto.parseEntry = function (entry) {
        var row = {};
        
        for (var i = 0, max = this.cols.length; i < max; i++) {
            var col = this.cols[i];
            row[col] = entry['gsx$' + col]['$t'];
        }
        
        return row;
    };
    
})(Worksheet.prototype);

debug.log("Script initialized.");

var sheet = new Worksheet(config.key, config.worksheetId);

sheet.feed(function (data) {
    sys.puts(JSON.stringify(this.parse(data)));
}, sheet);
