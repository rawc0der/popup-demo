define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	/**
	 * Popup Object
	 * @type {[Widget]}
	 */
	var PopupView = Widget.extend({
		events: {
			"click .close": function(evt){
				evt.preventDefault();
				// var $close = $(evt.currentTarget);
				this.close();
			}
		},
		delegate: {
			getPopupContent: function(){
				return {
					template: {
						templateString: '<div class="XPopup"> Default Popup template <button class="close"> X </button>  </div>'
					}
				}
			},
			respondToClose: function(){
				return window.confirm('really close');
			},
			getTemplateData: function(self){
				return {
					templateDataObject: {
						// view_id : self.cid
					}
				}
			},
			shouldCloseActivePopups: true
		},
		setContent: function(){},
		refresh: function(){},
		close: function(){
			var ans = this.delegate.respondToClose();
			if (ans) {
				console.log('%c PopupView:: close', 'color:#996666');
				this.clearSubviews();
				// this.remove();
				this.trigger('popup:close', this);
			}
			return ans;
		},
		// addView: function(){
		// 	var popupView = this.delegate.getPopupView();
		// 	this.addSubview( popupView )
		// 	console.log('added subv', popupView);
		// 	this.renderSubviews();
		// 	console.log(this._subviews);
		// },
		viewOptions: ['delegate'],
		_subviews:[],
		subviewsContainer: '.ViewContainer',
		initialize: function(){
			Widget.prototype.initialize.call(this)
			console.log('%c PopupView::Created popup', 'color:#996666', this);
			console.log('%c Delegate:: protocol methods:', 'color:#CA00CA' , _.keys(this.delegate) );
			console.log ( '%c Delegate:: call getPopupContent: ', 'color:#CA00CA', this.delegate.getPopupContent() );
			_.extend( this._template, this.delegate.getPopupContent().template );
			var tmpTemplate = this.delegate.getTemplateData(this).templateDataObject;
			// this.setTemplate({
			// 	view_id: this.cid,
				
			// });
			this.setTemplate(tmpTemplate);
		}

	});


	return PopupView;

});