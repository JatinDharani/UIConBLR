sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("com.jatinUI5Con.controller.Detail", {
  
    onInit: function(){
    		var oViewModel = new JSONModel({
					busy : false,
					delay : 0,
					lineItemListTitle : "Customer Orders"
				});
					this.getView().setModel(oViewModel, "detailView");
    	 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    	 oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched:function(oEvent){
    var sObjectId =  oEvent.getParameter("arguments").productID;
				this.getView().getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getView().getModel().createKey("Products", {
						ProductID :  sObjectId
					});
					this._bindView("/" + sObjectPath);
				}.bind(this));	
				

	
    },
    	_bindView : function (sObjectPath) {
				// Set busy indicator during view binding
				var oViewModel = this.getView().getModel("detailView");

				// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
				oViewModel.setProperty("/busy", false);

				this.getView().bindElement({
					path : sObjectPath,
					events: {
						
						dataRequested : function () {
							oViewModel.setProperty("/busy", true);
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
					//property Binding
	this.getView().byId("catDesc").bindElement(sObjectPath +"/Category");
			},
			onOrderPress:function(oEvent){
					// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("com.jatinUI5Con.view.order", this);
				this.getView().addDependent(this._oPopover);
			
			
			}

			var oCtx = oEvent.getSource().getBindingContext();
			this._oPopover.bindElement(oCtx.getPath()+"/Order");

			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var oControl = oEvent.getSource();
			this._oPopover.openBy(oControl);
			},
			handleActionPress:function(oEvent){
					this._oPopover.close();
			}
	
	});

});