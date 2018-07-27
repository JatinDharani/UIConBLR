sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter'
], function(Controller,Filter) {
	"use strict";

	return Controller.extend("com.jatinUI5Con.controller.Main", {
      
      onSelectionChange: function(oEvent){
      	  var custID = this.getView().getModel().getProperty(oEvent.getSource().getSelectedItem().getBindingContext().sPath).ProductID;
      	  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
       oRouter.navTo("Detail", {productID:custID}, false);
      },
      onSearch:function(oEvent){
      		var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("ProductName", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("list");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
      }
     
	});

});