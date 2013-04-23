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
			}
		},
		delegate: {
			getTemplateContent: function(){
				return {
					popup_title: new Date().getSeconds()
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
				console.log('%c Delegate::After Add:: ', 'color:#CA00CA', answer)
				// this.popup.renderTemplateData()
				return answer
			},
			beforeUpdate: function(){
				console.log('%c Delegate::Before Update:: ', 'color:#CA00CA')
				if ( this.flags.activeState === true ) return true;
					return false;
			},
			afterUpdate: function(answer){
				console.log('%c Delegate::After Update:: ', 'color:#CA00CA', answer)
				return answer;
			},
			beforeRemove: function(){
				console.log('%c Delegate::Before Remove:: isCloseable:', 'color:#CA00CA', this.flags.isCloseable)
				// custom logic
				if ( this.flags.isCloseable === true ) {
					return window.confirm('really close');
				}
			},
			afterRemove: function(answer){
				console.log('%c Delegate::After Remove:: answer:', 'color:#CA00CA', answer)
				// custom logic
				return answer;
			},
			flags: {
				shouldCloseActivePopups: true,
				observable: false,
				activeState: true,
				isCloseable: true
			}
		},
		stackIndex: null,
		viewOptions: ['delegate', 'stackIndex'],
		subviews: [],
		subviewsContainer: '.svContainer',
		template: {
			templateString: '<div class="popup"> <h5> <%= popup_title %> </h5>  <div class="svContainer"> X </div> </div>',
			templateDataObject: {
				popup_title: "Generic popup data " 
			}
		},
		close: function(){
			console.log('%c PopupView:: close', 'color:#996666' ,this);
			var answer = this.delegate.afterRemove( this.delegate.beforeRemove() );
			if ( answer ) {
				this.clearSubviews();
				this.trigger('popup:close', this);
			}
			return answer;
		},
		// refresh: function(){
		// 	this.$el.text( 'id='+this.cid +' ||  stackIdx='+this.stackIndex )
		// },
		renderTemplateData: function(){
			var content = this.delegate.getTemplateContent();
			if (this.delegate.afterUpdate( this.delegate.beforeUpdate() )){
				this.replaceContentWith( content );
				this.refreshSubviews();
			}
		},
		refreshSubviews: function(){
			this.renderSubviews();
		},
		addPopupView: function(){},
		removePopupView: function(){},
		initialize: function(){
			Widget.prototype.initialize.call(this)
			_.extend(this.delegate, {popup: this})	
		},

	});

	return Popup;

});