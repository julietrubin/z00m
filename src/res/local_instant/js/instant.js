var Instant = {};

if (typeof WoeMap === "undefined") {
    var WoeMap = null;
}

YUI().use('node', 'event', 'io', 'jsonp', 'yql', function(Y) {
    
    var _uri = "http://beta.local.yahoo.com",
        _api = _uri + "/v1",
        _cat = {
            301:  'News',
            700:  'Deal',
            1000: 'Event',
            1200: 'Video',
            1100: 'Movies',
            1101: 'Movies',
            1300: 'Article'
        },
        _appid = "XuWwwjDV34H5LeapHQN5IQjRF68HtvqnyoiZZmLids8kKtOefwjfxZHKf2o5kiY-",
        _regionConfig = {
            active: {
                strokeColor: "#7109AA",
                strokeOpacity: 0.7,
                strokeWeight: 1,
                fillColor: "#7109AA",
                fillOpacity: 0.3,
            },
            inactive: {
                strokeColor: "#000000",
                strokeOpacity: 0,
                strokeWeight: 0,
                fillColor: "#000000",
                fillOpacity: 0.1,
            }
        };
    
    Instant = {
        
        map: null,
        zones: {},
        feeds: {},
        loading: 0,
        regions: {},
        marker: null,
        selected: null,
        
        init: function () {
            var hashwoeid = window.location.hash;
            if (hashwoeid) {
                hashwoeid = hashwoeid.replace(/#/, '');
                this.selected = hashwoeid;
            }
            
            if (WoeMap) {
                this.initMap(WoeMap["sf"]);
            } else {
                // Use '2459115' for New York.
                Y.jsonp(_api + "/woemap?woeid=2487956&format=json&callback={callback}",
                        Y.bind(this.initMap, this));
            }
            
            if (hashwoeid) {
                this.showFeed(hashwoeid);
            }
            
            var bodyNode  = Y.one('#content'),
                hfHeight  = 135;
            this.resize = function () {
                var height = Y.one('window').get('innerHeight');
                
                bodyNode.setStyle('height', (height - hfHeight) + 'px');
            };
            this.resize();
            Y.one('window').on('resize', this.resize, this);
            
            Y.one('#feed').on('mouseover', this.toggleMarker, this);
            
            Y.on("discover", this.showDiscovery, this);
        },
        
        resize: null,
        
        initMap: function (response) {
            this.map = new google.maps.Map(document.getElementById("map"), {
                scrollwheel: false,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.ZOOM_PAN,
                    position: google.maps.ControlPosition.TOP_RIGHT
                },
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                zoom: 13,
                center: new google.maps.LatLng(37.773492302, -122.41791140),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            google.maps.event.addListener(this.map, 'rightclick', Y.bind(this.findPlace, this));
            
            this.initZones(response);
        },
        
        showDiscovery: function (zone) {
            Y.log("Discovered a new zone: " + zone.name + " (" + zone.woeid + ")");
            Y.log(zone);
            
            var latLng = new google.maps.LatLng(zone.latitude, zone.longitude);
            this.map.panTo(latLng);
            
            this.showFeed(zone.woeid);
            
            if (this.regions[this.selected]) {
                this.regions[this.selected].setOptions(_regionConfig.inactive);
            }
            
            this.regions[zone.woeid].setOptions(_regionConfig.active);
        },
        
        findPlace: function (e) {
            var latLng = {
                lat: e.latLng.va,
                lng: e.latLng.wa
            };
            
            var yquery = "select * from geo.placefinder where text=\"" + latLng.lat + " " + latLng.lng + "\" and gflags=\"RA\"";
            
            // YUI's default YQL env does not have the geo.placefinder table.
            var yqlReq = new Y.YQLRequest(yquery, Y.bind(this.findZone, this, e));
            delete yqlReq._params.env;
            yqlReq.send();
        },
        
        findZone: function (e, response) {
            var place;
            
            if (!response || !response.query) {
                throw new Error("Empty API reponse when finding place.");
            }
            
            if (!(place = (response.query.results && response.query.results.Result))) {
                throw new Error("No place found.");
            }
            
            var yquery = "select * from geo.places where text=\"" + place.neighborhood + "\" and placetype = 22";
            
            Y.YQL(yquery, Y.bind(this.showPlace, this, e));
        },
        
        showPlace: function (e, response) {
            var place;
            
            if (!response || !response.query) {
                throw new Error("Empty API reponse when finding place.");
            }
            
            if (!(place = response.query.results && response.query.results.place)) {
                throw new Error("No place found.");
            }
            
            place.discovered = true;
            this.zones[place.woeid] = place;
            
            var yquery = "select * from flickr.places.info where woe_id = " + place.woeid;
            
            Y.YQL(yquery, Y.bind(this.initZone, this, place));
        },
        
        initZones: function (response) {
            var parent, zones;
            
            if (!response) {
                throw new Error("Empty API reponse when fetching zones.");
            }
            
            if (WoeMap) {
                zones = response;
            } else {
                if (!(parent = (response.results && response.results.node))) {
                    throw new Error("No parent zone found.");
                }
                
                if (!(zones = (parent.supported && parent.supported.node))) {
                    throw new Error("No child zones found.");
                }
            }
            
            for (var i = 0; i < zones.length; i++) {
                var zone = zones[i];
                this.zones[zone.woeid] = zone;
                
                var woeids = (zone.descendants && zone.descendants.descendant) || [];
                if (zone.children) {
                    for (var j = 0; j < zone.children.length; j++) {
                        woeids.push(zone.children[j].woeid);
                    }
                }
                if (woeids.indexOf(zone.woeid) < 0) {
                    woeids.push(zone.woeid);
                }
                
                var yquery = "select * from flickr.places.info where woe_id IN (" + woeids.join(",") + ")";
                
                this.loading++;
                Y.YQL(yquery, Y.bind(this.initZone, this, zone));
            }
        },
        
        initZone: function (zone, response) {
            var results, places;
            
            if (!response) {
                throw new Error("Empty API reponse when fetching YQL data.");
            }
            
            if (!(results = (response.query && response.query.results))) {
                throw new Error("No YQL data found.");
            }
            
            if (!(places = results.place)) {
                throw new Error("No places returned from YQL.");
            }
            
            this.loading--;
            
            var polylines = [];
            if (!places[0]) {
                places = [places];
            }
            
            for (var i = 0; i < places.length; i++) {
                var place = places[i];
                
                if (place.shapedata) {
                    polylines.push(place.shapedata.polylines.polyline.split(" "));
                }
            }
            
            zone.polylines = polylines;
            zone.latitude  = place.latitude;
            zone.longitude = place.longitude;
            
            this.drawZone(zone);
            
            if (this.loading === 0) {
                this.updateMap();
            }
            
            if (zone.discovered) {
                Y.fire("discover", zone);
            }
        },
        
        drawZone: function (zone) {
            if (zone.polylines.length > 0) {
                var regionCoords = [],
                    polylines    = zone.polylines;
                
                for (var i = 0; i < polylines.length; i++) {
                    var polyline = polylines[i],
                        coords   = [];
                    
                    for (var j = 0; j < polyline.length; j++) {
                        var polypt = polyline[j].split(","),
                            latLng = new google.maps.LatLng(polypt[0], polypt[1]);
                        
                        coords.push(latLng);
                    }
                    
                    regionCoords.push(coords);
                }
                
                var region = new google.maps.Polygon({
                    paths: regionCoords,
                    map: this.map
                });
                
                if (zone.woeid === this.selected) {
                    region.setOptions(_regionConfig.active);
                } else {
                    region.setOptions(_regionConfig.inactive);
                }
                
                this.regions[zone.woeid] = region;
                
                google.maps.event.addListener(region, 'click', Y.bind(function (woeid) {
                    this.selected = woeid;
                    window.location.hash = woeid;
                }, this, zone.woeid));
                
                google.maps.event.addListener(region, 'mouseover', Y.bind(function (woeid) {
                    this.showFeed(woeid);
                    
                    if (this.regions[this.selected]) {
                        this.regions[this.selected].setOptions(_regionConfig.inactive);
                    }
                    
                    this.regions[woeid].setOptions(_regionConfig.active);
                }, this, zone.woeid));
                
                google.maps.event.addListener(region, 'mouseout', Y.bind(function (woeid) {
                    this.regions[woeid].setOptions(_regionConfig.inactive);
                    
                    if (this.regions[this.selected]) {
                        this.showFeed(this.selected);
                        this.regions[this.selected].setOptions(_regionConfig.active);
                    }
                }, this, zone.woeid));
            } else {
                Y.log("Unknown polylines for " + zone.name + " (" + zone.woeid + ").");
            }
        },
        
        updateMap: function () {
            var bounds = null;
            
            for (var woeid in this.zones) {
                if (this.zones.hasOwnProperty(woeid)) {
                    var zone = this.zones[woeid];
                    
                    var latlng = new google.maps.LatLng(zone.latitude, zone.longitude);
                    if (!bounds) {
                        bounds = new google.maps.LatLngBounds(latlng);
                    } else {
                        bounds.extend(latlng);
                    }
                }
            }
            
            this.map.fitBounds(bounds);
        },
        
        showFeed: function (woeid) {
            var feedNode = Y.one("#feed-" + woeid);
            if (feedNode) {
                var msgNode = Y.one('#feed').one('h2');
                if (msgNode) {
                    msgNode.remove();
                }
                
                Y.one('#feed').all('.feed').setStyle('display', 'none');
                feedNode.setStyle('display', 'block');
                
                var zone = this.zones[woeid];
                Y.one('#header').one('h1').set('innerHTML', zone.name);
            } else {
                Y.jsonp(_api + "/documents?woeid=" + woeid + "&count=10&sort=rank&order=asc&my.rank=1_&my.primaryscore=0_&format=json&callback={callback}",
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
        },
        
        toggleMarker: function (e) {
            var docNode = e.target.ancestor('.doc', true);
            
            if (docNode) {
                latlng = docNode.getAttribute('data-latlng').split(';');
                latlng = new google.maps.LatLng(latlng[0], latlng[1]);
                
                if (!this.marker) {
                    this.marker = new google.maps.Marker({
                        position: latlng,
                        map: this.map
                    });
                } else {
                    if (!this.marker.getPosition().equals(latlng)) {
                        this.marker.setPosition(latlng);
                        this.marker.setVisible(true);
                    }
                }
            } else if (this.marker) {
                this.marker.setVisible(false);
            }
        }
        
    };
    
    TrimPath.addModifiers({
        truncate: function (string, length) {
            return string.substring(0, length);
        },
        category: function (catid) {
            return _cat[catid];
        },
        prettyDate: function (isodate) {
            var d = new Date();
            d.setISO8601(isodate)
            return d.format("mediumDate") + " @ " + d.format("shortTime");
        },
        link: function (doc) {
            if (!doc.link) {
                return _uri + "/" + doc.seourl + "?woeid=" + doc.documentwoeid;
            }
            return doc.link;
        }
    });
    
    Y.on('domready', Instant.init, Instant);
});

Date.prototype.setISO8601 = function (string) {
    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    var d = string.match(new RegExp(regexp));

    var offset = 0;
    var date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    time = (Number(date) + (offset * 60 * 1000));
    this.setTime(Number(time));
};
