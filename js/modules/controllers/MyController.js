define([
 'underscore', 
 'backbone',
 'views/PopupView',
 'views/PopupManagerView',
 'widget'

], function(_, Backbone, PopupView, PopupManager, Widget){
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

			console.log('Controller::Start  --> define logic');
			
			// var Popup = Widget.extend({
			// 	delegate: null,
			// 	initialize: function(){
			// 		Widget.prototype.initialize.call(this)
			// 		console.log('%c new::Popup', 'color:#444', this);
			// 		if (typeof this.delegate.start == 'function') this.delegate.start.call(this, this.delegate)
			// 		_.extend( this._template.templateDataObject, {popup_data: this.cid });
			// 		this.setTemplate()
			// 		var self = this;
			// 		this.$el.click(function(){
			// 			self.trigger('close::Popup', {id: self.cid, idx: $(this).index()} )
			// 		})
			// 	},
			// 	viewOptions: ['delegate']
			// });

			// var PopupContainer = Widget.extend({
			// 	_subviews : [],
			// 	template: {
			// 		templateString: '<div id="PopupContainer"> <h3> Popups Container </h3> <button id="add"> + </button> <div id="Popups"></div> </div>'
			// 	},
			// 	events: {
			// 		"click #add": function(){
			// 			this.addPopup( myDelegate )          //// <<<<<<===== DELEGATE
			// 		}
			// 	},
			// 	subviewsContainer: '#Popups',
			// 	addPopup: function(delegate){
			// 		var popup = new Popup( {delegate: delegate} );
			// 		popup.on('close::Popup', function(args){
			// 			console.log('intercepted', args)
			// 			this.removePopup(args.idx)
			// 		}, this)
			// 		console.log('%c Add::Popup', 'color:green', popup);
			// 		this._popupsStack.push(popup)
			// 		this.trigger('open:Popup:'+popup.cid)
			// 		this.renderSubviews();
			// 	},
			// 	removePopup: function(idx){
			// 		this.trigger('close:Popup:'+this.getSubview(idx).cid)
			// 		this.removeSubview(idx);
			// 	},
			// 	initialize: function(){
					
			// 		this._popupsStack = this._subviews;
			// 		Widget.prototype.initialize.call(this)
			// 		console.log('%c new::PopupContainer', 'color:#444', this);
			// 	}
			// })

			// var myDelegate = {
			// 	start: function(){
			// 		console.log('Starting popup::', this.cid)
			// 		var self = arguments[0];
			// 		_.extend( this._template, arguments[0].template );
			// 	},
			// 	template: {
			// 		templateString: '<div class="Popup"> <%= popup_data %> </div>',
			// 		templateDataObject: {
			// 			popup_data: 'Default popup value '
			// 		}
			// 	}
			// }

			// var popupManager = new PopupContainer() 		
			// popupManager.addPopup(myDelegate)	

			var popupManager = new PopupManager({
				config: {
					debug: true
				}
			});

			$('body').append( $('<div id="display_wrapper">') );
			
			$('#display_wrapper').append($('<a href="#" id="pop1">Popup 1 </a>')).append($('<a href="#" id="pop2">Popup 2 </a>'))
			.append($('<a href="#" id="pop3">Popup 3 </a>')).append($('<a href="#" id="pop4">Popup 4 (default) </a>'))
			
			popupManager.renderTo( $('#display_wrapper')) 
			popupManager.render(true);

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
						console.log('%c PopupFactory::delegate: ', 'color:green', this.getDelegate('delegate4').name)
						return this.buildPopup(this.getDelegate('delegate4'));
					}
					
				},
				getDelegate: function(type){
					return this.delegateType[type];
				},
				buildPopup: function(delegate){
					return new PopupView({
						delegate: delegate,

					});
				},
				delegateType: {
					delegate1:  {
							name: 'Delegate1',
							shouldCloseActivePopups: false,
							getPopupView: function(){
								return false;
							},
							getPopupContent: function(){
								return {
									template: {
										templateString: '<div class="popup1"> Popup 1 type </div>'
									}
								}
							},
					},
					delegate2: {
							name: 'Delegate2',
							shouldCloseActivePopups: true,
							getPopupView: function(){
								return new Widget({ template: { templateString: '<h5> Popup View </h5>' } });
							},
							getPopupContent: function(){
								return {
									template: {
										templateString: '<div class="popup2"> Popup 2 type </div>'
									}
								}
							},						
					},
					delegate3: {
							name: 'Delegate3',
							shouldCloseActivePopups: true,
							getPopupView: function(){},
							getPopupContent: function(){
								return {
									template: {
										templateString: '<div class="popup3"> Popup 3 type </div>'
									}
								}
							},
					},
					delegate4: {
							name: 'Delegate4',
							shouldCloseActivePopups: true,
							getPopupView: function(){},
							getPopupContent: function(){
								return {
									template: {
										templateString: '<div class="popup4"> Popup Default type </div>'
									}
								}
							},						
					}
				}
			};

			$('a').click(function(evt){
				evt.preventDefault;
				var a = $( evt.currentTarget );
				var myPopup = PopupFactory.getPopup(a.attr('id'));
				popupManager.addPopup(myPopup);
			});

			var XPopup = PopupView.extend({
				initialize:function(){
					PopupView.prototype.initialize.call(this)
					// console.log ( _.keys( this.delegate ) );
				}
			});

			new XPopup().renderTo( $('#display_wrapper'), true );

		} // end start

	});

	return MyController;

});