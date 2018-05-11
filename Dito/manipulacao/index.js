var request = require('request');
var d3 = require("d3");
var output;

request('https://storage.googleapis.com/dito-questions/events.json', function (error, response, body) {

    if(error) {
        console.log('error;', error);
        console.log('statusCode:', response && response.statusCode);
    } else {
        output = manipulate(JSON.parse(body));
        console.log(output);
    }
});


function manipulate(obj) {

    var array = d3.nest()
        .key(function(d) { return d.timestamp; })
        .entries(obj.events);

    var list = array.map(obj => {
        var rObj = {};
        var timelineItem = [];
        var products = [];

        rObj["timestamp"] = obj.key;
        obj.values.forEach(function(item) {
            if(item.event == "comprou") {
                timelineItem = item;
            } else {
                products.push(item);
            }
        })
        rObj["revenue"] = timelineItem.revenue;
        rObj["transaction_id"] = getId(timelineItem.custom_data);
        rObj["store_name"] = getStoreName(timelineItem.custom_data);
        rObj["products"] = makeList(products);
        return rObj;
    })

    list.sort(function(a,b){
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    var timeline = {"timeline": list};
 
return timeline;
}

function makeList(obj) {
    var list = [];
    obj.forEach(function (item) {
        list.push({
            "name" : getName(item.custom_data),
            "price" : getPrice(item.custom_data)
        });
    })
    return list;
}

function getPrice(obj) {
    var price;
    obj.forEach(function (item) {
        if(item.key == "product_price") {
            price = item.value;
        }
    })
    return price;
}

function getName(obj) {
    var name;
    obj.forEach(function (item) {
        if(item.key == "product_name") {
            name = item.value;
        }
    })
    return name;
}

function getId(obj) {
    var id;
    obj.forEach(function (item) {
        if(item.key == "transaction_id") {
            id = item.value;
        }
    })
    return id;
}

function getStoreName(obj) {
    var name;
    obj.forEach(function(item) {
        if(item.key == "store_name") {
            name = item.value;
        }
    })
    return name;
}
