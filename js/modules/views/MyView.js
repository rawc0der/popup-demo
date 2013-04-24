define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	
	var MyView = Widget.extend({
		template:{
			templateString: '<div id="popView"> <% _.each(rows, function(row){ %>  <div class="row"> <span class="row_title"> <%= row.row_title_data %> </span>  <span class="row_img"> <img src="<%= row.row_img_src %>" /> </span> </div> <% } ) %> </div>',
			templateDataObject: {
				rows: [
					{
						row_title_data: 'Row 1 - Monaco',
						row_img_src: 'http://flagpedia.net/data/flags/small/mc.png'
					},
					{
						row_title_data: 'Row 2 - South Africa',
						row_img_src: 'http://flagpedia.net/data/flags/small/za.png'
					},
					{
						row_title_data: 'Row 3 - Japan',
						row_img_src: 'http://flagpedia.net/data/flags/small/jp.png'
					}
				]
			}
		}

	});

	return MyView;

});