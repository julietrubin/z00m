Function.prototype.bind = function() {
    var __method = this,
    args = $A(arguments),
    object = args.shift();
    return function() {
        return __method.apply(object, args.concat($A(arguments)));
        
    };
    
};

$A = Array.from = function(iterable) {
    if (!iterable) {
        return [];
        
    }
    if (iterable.toArray) {
        return iterable.toArray();
        
    } else {
        var results = [];
        for (var i = 0; i < iterable.length; i++) {
            results.push(iterable[i]);
            
        }
        return results;
        
    }
    
};

var sys=require('sys');
var http = require('http');

var rows = [["San Jose","Almaden Meadows","Almaden Valley","55970994","2488042","2/1/11","ca"],
["San Jose","Almaden Springs","Almaden Valley","55970995","2488042","2/1/11","ca"],
["San Jose","Almaden Valley","Almaden Valley","28751145","2488042","2/1/11","ca"],
["San Jose","Almaden Winery","Almaden Valley","55970996","2488042","2/1/11","ca"],
["San Jose","California Ridge","Almaden Valley","55971051","2488042","2/1/11","ca"],
["San Jose","Cinnabar","Almaden Valley","55971076","2488042","2/1/11","ca"],
["San Jose","Creekside","Almaden Valley","55971097","2488042","2/1/11","ca"],
["San Jose","Crossgate","Almaden Valley","55971098","2488042","2/1/11","ca"],
["San Jose","Croydon","Almaden Valley","55971099","2488042","2/1/11","ca"],
["San Jose","Glen Crest","Almaden Valley","55971153","2488042","2/1/11","ca"],
["San Jose","Glenview Serenity","Almaden Valley","55971154","2488042","2/1/11","ca"],
["San Jose","Gold Creek","Almaden Valley","55971156","2488042","2/1/11","ca"],
["San Jose","Graystone","Almaden Valley","55971160","2488042","2/1/11","ca"],
["San Jose","Guadalupe Oak Grove","Almaden Valley","55971165","2488042","2/1/11","ca"],
["San Jose","Holland","Almaden Valley","55971179","2488042","2/1/11","ca"],
["San Jose","Montego","Almaden Valley","55971241","2488042","2/1/11","ca"],
["San Jose","Montevideo","Almaden Valley","55971243","2488042","2/1/11","ca"],
["San Jose","Mountain Shadows","Almaden Valley","55971249","2488042","2/1/11","ca"],
["San Jose","Noddin","Almaden Valley","55971255","2488042","2/1/11","ca"],
["San Jose","Oak Canyon","Almaden Valley","55971262","2488042","2/1/11","ca"],
["San Jose","Orchard Creek","Almaden Valley","55971270","2488042","2/1/11","ca"],
["San Jose","Pepper Tree","Almaden Valley","55971281","2488042","2/1/11","ca"],
["San Jose","Pierce Ranch","Almaden Valley","55971285","2488042","2/1/11","ca"],
["San Jose","Shadow Brook","Almaden Valley","55971321","2488042","2/1/11","ca"],
["San Jose","Silver Crest","Almaden Valley","55971329","2488042","2/1/11","ca"],
["San Jose","Singletree","Almaden Valley","55971332","2488042","2/1/11","ca"],
["San Jose","South Creekside","Almaden Valley","55971334","2488042","2/1/11","ca"],
["San Jose","Sunrise Almaden","Almaden Valley","55971346","2488042","2/1/11","ca"],
["San Jose","The Almaden Villas","Almaden Valley","55971356","2488042","2/1/11","ca"],
["San Jose","Woodside of Almaden","Almaden Valley","55971386","2488042","2/1/11","ca"],
["San Jose","Alum Rock Ave","Alum Rock/East Foothills","55970997","2488042","2/1/11","ca"],
["San Jose","Alum Rock/East Foothills","Alum Rock/East Foothills","2354020","2488042","2/1/11","ca"],
["San Jose","Barletta","Alum Rock/East Foothills","55971012","2488042","2/1/11","ca"],
["San Jose","Baton Rouge","Alum Rock/East Foothills","55971014","2488042","2/1/11","ca"],
["San Jose","Candlestick","Alum Rock/East Foothills","55971052","2488042","2/1/11","ca"],
["San Jose","Cimarron","Alum Rock/East Foothills","55971073","2488042","2/1/11","ca"],
["San Jose","Clareview","Alum Rock/East Foothills","55971078","2488042","2/1/11","ca"],
["San Jose","Clayton North","Alum Rock/East Foothills","55971079","2488042","2/1/11","ca"],
["San Jose","Clayton South","Alum Rock/East Foothills","55971080","2488042","2/1/11","ca"],
["San Jose","Cornwall","Alum Rock/East Foothills","55971088","2488042","2/1/11","ca"],
["San Jose","Eastside","Alum Rock/East Foothills","55971124","2488042","2/1/11","ca"],
["San Jose","Fenton","Alum Rock/East Foothills","55971134","2488042","2/1/11","ca"],
["San Jose","Florence","Alum Rock/East Foothills","55971139","2488042","2/1/11","ca"],
["San Jose","Florence Court","Alum Rock/East Foothills","55971140","2488042","2/1/11","ca"],
["San Jose","Gawain","Alum Rock/East Foothills","55971151","2488042","2/1/11","ca"],
["San Jose","Granite Creek","Alum Rock/East Foothills","55971159","2488042","2/1/11","ca"],
["San Jose","La Pala South","Alum Rock/East Foothills","55971197","2488042","2/1/11","ca"],
["San Jose","Malabar","Alum Rock/East Foothills","55971222","2488042","2/1/11","ca"],
["San Jose","Mayglen","Alum Rock/East Foothills","55971229","2488042","2/1/11","ca"],
["San Jose","Mt. Pleasant North","Alum Rock/East Foothills","55971247","2488042","2/1/11","ca"],
["San Jose","Mt. Pleasant South","Alum Rock/East Foothills","55971248","2488042","2/1/11","ca"],
["San Jose","Nob Hill","Alum Rock/East Foothills","55971253","2488042","2/1/11","ca"],
["San Jose","Rodgers","Alum Rock/East Foothills","55971305","2488042","2/1/11","ca"],
["San Jose","Ryan","Alum Rock/East Foothills","55971312","2488042","2/1/11","ca"],
["San Jose","Sierra","Alum Rock/East Foothills","55971326","2488042","2/1/11","ca"],
["San Jose","Tanglewood","Alum Rock/East Foothills","55971352","2488042","2/1/11","ca"],
["San Jose","Toyon","Alum Rock/East Foothills","55971363","2488042","2/1/11","ca"],
["San Jose","Villa East","Alum Rock/East Foothills","55971371","2488042","2/1/11","ca"],
["San Jose","Warmsprings","Alum Rock/East Foothills","55971376","2488042","2/1/11","ca"],
["San Jose","Wilbur","Alum Rock/East Foothills","55971383","2488042","2/1/11","ca"],
["San Jose","Alviso","Alviso-Renaissance","2354063","2488042","2/1/11","ca"],
["San Jose","Renaissance","Alviso-Renaissance","55971298","2488042","2/1/11","ca"],
["San Francisco","Bayview","Bayview/Hunters Point","23512072","2487956","1/12/11","ca"],
["San Francisco","Bayview District","Bayview/Hunters Point","2360462","2487956","1/12/11","ca"],
["San Francisco","Bayview Heights","Bayview/Hunters Point","28751165","2487956","1/12/11","ca"],
["San Francisco","Hunters Point","Bayview/Hunters Point","28751309","2487956","1/12/11","ca"],
["San Francisco","India Basin","Bayview/Hunters Point","55862605","2487956","1/12/11","ca"],
["San Francisco","Little Hollywood","Bayview/Hunters Point","55970957","2487956","1/12/11","ca"],
["San Francisco","Silver Terrace","Bayview/Hunters Point","28751480","2487956","1/12/11","ca"],
["San Francisco","South Basin","Bayview/Hunters Point","55970971","2487956","1/12/11","ca"],
["San Francisco","St Marys Square","Bernal Heights","55970972","2487956","1/12/11","ca"],
["San Francisco","Transmission","Bernal Heights","55970977","2487956","1/12/11","ca"],
["San Francisco","Bernal Heights","Bernal Heights","23512046","2487956","11/16/10","ca"],
["San Francisco","Bernal Heights North","Bernal Heights","55970944","2487956","11/16/10","ca"],
["San Francisco","Bernal Heights South","Bernal Heights","55970945","2487956","11/16/10","ca"],
["San Jose","Battaglia","Berryessa","55971015","2488042","2/1/11","ca"],
["San Jose","Berryessa","Berryessa","2363142","2488042","2/1/11","ca"],
["San Jose","Berryessa Creek","Berryessa","55971017","2488042","2/1/11","ca"],
["San Jose","Boulder","Berryessa","55971026","2488042","2/1/11","ca"],
["San Jose","Capewood","Berryessa","55971056","2488042","2/1/11","ca"],
["San Jose","Cataldi","Berryessa","55971064","2488042","2/1/11","ca"],
["San Jose","Cherrywood","Berryessa","55971072","2488042","2/1/11","ca"],
["San Jose","Knights Bridge","Berryessa","55971193","2488042","2/1/11","ca"],
["San Jose","Majestic","Berryessa","55971220","2488042","2/1/11","ca"],
["San Jose","Morrill","Berryessa","55971245","2488042","2/1/11","ca"],
["San Jose","Noble","Berryessa","55971254","2488042","2/1/11","ca"],
["San Jose","Northwood","Berryessa","55971258","2488042","2/1/11","ca"],
["San Jose","Ohlone","Berryessa","55971266","2488042","2/1/11","ca"],
["San Jose","Old Piedmont","Berryessa","55971267","2488042","2/1/11","ca"],
["San Jose","Old Port","Berryessa","55971268","2488042","2/1/11","ca"],
["San Jose","Piedmont","Berryessa","55971283","2488042","2/1/11","ca"],
["San Jose","Piedmont Hills","Berryessa","55971284","2488042","2/1/11","ca"],
["San Jose","Pinnacle","Berryessa","55971288","2488042","2/1/11","ca"],
["San Jose","Ruskin","Berryessa","55971311","2488042","2/1/11","ca"],
["San Jose","Rymar","Berryessa","55971313","2488042","2/1/11","ca"],
["San Jose","Saint Victor","Berryessa","55971315","2488042","2/1/11","ca"],
["San Jose","Sierramont","Berryessa","55971327","2488042","2/1/11","ca"],
["San Jose","Sweigert","Berryessa","55971348","2488042","2/1/11","ca"],
["San Jose","Upper Sierra","Berryessa","55971366","2488042","2/1/11","ca"],
["San Jose","Alamitos","Blossom Valley","2352563","2488042","2/1/11","ca"],
["San Jose","Banana Grove","Blossom Valley","55971010","2488042","2/1/11","ca"],
["San Jose","Berry Park","Blossom Valley","55971016","2488042","2/1/11","ca"],
["San Jose","Blossom River","Blossom Valley","55971023","2488042","2/1/11","ca"],
["San Jose","Blossom Valley","Blossom Valley","28751174","2488042","2/1/11","ca"],
["San Jose","Branham","Blossom Valley","55971027","2488042","2/1/11","ca"],
["San Jose","Cahalan","Blossom Valley","55971045","2488042","2/1/11","ca"],
["San Jose","Canoas East","Blossom Valley","55971053","2488042","2/1/11","ca"],
["San Jose","Canoas West","Blossom Valley","55971055","2488042","2/1/11","ca"],
["San Jose","Carson","Blossom Valley","55971060","2488042","2/1/11","ca"],
["San Jose","Colony Green","Blossom Valley","55971085","2488042","2/1/11","ca"],
["San Jose","Comanche","Blossom Valley","55971086","2488042","2/1/11","ca"],
["San Jose","Deer Run","Blossom Valley","55971107","2488042","2/1/11","ca"],
["San Jose","Deer Run 2","Blossom Valley","55971108","2488042","2/1/11","ca"],
["San Jose","Del Robles","Blossom Valley","55971110","2488042","2/1/11","ca"],
["San Jose","Erikson","Blossom Valley","55971128","2488042","2/1/11","ca"],
["San Jose","Foxchase","Blossom Valley","55971144","2488042","2/1/11","ca"],
["San Jose","Hayes","Blossom Valley","55971170","2488042","2/1/11","ca"],
["San Jose","Hidden Glen","Blossom Valley","55971175","2488042","2/1/11","ca"],
["San Jose","Mc Kuen","Blossom Valley","55971230","2488042","2/1/11","ca"],
["San Jose","Oak Grove","Blossom Valley","55971263","2488042","2/1/11","ca"],
["San Jose","Parkview","Blossom Valley","55971277","2488042","2/1/11","ca"],
["San Jose","Pinehurst","Blossom Valley","55971287","2488042","2/1/11","ca"],
["San Jose","Playa Del Rey","Blossom Valley","55971289","2488042","2/1/11","ca"],
["San Jose","Sakamoto","Blossom Valley","55971316","2488042","2/1/11","ca"],
["San Jose","Shadowcrest","Blossom Valley","55971322","2488042","2/1/11","ca"],
["San Jose","Shawnee","Blossom Valley","55971324","2488042","2/1/11","ca"],
["San Jose","Tatra","Blossom Valley","55971353","2488042","2/1/11","ca"],
["San Jose","The Woods","Blossom Valley","55971360","2488042","2/1/11","ca"],
["San Jose","Thousand Oaks","Blossom Valley","55971361","2488042","2/1/11","ca"],
["San Jose","Trade Winds","Blossom Valley","55971364","2488042","2/1/11","ca"],
["San Jose","Walnut Blossom","Blossom Valley","55971375","2488042","2/1/11","ca"],
["San Jose","West Santa Teresa Foothills","Blossom Valley","55971380","2488042","2/1/11","ca"],
["San Francisco","Ashbury Heights","Buena Vista Park/Parnassus","28751153","2487956","1/12/11","ca"],
["San Francisco","Panassus Ashbury Heights","Buena Vista Park/Parnassus","23512052","2487956","1/12/11","ca"],
["San Francisco","Buena Vista Park","Buena Vista Park/Parnassus","23512051","2487956","11/16/10","ca"],
["San Francisco","Corona Heights","Buena Vista Park/Parnassus","23512050","2487956","11/16/10","ca"],
["San Francisco","Parnassus","Buena Vista Park/Parnassus","28751436","2487956","11/16/10","ca"],
["San Jose","Blossom Crest","Cambrian Park","55971021","2488042","2/1/11","ca"],
["San Jose","Branham Jarvis","Cambrian Park","55971028","2488042","2/1/11","ca"],
["San Jose","Branham Kirk","Cambrian Park","55971029","2488042","2/1/11","ca"],
["San Jose","Calderwood","Cambrian Park","55971048","2488042","2/1/11","ca"],
["San Jose","Cambrian Park","Cambrian Park","2373540","2488042","2/1/11","ca"],
["San Jose","Carlton","Cambrian Park","55971058","2488042","2/1/11","ca"],
["San Jose","Clovercrest","Cambrian Park","55971082","2488042","2/1/11","ca"],
["San Jose","Dartmouth","Cambrian Park","55971102","2488042","2/1/11","ca"],
["San Jose","De Voss","Cambrian Park","55971106","2488042","2/1/11","ca"],
["San Jose","Dentwood","Cambrian Park","55971111","2488042","2/1/11","ca"],
["San Jose","Doerr","Cambrian Park","55971113","2488042","2/1/11","ca"],
["San Jose","Dry Creek","Cambrian Park","55971120","2488042","2/1/11","ca"],
["San Jose","Farnam","Cambrian Park","55971133","2488042","2/1/11","ca"],
["San Jose","Hammer","Cambrian Park","55971167","2488042","2/1/11","ca"],
["San Jose","Kooser","Cambrian Park","55971195","2488042","2/1/11","ca"],
["San Jose","Little Branham","Cambrian Park","55971202","2488042","2/1/11","ca"],
["San Jose","Lone Hill Highlands","Cambrian Park","55971211","2488042","2/1/11","ca"],
["San Jose","Los Gatos","Cambrian Park","55971213","2488042","2/1/11","ca"],
["San Jose","Muir","Cambrian Park","55971251","2488042","2/1/11","ca"],
["San Jose","Muir","Cambrian Park","55971251","2488042","2/1/11","ca"],
["San Jose","Oster","Cambrian Park","55971271","2488042","2/1/11","ca"],
["San Jose","Parker","Cambrian Park","55971276","2488042","2/1/11","ca"],
["San Jose","Ponderosa","Cambrian Park","55971292","2488042","2/1/11","ca"],
["San Jose","Rose","Cambrian Park","55971308","2488042","2/1/11","ca"],
["San Jose","The Alta Vista","Cambrian Park","55971357","2488042","2/1/11","ca"],
["San Jose","Valley View","Cambrian Park","55971368","2488042","2/1/11","ca"],
["San Francisco","Chinatown","Chinatown","2379855","2487956","1/12/11","ca"],
["San Francisco","Civic Center","Civic Center/Tenderloin","28288707","2487956","1/12/11","ca"],
["San Francisco","Little Saigon","Civic Center/Tenderloin","55862608","2487956","1/12/11","ca"],
["San Francisco","NOMA","Civic Center/Tenderloin","55970964","2487956","1/12/11","ca"],
["San Francisco","Opera Plaza","Civic Center/Tenderloin","2465778","2487956","1/12/11","ca"],
["San Francisco","Tenderloin","Civic Center/Tenderloin","23512024","2487956","1/12/11","ca"],
["San Francisco","Van Ness","Civic Center/Tenderloin","28751533","2487956","1/12/11","ca"],
["San Francisco","Park View Commons","Cole Valley","2468450","2487956","1/12/11","ca"],
["San Francisco","Cole Valley","Cole Valley","55862600","2487956","11/16/10","ca"],
["San Jose","Autumn","Downtown","55971006","2488042","2/1/11","ca"],
["San Jose","Auzerais","Downtown","55971007","2488042","2/1/11","ca"],
["San Jose","Bonita","Downtown","55971025","2488042","2/1/11","ca"],
["San Jose","Brookwood South","Downtown","55971036","2488042","2/1/11","ca"],
["San Jose","Brookwood Terrace","Downtown","55971037","2488042","2/1/11","ca"],
["San Jose","College Park","Downtown","2383055","2488042","2/1/11","ca"],
["San Jose","Downtown","Downtown","55971118","2488042","2/1/11","ca"],
["San Jose","East Northside","Downtown","55971122","2488042","2/1/11","ca"],
["San Jose","East West Courts","Downtown","55971123","2488042","2/1/11","ca"],
["San Francisco","Financial District South","Downtown","55970949","2487956","1/12/11","ca"],
["San Jose","Five Wounds","Downtown","55971136","2488042","2/1/11","ca"],
["San Francisco","French Quarter","Downtown","55862604","2487956","1/12/11","ca"],
["San Jose","Garden Alameda","Downtown","55971148","2488042","2/1/11","ca"],
["San Jose","Hannah","Downtown","55971168","2488042","2/1/11","ca"],
["San Jose","Hensley","Downtown","55971172","2488042","2/1/11","ca"],
["San Jose","Horace Mann","Downtown","55971183","2488042","2/1/11","ca"],
["San Jose","Hyde Park","Downtown","55971184","2488042","2/1/11","ca"],
["San Jose","Jackson","Downtown","55971185","2488042","2/1/11","ca"],
["San Jose","Japantown","Downtown","28751315","2488042","2/1/11","ca"],
["San Jose","Julian","Downtown","55971188","2488042","2/1/11","ca"],
["San Jose","Lakehouse","Downtown","55971198","2488042","2/1/11","ca"],
["San Jose","Market","Downtown","55971223","2488042","2/1/11","ca"],
["San Jose","McKinley","Downtown","55971232","2488042","2/1/11","ca"],
["San Jose","Naglee Park","Downtown","28751397","2488042","2/1/11","ca"],
["San Jose","Olinder","Downtown","55971269","2488042","2/1/11","ca"],
["San Jose","Park","Downtown","55971275","2488042","2/1/11","ca"],
["San Jose","Paseo","Downtown","55971278","2488042","2/1/11","ca"],
["San Jose","Roosevelt Park","Downtown","55971307","2488042","2/1/11","ca"],
["San Jose","Rosemary Gardens","Downtown","55971310","2488042","2/1/11","ca"],
["San Jose","Saint Leo's","Downtown","55971314","2488042","2/1/11","ca"],
["San Jose","SoFA","Downtown","55971333","2488042","2/1/11","ca"],
["San Jose","The Alameda","Downtown","55971355","2488042","2/1/11","ca"],
["San Francisco","Union Square","Downtown","23524620","2487956","1/12/11","ca"],
["San Jose","Vendome","Downtown","55971369","2488042","2/1/11","ca"],
["San Jose","Vermont","Downtown","55971370","2488042","2/1/11","ca"],
["San Jose","Virginia","Downtown","55971374","2488042","2/1/11","ca"],
["San Jose","West Northside","Downtown","55971378","2488042","2/1/11","ca"],
["San Jose","Wooster","Downtown","55971387","2488042","2/1/11","ca"],
["San Jose","Alvin","East San Jose","55970998","2488042","2/1/11","ca"],
["San Jose","Arbuckle","East San Jose","55971002","2488042","2/1/11","ca"],
["San Jose","Bluewater","East San Jose","55971024","2488042","2/1/11","ca"],
["San Jose","Capitol","East San Jose","55971057","2488042","2/1/11","ca"],
["San Jose","Cassell","East San Jose","55971061","2488042","2/1/11","ca"],
["San Jose","Cinderella","East San Jose","55971075","2488042","2/1/11","ca"],
["San Jose","Coldwater","East San Jose","55971083","2488042","2/1/11","ca"],
["San Jose","Doncaster","East San Jose","55971114","2488042","2/1/11","ca"],
["San Jose","Dorsa","East San Jose","55971115","2488042","2/1/11","ca"],
["San Jose","East Dobern","East San Jose","55971121","2488042","2/1/11","ca"],
["San Jose","East San Jose","East San Jose","55864660","2488042","2/1/11","ca"],
["San Jose","Edge","East San Jose","55971126","2488042","2/1/11","ca"],
["San Jose","Ferrari","East San Jose","55971135","2488042","2/1/11","ca"],
["San Jose","Kennedy","East San Jose","55971190","2488042","2/1/11","ca"],
["San Jose","Kollmar","East San Jose","55971194","2488042","2/1/11","ca"],
["San Jose","Lanai","East San Jose","55971199","2488042","2/1/11","ca"],
["San Jose","Levya","East San Jose","55971201","2488042","2/1/11","ca"],
["San Jose","Lombard","East San Jose","55971209","2488042","2/1/11","ca"],
["San Jose","Markingdon","East San Jose","55971224","2488042","2/1/11","ca"],
["San Jose","Meadow Fair","East San Jose","55971233","2488042","2/1/11","ca"],
["San Jose","Meadows","East San Jose","55971235","2488042","2/1/11","ca"],
["San Jose","Mt. Pleasant","East San Jose","55971246","2488042","2/1/11","ca"],
["San Jose","Ocala","East San Jose","55971265","2488042","2/1/11","ca"],
["San Jose","Overfelt","East San Jose","55971272","2488042","2/1/11","ca"],
["San Jose","Pleasant Knoll","East San Jose","55971290","2488042","2/1/11","ca"],
["San Jose","Poco Way","East San Jose","55971291","2488042","2/1/11","ca"],
["San Jose","Roberts","East San Jose","55971302","2488042","2/1/11","ca"],
["San Jose","Santee & Ferrari","East San Jose","55971318","2488042","2/1/11","ca"],
["San Jose","Stallion","East San Jose","55971336","2488042","2/1/11","ca"],
["San Jose","Stonegate East","East San Jose","55971338","2488042","2/1/11","ca"],
["San Jose","Stonegate West","East San Jose","55971339","2488042","2/1/11","ca"],
["San Jose","Story Road","East San Jose","55971340","2488042","2/1/11","ca"],
["San Jose","Summerside","East San Jose","55971345","2488042","2/1/11","ca"],
["San Jose","Terrace Hills","East San Jose","55971354","2488042","2/1/11","ca"],
["San Jose","Tropicana","East San Jose","55971365","2488042","2/1/11","ca"],
["San Jose","Valle Vista","East San Jose","55971367","2488042","2/1/11","ca"],
["San Jose","Whaley","East San Jose","55971382","2488042","2/1/11","ca"],
["San Jose","Windmill Springs","East San Jose","55971385","2488042","2/1/11","ca"],
["San Jose","Yerba Buena","East San Jose","55971388","2488042","2/1/11","ca"],
["San Jose","Claitor","Edenvale","55971077","2488042","2/1/11","ca"],
["San Jose","Danna Rock","Edenvale","55971101","2488042","2/1/11","ca"],
["San Jose","Davis","Edenvale","55971104","2488042","2/1/11","ca"],
["San Jose","Edenvale","Edenvale","2397051","2488042","2/1/11","ca"],
["San Jose","Great Oaks","Edenvale","55971161","2488042","2/1/11","ca"],
["San Jose","Hellyer","Edenvale","55971171","2488042","2/1/11","ca"],
["San Jose","Locke","Edenvale","55971206","2488042","2/1/11","ca"],
["San Jose","Melody","Edenvale","55971236","2488042","2/1/11","ca"],
["San Jose","Ramblewood","Edenvale","55971295","2488042","2/1/11","ca"],
["San Jose","Riverview","Edenvale","55971301","2488042","2/1/11","ca"],
["San Jose","San Ramon","Edenvale","55971317","2488042","2/1/11","ca"],
["San Jose","Serenade","Edenvale","55971320","2488042","2/1/11","ca"],
["San Jose","Sylvandale East","Edenvale","55971349","2488042","2/1/11","ca"],
["San Jose","Sylvandale West","Edenvale","55971350","2488042","2/1/11","ca"],
["San Jose","Ashbridge","Evergreen","55971004","2488042","2/1/11","ca"],
["San Jose","Brigadoon","Evergreen","55971032","2488042","2/1/11","ca"],
["San Jose","Buena Park","Evergreen","55971040","2488042","2/1/11","ca"],
["San Jose","Cadwallader","Evergreen","55971044","2488042","2/1/11","ca"],
["San Jose","Centerwood","Evergreen","55971066","2488042","2/1/11","ca"],
["San Jose","Century","Evergreen","55971067","2488042","2/1/11","ca"],
["San Jose","Chaboya","Evergreen","55971068","2488042","2/1/11","ca"],
["San Jose","Coyote","Evergreen","55971093","2488042","2/1/11","ca"],
["San Jose","Dove Hill","Evergreen","55971116","2488042","2/1/11","ca"],
["San Jose","Everdale","Evergreen","55971131","2488042","2/1/11","ca"],
["San Jose","Evergreen Hidden Glen","Evergreen","55971132","2488042","2/1/11","ca"],
["San Jose","Fowler","Evergreen","55971143","2488042","2/1/11","ca"],
["San Jose","Heritage","Evergreen","55971173","2488042","2/1/11","ca"],
["San Jose","Holly Oaks","Evergreen","55971180","2488042","2/1/11","ca"],
["San Jose","Kettman","Evergreen","55971192","2488042","2/1/11","ca"],
["San Jose","Meadowlands","Evergreen","55971234","2488042","2/1/11","ca"],
["San Jose","Mirassou Vineyards","Evergreen","55971239","2488042","2/1/11","ca"],
["San Jose","Murillo","Evergreen","55971252","2488042","2/1/11","ca"],
["San Jose","Norwood","Evergreen","55971259","2488042","2/1/11","ca"],
["San Jose","Quimby","Evergreen","55971293","2488042","2/1/11","ca"],
["San Jose","Richmond Ranch","Evergreen","55971299","2488042","2/1/11","ca"],
["San Jose","Silverland","Evergreen","55971331","2488042","2/1/11","ca"],
["San Jose","The Villages","Evergreen","55971358","2488042","2/1/11","ca"],
["San Jose","Yum Yum Tract","Evergreen","55971389","2488042","2/1/11","ca"],
["San Jose","Evergreen-Silver Creek","Evergreen-Silver Creek","2400866","2488042","2/1/11","ca"],
["San Jose","Silver Creek","Evergreen-Silver Creek Valley","55971328","2488042","2/1/11","ca"],
["San Francisco","Balboa Park","Excelsior/Visitacion Valley","55862593","2487956","1/12/11","ca"],
["San Francisco","Balboa Terrace","Excelsior/Visitacion Valley","28751159","2487956","1/12/11","ca"],
["San Francisco","Cayuga Terrace","Excelsior/Visitacion Valley","55970946","2487956","1/12/11","ca"],
["San Francisco","Crocker-Amazon","Excelsior/Visitacion Valley","23512075","2487956","1/12/11","ca"],
["San Francisco","Excelsior","Excelsior/Visitacion Valley","23512074","2487956","1/12/11","ca"],
["San Francisco","Mission Terrace","Excelsior/Visitacion Valley","28751387","2487956","1/12/11","ca"],
["San Francisco","Portola","Excelsior/Visitacion Valley","28751450","2487956","1/12/11","ca"],
["San Francisco","Sunnydale","Excelsior/Visitacion Valley","55970973","2487956","1/12/11","ca"],
["San Francisco","Sunnyside","Excelsior/Visitacion Valley","28751509","2487956","1/12/11","ca"],
["San Francisco","Visitacion Valley","Excelsior/Visitacion Valley","23512073","2487956","1/12/11","ca"],
["San Jose","Seven Trees","Fairgrounds","23417170","2488042","2/1/11","ca"],
["San Jose","Albanese","Fairgrounds","55970985","2488042","2/1/11","ca"],
["San Jose","Alma","Fairgrounds","55970990","2488042","2/1/11","ca"],
["San Jose","Arctic Sue","Fairgrounds","55971003","2488042","2/1/11","ca"],
["San Jose","Bevin Brook","Fairgrounds","55971019","2488042","2/1/11","ca"],
["San Jose","Brenning","Fairgrounds","55971030","2488042","2/1/11","ca"],
["San Jose","Carol Drive","Fairgrounds","55971059","2488042","2/1/11","ca"],
["San Jose","Clinic","Fairgrounds","55971081","2488042","2/1/11","ca"],
["San Jose","Cramer","Fairgrounds","55971094","2488042","2/1/11","ca"],
["San Jose","Creek","Fairgrounds","55971095","2488042","2/1/11","ca"],
["San Jose","Fairgrounds","Fairgrounds","28751237","2488042","2/1/11","ca"],
["San Jose","Garden","Fairgrounds","55971147","2488042","2/1/11","ca"],
["San Jose","Goodyear","Fairgrounds","55971157","2488042","2/1/11","ca"],
["San Jose","Hermes","Fairgrounds","55971174","2488042","2/1/11","ca"],
["San Jose","Hillsdale","Fairgrounds","55971176","2488042","2/1/11","ca"],
["San Jose","Hollywood","Fairgrounds","55971181","2488042","2/1/11","ca"],
["San Jose","Kenwood","Fairgrounds","55971191","2488042","2/1/11","ca"],
["San Jose","Lone Buff","Fairgrounds","55971210","2488042","2/1/11","ca"],
["San Jose","Los Arboles","Fairgrounds","55971212","2488042","2/1/11","ca"],
["San Jose","Monterey Corridor","Fairgrounds","55971242","2488042","2/1/11","ca"],
["San Jose","Monticello","Fairgrounds","55971244","2488042","2/1/11","ca"],
["San Jose","Mountain Spring","Fairgrounds","55971250","2488042","2/1/11","ca"],
["San Jose","O'Brien Tract","Fairgrounds","55971261","2488042","2/1/11","ca"],
["San Jose","Rancho","Fairgrounds","55971296","2488042","2/1/11","ca"],
["San Jose","Rockspring","Fairgrounds","55971304","2488042","2/1/11","ca"],
["San Jose","Spartan","Fairgrounds","55971335","2488042","2/1/11","ca"],
["San Jose","Tamien","Fairgrounds","55971351","2488042","2/1/11","ca"],
["San Jose","Washington","Fairgrounds","55971377","2488042","2/1/11","ca"],
["San Francisco","Financial District","Financial District","23512022","2487956","1/12/11","ca"],
["San Francisco","Jackson Square","Financial District","55970954","2487956","1/12/11","ca"],
["San Francisco","Fisherman's Wharf","Fisherman's Wharf","28288708","2487956","1/12/11","ca"],
["San Francisco","North Waterfront","Fisherman's Wharf","23512020","2487956","1/12/11","ca"],
["San Francisco","Diamond Heights","Glen Park/Diamond Heights","2391888","2487956","1/12/11","ca"],
["San Francisco","Glen Park","Glen Park/Diamond Heights","23512054","2487956","1/12/11","ca"],
["San Francisco","Glenridge","Glen Park/Diamond Heights","2411292","2487956","1/12/11","ca"],
["San Francisco","Haight Ashbury","Haight Ashbury","2416070","2487956","11/16/10","ca"],
["San Francisco","Panhandle","Haight Ashbury","56199821","2487956","1/12/11","ca"],
["San Francisco","Upper Haight","Haight Ashbury","28288712","2487956","1/12/11","ca"],
["San Francisco","Intermission","Hayes Valley/Lower Haight","55970953","2487956","1/12/11","ca"],
["San Francisco","Mint Hill","Hayes Valley/Lower Haight","55970962","2487956","1/12/11","ca"],
["San Francisco","North Park","Hayes Valley/Lower Haight","56199820","2487956","1/12/11","ca"],
["San Francisco","Alamo Square","Hayes Valley/Lower Haight","23512038","2487956","11/16/10","ca"],
["San Francisco","Duboce Triangle","Hayes Valley/Lower Haight","23512047","2487956","11/16/10","ca"],
["San Francisco","Hayes Valley","Hayes Valley/Lower Haight","23512039","2487956","11/16/10","ca"],
["San Francisco","Lower Haight","Hayes Valley/Lower Haight","28288710","2487956","11/16/10","ca"],
["San Francisco","Ingleside","Ingleside","2427166","2487956","1/12/11","ca"],
["San Francisco","Ingleside Heights","Ingleside","23512067","2487956","1/12/11","ca"],
["San Francisco","Ingleside Terrace","Ingleside","28751313","2487956","1/12/11","ca"],
["San Francisco","Lakeside","Ingleside","23512063","2487956","1/12/11","ca"],
["San Francisco","Mount Davidson Manor","Ingleside","28751396","2487956","1/12/11","ca"],
["San Francisco","Oceanview","Ingleside","23512068","2487956","1/12/11","ca"],
["San Francisco","Outer Mission","Ingleside","28751432","2487956","1/12/11","ca"],
["San Francisco","Westwood Park","Ingleside","28751555","2487956","1/12/11","ca"],
["San Francisco","Jordan Park","Laurel Heights/Presidio Heights","2430012","2487956","1/12/11","ca"],
["San Francisco","Lake (Same as Lake District?)","Laurel Heights/Presidio Heights","2487956","2487956","1/12/11","ca"],
["San Francisco","Lake District","Laurel Heights/Presidio Heights","23512031","2487956","1/12/11","ca"],
["San Francisco","Laurel Heights","Laurel Heights/Presidio Heights","23512030","2487956","1/12/11","ca"],
["San Francisco","Laurel Village","Laurel Heights/Presidio Heights","55970956","2487956","1/12/11","ca"],
["San Francisco","Lone Mountain","Laurel Heights/Presidio Heights","23512033","2487956","1/12/11","ca"],
["San Francisco","Presidio","Laurel Heights/Presidio Heights","23512069","2487956","1/12/11","ca"],
["San Francisco","Presidio Heights","Laurel Heights/Presidio Heights","23512029","2487956","1/12/11","ca"],
["San Francisco","Presidio Terrace","Laurel Heights/Presidio Heights","2476459","2487956","1/12/11","ca"],
["San Francisco","Sea Cliff","Laurel Heights/Presidio Heights","2490243","2487956","1/12/11","ca"],
["San Francisco","Amanico Ergina Village","Lower Pacific Heights/Japantown","2354101","2487956","1/12/11","ca"],
["San Francisco","Cathedral Hill","Lower Pacific Heights/Japantown","55862599","2487956","1/12/11","ca"],
["San Francisco","Japantown","Lower Pacific Heights/Japantown","28288709","2487956","1/12/11","ca"],
["San Francisco","Little Osaka","Lower Pacific Heights/Japantown","2440289","2487956","1/12/11","ca"],
["San Francisco","Lower Pacific Heights","Lower Pacific Heights/Japantown","23512037","2487956","1/12/11","ca"],
["San Francisco","Saint Francis Square","Lower Pacific Heights/Japantown","2486769","2487956","1/12/11","ca"],
["San Francisco","St. Francis Square","Lower Pacific Heights/Japantown","2486769","2487956","1/12/11","ca"],
["San Francisco","Zion District","Lower Pacific Heights/Japantown","55970981","2487956","1/12/11","ca"],
["San Francisco","Deco Ghetto","Mission District","55970948","2487956","1/12/11","ca"],
["San Francisco","Inner Mission","Mission District","28751314","2487956","1/12/11","ca"],
["San Francisco","Mission","Mission District","2452334","2487956","1/12/11","ca"],
["San Francisco","Mission Dolores","Mission District","23512048","2487956","1/12/11","ca"],
["San Francisco","The Hub","Mission District","55970976","2487956","1/12/11","ca"],
["San Francisco","Mission District","Mission District","55970963","2487956","11/16/10","ca"],
["San Francisco","Mission Dolores","Mission Dolores","23512048","2487956","11/16/10","ca"],
["Mountain View","Mountain View","Mountain View","2455920","2455920","11/16/10","ca"],
["San Francisco","Lower Nob Hill","Nob Hill","55970959","2487956","1/12/11","ca"],
["San Francisco","Nob Hill","Nob Hill","23512023","2487956","1/12/11","ca"],
["San Francisco","Polk Gulch","Nob Hill","55970967","2487956","1/12/11","ca"],
["San Francisco","Baja Noe","Noe Valley","55970943","2487956","1/12/11","ca"],
["San Francisco","Dolores Heights","Noe Valley","28751213","2487956","1/12/11","ca"],
["San Francisco","Noe Valley","Noe Valley","23512053","2487956","11/16/10","ca"],
["San Francisco","Little Italy","North Beach/Telegraph Hill","2440235","2487956","1/12/11","ca"],
["San Francisco","North Beach","North Beach/Telegraph Hill","2460640","2487956","1/12/11","ca"],
["San Francisco","Telegraph Hill","North Beach/Telegraph Hill","23512021","2487956","1/12/11","ca"],
["San Jose","Alexander","North Valley","55970988","2488042","2/1/11","ca"],
["San Jose","Alexian","North Valley","55970989","2488042","2/1/11","ca"],
["San Jose","Ann Darling","North Valley","55971001","2488042","2/1/11","ca"],
["San Jose","Beverly","North Valley","55971018","2488042","2/1/11","ca"],
["San Jose","Brooktree","North Valley","55971034","2488042","2/1/11","ca"],
["San Jose","Brush Glen","North Valley","55971038","2488042","2/1/11","ca"],
["San Jose","Cedarville","North Valley","55971065","2488042","2/1/11","ca"],
["San Jose","Checkers","North Valley","55971071","2488042","2/1/11","ca"],
["San Jose","Cinco De Mayo","North Valley","55971074","2488042","2/1/11","ca"],
["San Jose","Commodore","North Valley","55971087","2488042","2/1/11","ca"],
["San Jose","Countrybrook","North Valley","55971092","2488042","2/1/11","ca"],
["San Jose","Creekland","North Valley","55971096","2488042","2/1/11","ca"],
["San Jose","Dobern","North Valley","55971112","2488042","2/1/11","ca"],
["San Jose","El Rancho Verde","North Valley","55971127","2488042","2/1/11","ca"],
["San Jose","Flickinger North","North Valley","55971137","2488042","2/1/11","ca"],
["San Jose","Flickinger South","North Valley","55971138","2488042","2/1/11","ca"],
["San Jose","Foss","North Valley","55971142","2488042","2/1/11","ca"],
["San Jose","Gateview","North Valley","55971150","2488042","2/1/11","ca"],
["San Jose","Gilchrist","North Valley","55971152","2488042","2/1/11","ca"],
["San Jose","Gordy","North Valley","55971158","2488042","2/1/11","ca"],
["San Jose","Jose Figueres","North Valley","55971187","2488042","2/1/11","ca"],
["San Jose","Little Portugal North","North Valley","55971203","2488042","2/1/11","ca"],
["San Jose","Little Portugal South","North Valley","55971204","2488042","2/1/11","ca"],
["San Jose","Lochridge","North Valley","55971205","2488042","2/1/11","ca"],
["San Jose","Ludlow","North Valley","55971215","2488042","2/1/11","ca"],
["San Jose","Luz","North Valley","55971216","2488042","2/1/11","ca"],
["San Jose","Mayfair","North Valley","55971226","2488042","2/1/11","ca"],
["San Jose","Mayfair North","North Valley","55971227","2488042","2/1/11","ca"],
["San Jose","Mayfair West","North Valley","55971228","2488042","2/1/11","ca"],
["San Jose","McKay","North Valley","55971231","2488042","2/1/11","ca"],
["San Jose","North Valley","North Valley","28751415","2488042","2/1/11","ca"],
["San Jose","Notting Hill","North Valley","55971260","2488042","2/1/11","ca"],
["San Jose","Pacheco","North Valley","55971273","2488042","2/1/11","ca"],
["San Jose","Penitencia","North Valley","55971280","2488042","2/1/11","ca"],
["San Jose","Pine Hollow","North Valley","55971286","2488042","2/1/11","ca"],
["San Jose","Rock Canyon","North Valley","55971303","2488042","2/1/11","ca"],
["San Jose","Suenos","North Valley","55971342","2488042","2/1/11","ca"],
["San Jose","Townsend","North Valley","55971362","2488042","2/1/11","ca"],
["San Jose","Vinci North","North Valley","55971372","2488042","2/1/11","ca"],
["San Jose","Vinci South","North Valley","55971373","2488042","2/1/11","ca"],
["San Francisco","Pacific Heights","Pacific Heights","23512028","2487956","1/12/11","ca"],
["Palo Alto","Palo Alto","Palo Alto","2467861","2467861","11/16/10","ca"],
["San Francisco","Lake Shore","Park Merced/Stonetown","23512065","2487956","1/12/11","ca"],
["San Francisco","Merced Heights","Park Merced/Stonetown","23512066","2487956","1/12/11","ca"],
["San Francisco","Merced Manor","Park Merced/Stonetown","23512064","2487956","1/12/11","ca"],
["San Francisco","Park Merced","Park Merced/Stonetown","23512070","2487956","1/12/11","ca"],
["San Francisco","Stonestown","Park Merced/Stonetown","2500361","2487956","1/12/11","ca"],
["San Francisco","Inner Parkside","Parkside","23512056","2487956","1/12/11","ca"],
["San Francisco","Outer Parkside","Parkside","23512061","2487956","1/12/11","ca"],
["San Francisco","Parkside","Parkside","23512057","2487956","1/12/11","ca"],
["San Francisco","Pine Lake Park","Parkside","23512062","2487956","1/12/11","ca"],
["San Francisco","Central Waterfront","Potrero/Dogpatch","23512044","2487956","1/12/11","ca"],
["San Francisco","Dogpatch","Potrero/Dogpatch","55862602","2487956","11/16/10","ca"],
["San Francisco","Potrero Flats","Potrero/Dogpatch","55970968","2487956","11/16/10","ca"],
["San Francisco","Potrero Hill","Potrero/Dogpatch","23512045","2487956","11/16/10","ca"],
["San Francisco","Central Richmond","Richmond District","2480952","2487956","1/12/11","ca"],
["San Francisco","Golden Gate Park","Richmond District","23512036","2487956","1/12/11","ca"],
["San Francisco","Inner Richmond","Richmond District","23512032","2487956","1/12/11","ca"],
["San Francisco","Lincoln Park","Richmond District","23512035","2487956","1/12/11","ca"],
["San Francisco","Little Russia","Richmond District","55970958","2487956","1/12/11","ca"],
["San Francisco","Outer Richmond","Richmond District","23512036","2487956","1/12/11","ca"],
["San Francisco","Richmond District","Richmond District","28747611","2487956","1/12/11","ca"],
["San Francisco","Sutro Heights","Richmond District","55970975","2487956","1/12/11","ca"],
["San Jose","River Oaks","River Oaks","55971300","2488042","2/1/11","ca"],
["San Jose","Bascom","Rose Garden","55971013","2488042","2/1/11","ca"],
["San Jose","Buena Vista","Rose Garden","2371353","2488042","2/1/11","ca"],
["San Jose","Burbank","Rose Garden","2371853","2488042","2/1/11","ca"],
["San Jose","Chapman","Rose Garden","55971070","2488042","2/1/11","ca"],
["San Jose","Cory","Rose Garden","55971089","2488042","2/1/11","ca"],
["San Jose","Forest","Rose Garden","55971141","2488042","2/1/11","ca"],
["San Jose","Newhall","Rose Garden","28751403","2488042","2/1/11","ca"],
["San Jose","Parkmoor","Rose Garden","28747617","2488042","2/1/11","ca"],
["San Jose","Rose Garden","Rose Garden","28751469","2488042","2/1/11","ca"],
["San Jose","Shasta Hanchett Park","Rose Garden","55971323","2488042","2/1/11","ca"],
["San Jose","West San Carlos","Rose Garden","55971379","2488042","2/1/11","ca"],
["San Francisco","Russian Hill","Russian Hill","23512019","2487956","1/12/11","ca"],
["San Jose","Almaden Lake","Santa Teresa","55970993","2488042","2/1/11","ca"],
["San Jose","Anderson West","Santa Teresa","55971000","2488042","2/1/11","ca"],
["San Jose","Avenida Espana","Santa Teresa","55971008","2488042","2/1/11","ca"],
["San Jose","Brianna","Santa Teresa","55971031","2488042","2/1/11","ca"],
["San Jose","Burning Tree","Santa Teresa","55971041","2488042","2/1/11","ca"],
["San Jose","Calero","Santa Teresa","55971049","2488042","2/1/11","ca"],
["San Jose","California Maison","Santa Teresa","55971050","2488042","2/1/11","ca"],
["San Jose","Chantilley","Santa Teresa","55971069","2488042","2/1/11","ca"],
["San Jose","Glider","Santa Teresa","55971155","2488042","2/1/11","ca"],
["San Jose","Hillview","Santa Teresa","55971177","2488042","2/1/11","ca"],
["San Jose","Hillview Glen","Santa Teresa","55971178","2488042","2/1/11","ca"],
["San Jose","La Colina","Santa Teresa","55971196","2488042","2/1/11","ca"],
["San Jose","Los Paseos","Santa Teresa","55971214","2488042","2/1/11","ca"],
["San Jose","Makati","Santa Teresa","55971221","2488042","2/1/11","ca"],
["San Jose","Martinvale","Santa Teresa","55971225","2488042","2/1/11","ca"],
["San Jose","Oak Ridge","Santa Teresa","55971264","2488042","2/1/11","ca"],
["San Jose","Perry","Santa Teresa","2470686","2488042","2/1/11","ca"],
["San Jose","Pfieffer","Santa Teresa","55971282","2488042","2/1/11","ca"],
["San Jose","Rancho Santa Teresa","Santa Teresa","55971297","2488042","2/1/11","ca"],
["San Jose","Santa Teresa","Santa Teresa","28751473","2488042","2/1/11","ca"],
["San Jose","Silver Leaf","Santa Teresa","55971330","2488042","2/1/11","ca"],
["San Jose","South Coyote","Santa Teresa","2496130","2488042","2/1/11","ca"],
["San Jose","Sunspring","Santa Teresa","55971347","2488042","2/1/11","ca"],
["San Francisco","Mission Bay","SOMA/Mission Bay","23512043","2487956","1/12/11","ca"],
["San Francisco","SOMA","SOMA/Mission Bay","23512042","2487956","1/12/11","ca"],
["San Francisco","Somisspo","SOMA/Mission Bay","55970970","2487956","1/12/11","ca"],
["San Francisco","Rincon Hill","South Beach","55862610","2487956","1/12/11","ca"],
["San Francisco","South Beach","South Beach","23512041","2487956","1/12/11","ca"],
["Sunnyvale","Sunnyvale","Sunnyvale","2502265","2502265","11/16/10","ca"],
["San Francisco","Central Sunset","Sunset District","2502443","2487956","1/12/11","ca"],
["San Francisco","Doelger City","Sunset District","2392569","2487956","1/12/11","ca"],
["San Francisco","Inner Sunset","Sunset District","23512059","2487956","1/12/11","ca"],
["San Francisco","Inset","Sunset District","55970952","2487956","1/12/11","ca"],
["San Francisco","Outer Sunset","Sunset District","23512060","2487956","1/12/11","ca"],
["San Francisco","Outset","Sunset District","55970965","2487956","1/12/11","ca"],
["San Francisco","Sunset District","Sunset District","55970974","2487956","1/12/11","ca"],
["San Francisco","Eureka Valley","The Castro","28751234","2487956","1/12/11","ca"],
["San Francisco","Eureka Valley Dolores Heights","The Castro","23512049","2487956","1/12/11","ca"],
["San Francisco","Mastro","The Castro","55970961","2487956","1/12/11","ca"],
["San Francisco","Upper Market","The Castro","55970979","2487956","1/12/11","ca"],
["San Francisco","The Castro","The Castro","28288706","2487956","11/16/10","ca"],
["San Francisco","Cow Hollow","The Marina/Cow Hollow","23512027","2487956","1/12/11","ca"],
["San Francisco","Fort Winfield Scott","The Marina/Cow Hollow","2406041","2487956","1/12/11","ca"],
["San Francisco","Marina","The Marina/Cow Hollow","2445714","2487956","1/12/11","ca"],
["San Francisco","Clarendon Heights","Twin Peaks","28751202","2487956","1/12/11","ca"],
["San Francisco","Forest Knolls","Twin Peaks","28751250","2487956","1/12/11","ca"],
["San Francisco","Twin Peaks","Twin Peaks","23512055","2487956","1/12/11","ca"],
["San Francisco","Twin Peaks West","Twin Peaks","55970978","2487956","1/12/11","ca"],
["San Francisco","Vista del Monte","Twin Peaks","2512710","2487956","1/12/11","ca"],
["San Francisco","West of Twin Peaks","Twin Peaks","55970980","2487956","1/12/11","ca"],
["San Francisco","Forest Hill","West Portal/Saint Francis Wood","2405163","2487956","1/12/11","ca"],
["San Francisco","Golden Gate Heights","West Portal/Saint Francis Wood","55970950","2487956","1/12/11","ca"],
["San Francisco","Laguna Heights","West Portal/Saint Francis Wood","2434643","2487956","1/12/11","ca"],
["San Francisco","Laguna Honda","West Portal/Saint Francis Wood","55970955","2487956","1/12/11","ca"],
["San Francisco","Miraloma Park","West Portal/Saint Francis Wood","28751385","2487956","1/12/11","ca"],
["San Francisco","Monterey Heights","West Portal/Saint Francis Wood","28751390","2487956","1/12/11","ca"],
["San Francisco","Saint Francis Wood","West Portal/Saint Francis Wood","55970969","2487956","1/12/11","ca"],
["San Francisco","St. Francis Wood","West Portal/Saint Francis Wood","2486770","2487956","1/12/11","ca"],
["San Francisco","West Portal","West Portal/Saint Francis Wood","28751544","2487956","1/12/11","ca"],
["San Francisco","Westlake and Olympic","West Portal/Saint Francis Wood","23512083","2487956","1/12/11","ca"],
["San Francisco","Westwood Highlands","West Portal/Saint Francis Wood","28751554","2487956","1/12/11","ca"],
["San Jose","Albertstone","West San Jose","55970986","2488042","2/1/11","ca"],
["San Jose","Alderbrook","West San Jose","55970987","2488042","2/1/11","ca"],
["San Jose","Anderson East","West San Jose","55970999","2488042","2/1/11","ca"],
["San Jose","Blackford","West San Jose","55971020","2488042","2/1/11","ca"],
["San Jose","Brookvale","West San Jose","55971035","2488042","2/1/11","ca"],
["San Jose","Bucknail","West San Jose","55971039","2488042","2/1/11","ca"],
["San Jose","Calabazas North","West San Jose","55971046","2488042","2/1/11","ca"],
["San Jose","Calabazas South","West San Jose","55971047","2488042","2/1/11","ca"],
["San Jose","Castro","West San Jose","55971063","2488042","2/1/11","ca"],
["San Jose","Country Lane","West San Jose","55971090","2488042","2/1/11","ca"],
["San Jose","Hathaway","West San Jose","55971169","2488042","2/1/11","ca"],
["San Jose","Joaquin Miller","West San Jose","55971186","2488042","2/1/11","ca"],
["San Jose","Junipero Serra","West San Jose","55971189","2488042","2/1/11","ca"],
["San Jose","Loma Linda","West San Jose","55971207","2488042","2/1/11","ca"],
["San Jose","Lynbrook","West San Jose","55971217","2488042","2/1/11","ca"],
["San Jose","Meridian","West San Jose","55971237","2488042","2/1/11","ca"],
["San Jose","Mitty","West San Jose","55971240","2488042","2/1/11","ca"],
["San Jose","North Lake","West San Jose","55971257","2488042","2/1/11","ca"],
["San Jose","Payne","West San Jose","55971279","2488042","2/1/11","ca"],
["San Jose","Rainbow","West San Jose","55971294","2488042","2/1/11","ca"],
["San Jose","Rancho Rinconada","West San Jose","2478537","2488042","2/1/11","ca"],
["San Jose","Rogers","West San Jose","55971306","2488042","2/1/11","ca"],
["San Jose","Saratoga Creek","West San Jose","55971319","2488042","2/1/11","ca"],
["San Jose","Starbird","West San Jose","55971337","2488042","2/1/11","ca"],
["San Jose","Strawberry Park","West San Jose","55971341","2488042","2/1/11","ca"],
["San Jose","West San Jose","West San Jose","28751546","2488042","2/1/11","ca"],
["San Jose","Westmont","West San Jose","55971381","2488042","2/1/11","ca"],
["San Francisco","Anza Vista","Western Addition","28751149","2487956","1/12/11","ca"],
["San Francisco","Frederick Douglass Haynes Gardens","Western Addition","2407148","2487956","1/12/11","ca"],
["San Francisco","Friendship Village","Western Addition","2407721","2487956","1/12/11","ca"],
["San Francisco","Malcolm X Square","Western Addition","2444438","2487956","1/12/11","ca"],
["San Francisco","Marcus Garvey Square","Western Addition","2445552","2487956","1/12/11","ca"],
["San Francisco","Martin Luther King Square","Western Addition","2446301","2487956","1/12/11","ca"],
["San Francisco","North Panhandle","Western Addition","23512040","2487956","1/12/11","ca"],
["San Francisco","Thomas Paine Square","Western Addition","2505697","2487956","1/12/11","ca"],
["San Francisco","Western Addition","Western Addition","2518113","2487956","1/12/11","ca"],
["San Jose","Almaden","Willow Glen","55970991","2488042","2/1/11","ca"],
["San Jose","Atlanta","Willow Glen","55971005","2488042","2/1/11","ca"],
["San Jose","Avis","Willow Glen","55971009","2488042","2/1/11","ca"],
["San Jose","Barbera","Willow Glen","55971011","2488042","2/1/11","ca"],
["San Jose","Broadway","Willow Glen","55971033","2488042","2/1/11","ca"],
["San Jose","Canoas Garden","Willow Glen","55971054","2488042","2/1/11","ca"],
["San Jose","De Marietta","Willow Glen","55971105","2488042","2/1/11","ca"],
["San Jose","Del Mar","Willow Glen","55971109","2488042","2/1/11","ca"],
["San Jose","Downing","Willow Glen","55971117","2488042","2/1/11","ca"],
["San Jose","Drake","Willow Glen","55971119","2488042","2/1/11","ca"],
["San Jose","Evans","Willow Glen","55971130","2488042","2/1/11","ca"],
["San Jose","Fruitdale College","Willow Glen","55971145","2488042","2/1/11","ca"],
["San Jose","Fruitdale Rexford","Willow Glen","55971146","2488042","2/1/11","ca"],
["San Jose","Gardner","Willow Glen","55971148","2488042","2/1/11","ca"],
["San Jose","Greylands","Willow Glen","55971162","2488042","2/1/11","ca"],
["San Jose","Guadalupe Almaden","Willow Glen","55971163","2488042","2/1/11","ca"],
["San Jose","Guadalupe Canoas","Willow Glen","55971164","2488042","2/1/11","ca"],
["San Jose","Northern Cross","Willow Glen","55971256","2488042","2/1/11","ca"],
["San Jose","Pamlar","Willow Glen","55971274","2488042","2/1/11","ca"],
["San Jose","Rose Glen","Willow Glen","55971309","2488042","2/1/11","ca"],
["San Jose","Sheman Oaks","Willow Glen","55971325","2488042","2/1/11","ca"],
["San Jose","Sherman Oaks","Willow Glen","55971325","2488042","2/1/11","ca"],
["San Jose","Summer Creek","Willow Glen","55971343","2488042","2/1/11","ca"],
["San Jose","Willow Glen","Willow Glen","2521129","2488042","2/1/11","ca"],
["San Jose","Willow Glen South","Willow Glen","55971384","2488042","2/1/11","ca"],
["San Jose","Cadillac East","Winchester","55971042","2488042","2/1/11","ca"],
["San Jose","Cadillac West","Winchester","55971043","2488042","2/1/11","ca"],
["San Jose","Castlemont","Winchester","55971062","2488042","2/1/11","ca"],
["San Jose","Colonial","Winchester","55971084","2488042","2/1/11","ca"],
["San Jose","Cypress","Winchester","55971100","2488042","2/1/11","ca"],
["San Jose","David","Winchester","55971103","2488042","2/1/11","ca"],
["San Jose","Eden","Winchester","55971125","2488042","2/1/11","ca"],
["San Jose","Hamann Park","Winchester","55971166","2488042","2/1/11","ca"],
["San Jose","Lexington","Winchester","55971200","2488042","2/1/11","ca"],
["San Jose","Loma Verde","Winchester","55971208","2488042","2/1/11","ca"],
["San Jose","Lynhaven","Winchester","55971218","2488042","2/1/11","ca"],
["San Jose","Millich","Winchester","55971238","2488042","2/1/11","ca"],
["San Jose","The Villas","Winchester","55971359","2488042","2/1/11","ca"],
["San Jose","Winchester","Winchester","28751565","2488042","2/1/11","ca"],
["San Jose","Winchester","Winchester","55971219","2488042","2/1/11","ca"],
["Chicago","Bucktown","Bucktown","28751187","2379574","1/12/11","il"],
["Chicago","Andersonville","Andersonville/Edgewater","55862592","2379574","1/12/11","il"],
["Chicago","Edgewater","Andersonville/Edgewater","23511950","2379574","1/12/11","il"],
["Chicago","Lakeview","Lakeview/Northalsted","2435620","2379574","1/12/11","il"],
["Chicago","Northalsted","Lakeview/Northalsted","55862595","2379574","1/12/11","il"],
["Chicago","Wrigleyville","Lakeview/Northalsted","23511940","2379574","1/12/11","il"],
["Chicago","Lincoln Park","Lincoln Park/DePaul","28751349","2379574","1/12/11","il"],
["Chicago","DePaul","Lincoln Park/DePaul","28288747","2379574","1/12/11","il"],
["Chicago","Gold Coast","Gold Coast/River East","28297409","2379574","1/12/11","il"],
["Chicago","Magnificent Mile","Gold Coast/River East","28288748","2379574","1/12/11","il"],
["Chicago","Streeterville","Gold Coast/River East","23511927","2379574","1/12/11","il"],
["Chicago","River East","Gold Coast/River East","55986205","2379574","1/12/11","il"],
["Chicago","Uptown","Uptown","23511948","2379574","1/12/11","il"],
["Chicago","Rogers Park","Rogers Park","2483814","2379574","1/12/11","il"],
["Chicago","Lincoln Square","Lincoln Square/Ravenswood","28751350","2379574","1/12/11","il"],
["Chicago","Ravenswood","Lincoln Square/Ravenswood","23511941","2379574","1/12/11","il"],
["Chicago","Roscoe Village","Roscoe Village/North Center","28751468","2379574","1/12/11","il"],
["Chicago","North Center","Roscoe Village/North Center","55986202","2379574","1/12/11","il"],
["Chicago","Wicker Park","Wicker Park","28751557","2379574","1/12/11","il"],
["Chicago","River North","River North/New Eastside","28288751","2379574","1/12/11","il"],
["Chicago","New Eastside","River North/New Eastside","55986200","2379574","1/12/11","il"],
["Evanston","Evanston","Evanston","2400737","2400737","1/12/11","il"],
["Wilmette","Wilmette","Wilmette","2521349","2521349","1/12/11","il"],
["Skokie","Skokie","Skokie","2494367","2494367","1/12/11","il"]];

var cool = {
    woeids : [],
    cities : {},
    states : {},
    pages : {},
    names : {},
    woetable : {},
    generatePath : function(name){
        var chunks = name.split("/");
        var path = chunks[0].replace(/\s+/g, "-");
        path = path.replace(/[^A-Za-z\-]/g, "");
        return path.toLowerCase();
    },
    addNearby : function(){
        var states = Object.keys(this.states);
        for (var x=0; x< states.length; x++){
            var cities = this.states[states[x]];
            //for every city, push myself on every other city.
            for (var a=0; a< cities.length; a++){
                //sys.puts(states[x]+"/"+cities[a].name);
                var city = cities[a];
                var smallSelf = {
                    name : city.name,
                    path : city.path
                };
                for (var b=0; b< cities.length; b++){
                    var newCity = cities[b];
                    
                    if (newCity.name !== city.name){
                        //sys.puts(newCity.name +" !== "+city.name);
                        newCity.nearby.push(smallSelf);
                    }
                }
            }
        }
    },
    transformWoeMap : function(rows){        
        for (var x=0; x< rows.length; x++){
            var obj = {};
            var cool = rows[x];
            obj.metro = cool[0];
            obj.name = cool[1];
            obj.page = cool[2];
            obj.woe = cool[3];
            obj.parent = cool[4];
            obj.state = cool[6];
            
            this.names[obj.woe] = obj.name;
            this.woeids.push(obj);
            
            try{
                this.createCity(obj);
                this.createPage(obj);
            }catch(e){
                sys.log(e.message + " "+ JSON.stringify(obj));
            }
        }
        this.addNearby();
        this.generateWoetable();
        
        return this.cities;
    },
    woeBack : function(oldGuy, resp){
        var newGuy = JSON.parse(resp);
        newGuy = newGuy.query.results.place;
        
        if (newGuy.woeid !== oldGuy.woe){
            sys.log(oldGuy.name+" ("+oldGuy.woe+") is now "+newGuy.name+ " ("+newGuy.woeid+")");
        }else if (oldGuy.name !== newGuy.name){
            sys.log(oldGuy.name+" is now "+newGuy.name);
        }
    },
    checkWoeIDs : function(){
        var delay = 0;
        for (var x=0; x < this.woeids.length; x++){
            var guy = this.woeids[x];
            
            var hostname = "query.yahooapis.com";
            var port = 80;
            var path = "/v1/public/yql?q=select%20*%20from%20geo.places%20where%20woeid%3D%22"+guy.woe+"%22&format=json";
            
            var woeBack = this.woeBack.bind(this, guy);
            
            setTimeout(this.talkToServer.bind(this, hostname, 80, path, true, woeBack), delay);            
            
            delay += 500;
        }
    },
    generateWoetable : function(){
        var metros = Object.keys(this.cities);
        
        for (var x=0; x< metros.length; x++){
            var city = this.cities[metros[x]];
            
            this.woetable[city.name] = [];
            
            if (city.children.length > 0){
                for (var a=0; a< city.children.length; a++){
                    var child = city.children[a];
                    var kid = {
                       name : child.name,
                       woe : child.woeids[0]
                    };
                    
                    if (child.woeids.length > 1){
                        kid.children = [];
                        for (var b=0; b< child.woeids.length; b++){
                            kid.children.push(
                                {
                                    name : this.names[child.woeids[b]],
                                    woe : child.woeids[b]
                                }
                            );
                        }
                    }
                    this.woetable[city.name].push(kid);
                }
            }else{
                this.woetable[city.name].push({
                       name : city.name,
                       woe : city.woeids[0]
                    });
            }
        }
    },
    createCity : function(node){
        var city = this.cities[node.metro];
        if (!this.cities[node.metro]){
            //sys.puts("creating CITY "+node.metro);
            city = this.cities[node.metro] = {
                name : node.metro,
                path : "/"+node.state+"/"+this.generatePath(node.metro),
                woeids : [node.parent],
                nearby : [],
                children : []
            };
            
            var state = this.states[node.state];
            if (!state){
                state = this.states[node.state] = [];            
            }
            state.push(city);
        }
    },
    errorHandler: function(cnx, msg, err){
        err = err || "timeout";
        sys.log("error "+msg+" to http://"+cnx.host+":"+cnx.port+cnx.path+" ("+err+")");
    },
    talkToServer : function(hostname, port, path, isGet, callback, postBody){
        var r, context, meth = isGet === true ? "GET" : "POST";
        var callobj = {
           'host':hostname,
           "User-Agent": "NodeJS HTTP Client"
         };
        if (!isGet && postBody){
            callobj['Content-Length'] = postBody.length;
        }
    
        context = {
            host : hostname,
            port : port,
            method : meth,
            path : path,
            url : hostname+":"+port+path
        };
        
        var c = http.createClient(port, hostname);
        c.addListener("error", this.errorHandler.bind(this, context, "connecting"));
        c.addListener("timeout", this.errorHandler.bind(this, context, "timing out (connection)"));
        
        r = c.request(meth, path, callobj);
        r.connection.setTimeout(60000);
        
        r.addListener("error", this.errorHandler.bind(this, context, "talking to"));
        
        r.addListener("response", function(obj, response) {
            if (response.statusCode === 200){
                var responseBody = "";
                response.setEncoding("utf8");
                response.addListener("data", function(chunk) { responseBody += chunk; });
                response.addListener("timeout", this.errorHandler.bind(this, obj, "timing out (response)"));
                response.addListener("end", function(ctx){                  
                    try{
                        callback(responseBody);
                    }catch(e){
                        this.errorHandler(ctx, "getting server response", e);
                    }
                }.bind(this, obj));
            }else{
                this.errorHandler(obj, "with responseCode "+response.statusCode, response.statusCode);
            }
        }.bind(this, context));
        
        if (!isGet && postBody){
            r.write(postBody);
        }
        r.end();
    },
    createPage : function(node){
        var page = this.pages[node.page];
        if (!this.pages[node.page]){
            //sys.puts("creating page "+node.name);
            page = this.pages[node.page] = {
                name : node.page,
                path : "/"+node.state+"/"+this.generatePath(node.metro)+"/"+this.generatePath(node.page),
                woeids : [node.woe]
            };
            if (node.parent !== node.woe){
                this.cities[node.metro].children.push(page);
            }
        }else{
            var chunks = page.name.split("/");
            var home = chunks[0];
            //if i have the same name as the page
            //put me first
            if (node.name === home){
                //this is the base WOEid, put it first
                page.woeids.unshift(node.woe);
            }else{
                page.woeids.push(node.woe);
            }
        }
    }
};

//sys.puts(JSON.stringify(cool.transformWoeMap(rows)));
var guy = cool.transformWoeMap(rows);
cool.checkWoeIDs();

//sys.puts(JSON.stringify(cool.woetable));
//sys.puts("cities = "+Object.keys(cool.cities));