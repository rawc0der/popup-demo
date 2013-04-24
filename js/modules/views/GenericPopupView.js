define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	
	var Popup = Widget.extend({
		events: {
			'click ' : function(){
				// this.close();
				// this.renderTemplateData();
				this.updatePopup();

			},
			'click .close' : function(){
				this.close();
			}

		},
		delegate: {

			getTemplateContent: function(){
				return {
					popup_title: 'Data updated! Click the <b>close button</b> bellow'
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

			afterAdd: function(answer){
				console.log('%c Delegate::After Add:: ', 'color:#CA00CA')
				// this.popup.renderTemplateData()
				return true;
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
					// return window.confirm('really close');
					return true;
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
		stackIndex: null,

		viewOptions: ['delegate', 'stackIndex'],

		subviews: [],

		subviewsContainer: '.svContainer',

		template: {
			templateString: '<div class="popup"> <div class="title"> <%= popup_title %> </div>  <button class="close"> X </button>  <div class="svContainer">  </div> </div>',
			templateDataObject: {
				popup_title: "<b>Stackable popup</b> <span>Click to update Content </span>" 
			}
		},

		close: function(){
			console.log('%c PopupView:: close', 'color:#996666' ,this);
			if ( this.delegate.beforeRemove() ) {
				this.clearSubviews();
				this.trigger('popup:close', this);
			}
			this.delegate.afterRemove();
			return true;
		},
		// refresh: function(){
		// 	this.$el.text( 'id='+this.cid +' ||  stackIdx='+this.stackIndex )
		// },
		renderTemplateData: function(){
				var content = this.delegate.getTemplateContent();
				this.replaceContentWith( content );
				this.refreshSubviews();
		},

		updatePopup: function(){
			if( this.delegate.beforeUpdate() ) {
				this.renderTemplateData();
			}
			this.delegate.afterUpdate()
		},

		refreshSubviews: function(){
			this.renderSubviews();
		},

		addPopupView: function(view){
			if(this._subviews.length < 1) this.addSubview(view);
			this.renderSubviews();
			console.log('%c PopupView:: addView', 'color:#996666' ,this._subviews);
		},

		removePopupView: function(){
			this.clearSubviews();
		},

		initialize: function(){
			Widget.prototype.initialize.call(this)
			_.extend(this.delegate, {popup: this})	
		},

	});

	return Popup;

});