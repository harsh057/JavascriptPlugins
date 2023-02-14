$.fn["JsonToTable"] = function (options){
    let elements = this;

    var defaults = {
        data : [{message : "No data found!"}],
        returnHtml : false
    }

    var settings = $.extend({},defaults,options);
    
    var properties = [];
    if(settings.data != null && settings.data.length>0){
        properties = Object.keys(settings.data[0]);
    }

    if(settings.columns !=null && settings.columns.length>0){
        properties = properties.filter(c=>settings.columns.includes(c));
    }

    var html = GetTableHtmlFromJSON(settings.data,properties)
    elements.html(html);

    if(settings.returnHtml){
        return html;
    }

    function GetTableHtmlFromJSON(data,properties){
        var table = "<table>";
        table += properties.map(function(v,i){
            return `<th>${v}</th>`
        }).join("");

        table += data.map(function(v,i){
            return `<tr>${GetRow(v,properties)}</tr>`;
        }).join("");

        table += "</table>";
        return table;
    }

    function GetRow(data,properties){
        var html = ""
        for(let idx=0; idx<properties.length;idx++){
            html+= `<td>${data[properties[idx]]}</td>`
        }
        return html;
    }
}
