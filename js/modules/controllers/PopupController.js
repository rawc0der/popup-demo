define([
 'underscore', 
 'backbone',
 'views/GenericPopupView',
 'views/GenericPopupManagerView',
 'views/MyView',
 'widget',
 'views/loader'

], function(_, Backbone, Popup, PopupManager, MyView, Widget, Loader){
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
			
			$('#display_wrapper')
			.append($('<a href="#" id="pop1">Label ( ! stackable  || observable ||  active || closeable ) </a><br>'))
			.append($('<a href="#" id="pop2">Popup Panel with Custom View ( ! stackable  || observable ||  active || ! closeable )</a><br>'))
			.append($('<a href="#" id="pop3">Popup 3 </a><br>'))
			.append($('<a href="#" id="pop4">Popup 4 (default) </a><br>'))
			
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

							getTemplateContent: function(){
								return {
									popup_title: '<div>Digi clock ! </div> <div id="digi"> </div>'
								};
							},

							getPopupView: function(opt){
								return new Widget(opt);
							},

							beforeAdd: function(){
								console.log('%c Delegate::Before Add:: ', 'color:#CA00CA' )
								this.popup.renderTemplateData()
								if ( this.flags.activeState === true ) return true;
									return false;
							},

							afterAdd: function(){
								console.log('%c Delegate::After Add:: ', 'color:#CA00CA')
								// this.popup.renderTemplateData()
								return true;
							},

							beforeUpdate: function(){
								console.log('%c Delegate::Before Update:: ', 'color:#CA00CA')
								if ( this.flags.activeState === true ) return true;
									return false;
							},

							afterUpdate: function(answer){
								console.log('%c Delegate::After Update:: ', 'color:#CA00CA')
								setInterval(function(){
									var min = new Date().getMinutes();
									var hours = new Date().getHours();
									var sex = new Date().getSeconds();
									var time = $('<div>'+hours+':'+min+':'+sex+'</div>')
				
									$('#digi').html(time[0])
								}, 1000);
								return true;
							},

							beforeRemove: function(){
								console.log('%c Delegate::Before Remove:: isCloseable:', 'color:#CA00CA', this.flags.isCloseable)
								// custom logic
								if ( this.flags.isCloseable === true ) {
									return window.confirm('really close');
								}
							},

							afterRemove: function(){
								console.log('%c Delegate::After Remove:: answer:', 'color:#CA00CA')
								// custom logic
								return true;
							},

							flags: {
								shouldCloseActivePopups: true,   // stackable
								observable: true,   			  // observable 
								activeState: true,				  // active
								isCloseable: true				  // closeable
							}
					},
					delegate2: {
							name: 'Delegate2',

							getTemplateContent: function(){
								return {
									popup_title: "Popup panel"
								};
							},

							getPopupView: function(opt){
								return new Widget(opt);
							},

							beforeAdd: function(){
								console.log('%c Delegate::Before Add:: ', 'color:#CA00CA')
								
								if ( this.flags.activeState === true ) return true;
									return false;
							},

							afterAdd: function(){
								console.log('%c Delegate::After Add:: ', 'color:#CA00CA')
								// this.popup.renderTemplateData()
								this.popup.$el.css({
									width: '300px',
									// height: '600px',
									border: '2px solid #496666',
									padding: '5px'
								})
								var self = this;
								this.popup.addSubview( new Loader() );
								this.popup.updatePopup();
								// this.popup.refreshSubviews();
								window.setTimeout(function(){
									self.popup.clearSubviews();
									self.popup.addPopupView(new MyView())
								}, 2000);
								return true
							},

							beforeUpdate: function(){
								console.log('%c Delegate::Before Update:: ', 'color:#CA00CA')
								if ( this.flags.activeState === true ) return true;
									return false;
							},

							afterUpdate: function(answer){
								console.log('%c Delegate::After Update:: ', 'color:#CA00CA')
								// this.popup.close();
								return true;
							},

							beforeRemove: function(){
								console.log('%c Delegate::Before Remove:: isCloseable:', 'color:#CA00CA', this.flags.isCloseable)
								// custom logic
								if ( this.flags.isCloseable === true ) {
									return window.confirm('really close');
								}
								return false
							},

							afterRemove: function(){
								console.log('%c Delegate::After Remove:: answer:', 'color:#CA00CA' )
								// custom logic
								return true;
							},

							flags: {
								shouldCloseActivePopups: true,   // stackable
								observable: true,   			  // observable 
								activeState: true,				  // active
								isCloseable: true				  // closeable
							}				
					},
					delegate3: {
							name: 'Delegate3',

							getTemplateContent: function(){
								return { popup_title: new Date().getSeconds() };
							},

							getPopupView: function(opt){
								return new Widget(opt);
							},

							beforeAdd: function(){
								console.log('%c Delegate::Before Add:: ', 'color:#CA00CA')
								if ( this.flags.activeState === true ) return true;
									return false;
							},

							afterAdd: function(){
								console.log('%c Delegate::After Add:: ', 'color:#CA00CA')
								// this.popup.renderTemplateData()
								return true
							},

							beforeUpdate: function(){
								console.log('%c Delegate::Before Update:: ', 'color:#CA00CA')
								if ( this.flags.activeState === true ) return true;
									return false;
							},

							afterUpdate: function(){
								console.log('%c Delegate::After Update:: ', 'color:#CA00CA')
								return true;
							},

							beforeRemove: function(){
								console.log('%c Delegate::Before Remove:: isCloseable:', 'color:#CA00CA', this.flags.isCloseable)
								// custom logic
								if ( this.flags.isCloseable === true ) {
									// return true;
									return window.confirm('really close');
								}
							},

							afterRemove: function(){
								console.log('%c Delegate::After Remove:: ', 'color:#CA00CA')
								// custom logic
								return true;
							},

							flags: {
								shouldCloseActivePopups: false,   // stackable
								observable: true,   			  // observable 
								activeState: true,				  // active
								isCloseable: false				  // closeable
							}	
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