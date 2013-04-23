define([
 'underscore', 
 'backbone',
 'views/GenericPopupView',
 'views/GenericPopupManagerView',
 'widget'

], function(_, Backbone, Popup, PopupManager, Widget){
	/**
	 * Controller Object responsible for View construction and application event flow
	 * @type {[Object]}
	 */
	var MyController = _.extend( {}, Backbone.Events );
	/**
	 * Define application logic here, by extending the Controller
	 */
	_.extend( MyController, {
		/**
		 * Function called immediately after App Initialize 
		 */
		start: function(){

			console.log('PopupController::Start');


			$('body').append( $('<div id="display_wrapper">') );
			
			$('#display_wrapper').append($('<a href="#" id="pop1">Popup 1 </a>')).append($('<a href="#" id="pop2">Popup 2 </a>'))
			.append($('<a href="#" id="pop3">Popup 3 </a>')).append($('<a href="#" id="pop4">Popup 4 (default) </a>'))
			
			var PopupFactory = {
				getPopup: function(popID, delegate){

					if (popID === 'pop1') {
						console.log('%c PopupFactory::new:: Popup 1', 'color:green');
						console.log('%c PopupFactory::delegate: ', 'color:green', this.getDelegate('delegate1').name)
						return this.buildPopup(this.getDelegate('delegate1'));

					} else if (popID === 'pop2') {
						console.log('%c PopupFactory::new:: Popup 2', 'color:green');
						console.log('%c PopupFactory::delegate: ', 'color:green', this.getDelegate('delegate2').name)
						return this.buildPopup(this.getDelegate('delegate2'));

					} else if (popID === 'pop3') {
						console.log('%c PopupFactory::new:: Popup 3', 'color:green');
						console.log('%c PopupFactory::delegate: ', 'color:green', this.getDelegate('delegate3').name)
						return this.buildPopup(this.getDelegate('delegate3'));

					} else {
						// default popup
						console.log('%c PopupFactory::new:: Popup 4 (default)', 'color:green');
						return new Popup({});
					}
					
				},
				getDelegate: function(type){
					return this.delegateType[type];
				},
				buildPopup: function(delegate){
					return new Popup({
						delegate: delegate,

					});
				},
				delegateType: {
					delegate1:  {
							name: 'Delegate1',
							flags: { shouldCloseActivePopups: false },
							getPopupView: function(){
								return false;
							},
							getPopupContent: function(){
								return {
									template: {
										templateString: '<div class="popup1"> Popup 1 ID: <%= view_id %> <button class="close"> X </button> </div>'
									}
								}
							},
							getTemplateData: function(self){
								return {
									templateDataObject: {
										view_id : self.cid
									}
								}
							},
							respondToClose: function(){
								return window.confirm('really close ?');
							},
					},
					delegate2: {
							name: 'Delegate2',
							flags: { shouldCloseActivePopups: true },
							getPopupView: function(){
								return new Widget({ template: { templateString: '<h5> Popup View </h5>' } });
							},
							getPopupContent: function(){
								return {
									template: {
										templateString: '<div class="popup2"> Popup 2 ID: <%= view_id %> <button class="close"> X </button>   </div>',									}
								}
							},
							getTemplateData: function(self){
								return {
									templateDataObject: {
										view_id : self.cid
									}
								}
							},
							respondToClose: function(){
								return window.confirm('really close ?');
							},						
					},
					delegate3: {
							name: 'Delegate3',
							flags: { shouldCloseActivePopups: true },
							getPopupView: function(){},
							getPopupContent: function(){
								return {
									template: {
										templateString: '<div class="popup3"> Popup 3 ID: <%= view_id %> <button class="close"> X </button> </div>',
									}
								}
							},
							getTemplateData: function(){
								var date = new Date();
								return {
									templateDataObject: {
										view_id : date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
									}
								}
							},
							respondToClose: function(){
								return window.confirm('really close ?');
							},
					}
				}
			};
			var opt = {
				config:{
					debug:true
				}
			};
			var popupManager = new PopupManager(opt);

			popupManager.renderTo( $('#display_wrapper')) 
			popupManager.render(true);

			$('a').click(function(evt){
				evt.preventDefault;
				var a = $( evt.currentTarget );
				var myPopup = PopupFactory.getPopup(a.attr('id'));
				popupManager.addPopup(myPopup);
			});



		} // end start

	});

	return MyController;

});