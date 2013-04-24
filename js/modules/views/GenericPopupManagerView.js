define([
 'underscore',
 'backbone',
 'widget'

], function(_, Backbone, Widget){
	
	var PopupManager = Widget.extend({

		subviews: [],

		subviewsContainer: '#pContainer',

		template: {
			templateString: '<div id="pManager"> <h4> Popup Manager Container </h4> <div id="pContainer"> </div> </div>'
		},

		refreshStackIndexes: function(){
			console.log( '%c PopupManager::Refresh Stack index', 'color:blue', this._subviews )
			var _newSubviewArr = _.sortBy(this._subviews, function(subv){ subv.stackIndex });
			this._subviews = _newSubviewArr;			
			for(var i = 0; i < this._subviews.length; i++){
				this._subviews[i].stackIndex = i;
				// this._subviews[i].refresh();
			}
		},

		addPopup: function(popup){
			console.log('%c Delegate:: shouldCloseActivePopups', 'color:#CA00CA', popup.delegate.flags.shouldCloseActivePopups);
			if ( popup.delegate.flags.shouldCloseActivePopups === true ) {
				this.closeAll();
			}
			popup.stackIndex = this._subviews.length;
			console.log( '%c PopupManager::Adding new Popup to Manager', 'color:blue', popup )
			if( popup.delegate.beforeAdd() ) {
				this.addSubview(popup);
			}	
			popup.delegate.afterAdd()
			this.refreshStackIndexes();
			if(popup.delegate.flags.observable) this.listenToPopupClose(popup);
			this.renderSubviews();
		},

		listenToPopupClose: function(popup){
			popup.on('popup:close', function(instance){
				console.log( '%c PopupManager::Close Popup', 'color:blue', instance )
				var idx =  _.indexOf(this._subviews, instance);
				console.log('Found in idx:',idx)
				this.removePopup(idx);
			}, this);
		},

		removePopup: function(idx){
			this.removeSubview(idx);
			this.refreshStackIndexes();
		},

		closeAll: function(){
			console.log( '%c PopupManager::Close All active Popups', 'color:blue' )
			_.map(this._subviews, function(subv){
				subv.close()
			}, this);
			this.clearSubviews();
		},
		
		initialize: function(){
			Widget.prototype.initialize.call(this)

		},

	});

	return PopupManager;

});