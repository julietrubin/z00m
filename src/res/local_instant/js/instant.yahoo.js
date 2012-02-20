var Instant = {};

YUI().use('node', 'event', 'io', 'jsonp', 'yql', function(Y) {
    
    var _api = "http://beta.local.yahoo.com/v1",
        _cat = {
            301:  'News',
            700:  'Deal',
            1000: 'Event',
            1200: 'Video',
            1100: 'Movies',
            1101: 'Movies',
            1300: 'Article'
        };
    
    Instant = {
        
        map: null,
        zones: {},
        feeds: {},
        
        init: function () {
            Y.jsonp(_api + "/woemap?woeid=2487956&format=json&callback={callback}",
                    Y.bind(this.initMap, this));
        },
        
        initMap: function (response) {
            this.map = new YMap(document.getElementById('map'));
            this.map.setMapType(YAHOO_MAP_REG);
            
            this.initZones(response);
            
            var geoPoints = [];
            for (var woeid in this.zones) {
                if (this.zones.hasOwnProperty(woeid)) {
                    var zone = this.zones[woeid];
                    
                    var geoPoint = new YGeoPoint(zone.latitude, zone.longitude);
                    geoPoints.push(geoPoint);
                    
                    var marker = new YMarker(geoPoint);
                    var markerHTML = TrimPath.render("tmpl-marker", {
                        zone: zone
                    });
                    marker.addAutoExpand(markerHTML);
                    
                    this.map.addOverlay(marker);
                }
            }
            
            var config = this.map.getBestZoomAndCenter(geoPoints);
            this.map.drawZoomAndCenter(config.YGeoPoint, config.zoomLevel);
        },
        
        initZones: function (response) {
            var parent, zones;
            
            if (!response) {
                throw new Error("Empty API reponse when fetching zones.");
            }
            
            if (!(parent = (response.results && response.results.node))) {
                throw new Error("No parent zone found.");
            }
            
            if (!(zones = (parent.supported && parent.supported.node))) {
                throw new Error("No child zones found.");
            }
            
            for (var i = 0; i < zones.length; i++) {
                var zone = zones[i];
                this.zones[zone.woeid] = zone;
            }
        },
        
        showFeed: function (woeid) {
            var feedNode = Y.one("#feed-" + woeid);
            if (feedNode) {
                Y.one('#feed').all('.feed').setStyle('display', 'none');
                feedNode.setStyle('display', 'block');
                
                var zone = this.zones[woeid];
                Y.one('#feed').one('h2').set('innerHTML', zone.name);
            } else {
                Y.jsonp(_api + "/documents?woeid=" + woeid + "&count=5&sort=rank&order=asc&my.rank=1_&my.primaryscore=0_&format=json&callback={callback}",
                        Y.bind(this.initFeed, this, woeid));
            }
        },
        
        initFeed: function (woeid, response) {
            var docs;
            
            if (!response) {
                throw new Error("Empty API reponse when fetching documents.");
            }
            
            if (!(docs = response.document)) {
                throw new Error("No documents found.");
            }
            
            var feedHTML = TrimPath.render("tmpl-feed", {
                zone: this.zones[woeid],
                docs: docs
            });
            
            Y.one('#feed').append(feedHTML);
            
            this.showFeed(woeid);
        }
        
    };
    
    TrimPath.addModifiers({
        truncate: function (string, length) {
            return string.substring(0, length);
        },
        category: function (catid) {
            return _cat[catid];
        }
    });
    
    Y.on('domready', Instant.init, Instant);
});
