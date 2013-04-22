define([
 'underscore', 
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	/**
	 * Widget Object responsible for creating and managing popups as subviews
	 * @type {[Object]}
	 */
	var PopupManager = Widget.extend({
		subviews: [],
		subviewsContainer: '#pcont',
		currentActivePopup: null,
		template:{
			templateString: '<div id="PopupManager"> <h5> Popups Container </h5> <div id="pcont"></div></div>',
		},
		
		addPopup: function(popup){
			console.log('%c Delegate:: shouldCloseActivePopups', 'color:#CA00CA', popup.delegate.shouldCloseActivePopups);
			if ( popup.delegate.shouldCloseActivePopups === true ) {
				this.closeAll();
			}
			console.log( '%c PopupManager::Adding new Popup to Manager', 'color:blue', popup )
			popup.on('popup:close', function(instance){
				var idx =  _.indexOf(this._subviews, instance);
				this.removePopup(idx);
			}, this);
			this.addSubview(popup);
			this.renderSubviews();
		},
		removePopup: function(idx){
			this.removeSubview(idx);
		},

		closeAll: function(){
			console.log('%c PopupManager::Closing All', 'color:blue');
			_.map(this._subviews, function(subv){
				subv.close()
			}, this);
	
			this.clearSubviews();
		},
		openAll: function(){},


		// displayMode: [stack, layer]

	});


	return PopupManager;

});