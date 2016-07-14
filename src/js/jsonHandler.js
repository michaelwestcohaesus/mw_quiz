(function(){
	var content = document.getElementById('content');
	var html = '';
	var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': '../../src/js/formdata.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
	})();

	// Handlebars.registerHelper('bold', function(text){
	// 	text = Handlebars.escapeExpression(text);
	// 	return new Handlebars.SafeString(
	// 		'<b>' + text + '</b>'
	// 	);
	// });
	//
	// Handlebars.registerHelper('list', function(items, options){
	// 	var out = '<ul>';
	//
	// 	for(var i = 0, length = items.length; i < length; i++){
	// 		out += '<li>' + options.fn(items[i]) + '</li>';
	// 	}
	//
	// 	return out + '</ul>';
	// });

	var template = Handlebars.compile(document.getElementById('questions-template').innerHTML);

	content.innerHTML = template(json);

})();
