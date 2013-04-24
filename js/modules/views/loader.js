define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	
	var MyView = Widget.extend({
		template:{
			templateString: '<img id="load" src="/latest/popup/ajax-loader.gif">',
		}

	});

	return MyView;

});