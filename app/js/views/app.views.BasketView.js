app.views.BasketView = function (container) {
    this.container = container;
    this.productForms = container.find('table form');
    //this.paymentForm = container.find('form#payment');
    this.subTotal = container.find('.subTotal .cost span');
    this.vat = container.find('.vat .cost span');
    this.grandTotal = container.find('.total .cost span');
    this.createProductFormModels();
    this.collection  = new app.Collection();
    this.addProductModelsToCollection();
    this.setTotalsCollectionModel();
    //this.addValidation();
    this.addProductRemoveLinks();
    this.setOnProductQuantityChange();
};

app.views.BasketView.prototype.createFormModel = function (formData) {
    var model;
    var product = {};
    for (var i in formData) {
        product[formData[i].name] = formData[i].value;
    }
    model = new app.Model(product);
    model.on('changed', this.updateBasket, this);
    this.productModels = this.productModels || [];
    this.productModels.push(model);
    return model;
};

app.views.BasketView.prototype.createProductFormModels = function () {
    for (var i = 0; i < this.productForms.length; i++) {
        this.createFormModel($(this.productForms[i]).serializeArray());
    }
};

app.views.BasketView.prototype.addProductModelsToCollection = function () {
    this.collection.addModels(this.productModels);
};

app.views.BasketView.prototype.createTotalsObject = function () {
  return totals = {
        'id': 'basketTotals',
        "subTotal": this.subTotal.text() * 100,
        'vat': this.vat.text() * 100,
        'vatPercent': this.vat.attr('data-vat-percent')/100,
        'grandTotal': this.grandTotal.text() * 100
    };
};

app.views.BasketView.prototype.setTotalsCollectionModel = function () {
    this.totals = this.totals || this.createTotalsObject();
    this.totalsModel = new app.Model(this.totals);
    this.collection.addModel(this.totalsModel);
};

app.views.BasketView.prototype.addValidation = function () {
    // TODO:
};

app.views.BasketView.prototype.removeProduct = function (e) {
    e.preventDefault();
    $(e.currentTarget).parents('tr').addClass('hide');
    var productId = $(e.currentTarget).siblings('form').attr("id");
    var productModel = this.collection.getModelById(productId);
    productModel.setAttribute('quantity', '0');
};

app.views.BasketView.prototype.onRemoveLinkClicked = function () {
    var links = this.container.find('table tbody tr .remove');
    links.on('click', $.proxy(this, 'removeProduct'));
};

app.views.BasketView.prototype.addProductRemoveLinks = function () {
    var removeLink = '<a href="#" class="remove">Remove</a>';
    this.container.find('table td.edit').append(removeLink);
    this.container.find('table thead th.edit').addClass('hide');
    this.container.find('table input[type="submit"]').addClass('hide');
    this.onRemoveLinkClicked();
};

app.views.BasketView.prototype.updateTotalsWithCollection = function (model) {
    // TODO:
    var totalsModel = this.collection.getModelById('basketTotals');
    // Calc
    var productTotalPreviousPrice = model.attributes.price.previousValue * 100 * model.attributes.quantity.previousValue;
    var productTotalCurrentPrice = model.attributes.price.currentValue * 100 * model.attributes.quantity.currentValue;
    var productTotalChange = productTotalCurrentPrice - productTotalPreviousPrice;
    var subTotal = totalsModel.attributes.subTotal.currentValue + productTotalChange;
    var vat = subTotal * totalsModel.attributes.vatPercent.currentValue;
    var grandTotal = subTotal  + vat;
    // Update
    totalsModel.setAttribute('subTotal', subTotal);
    totalsModel.setAttribute('vat', vat);
    totalsModel.setAttribute('grandTotal', grandTotal);
    // Update DOM
    this.subTotal.text((subTotal/100).toFixed(2));
    this.vat.text((vat/100).toFixed(2));
    this.grandTotal.text((grandTotal/100).toFixed(2));
};

app.views.BasketView.prototype.updateBasket = function (e) {
    if (e.changed.quantity) {
        var id = e.model.attributes.id.currentValue;
        this.updateTotalsWithCollection(e.model);
        // Product removed
        if( e.changed.quantity.newValue === '0') {
            this.collection.removeModelById(id);
            e.currentTarget.value = 0;
        }        // TODO: Refactor to Service
        this.submitProductUpdate(id);
    }
};

app.views.BasketView.prototype.submitProductUpdate = function (id) {
    var form = this.container.find('form#' + id);
    $.ajax({
        url: form.attr('action'),
        type: 'post',
        data: form.serializeArray(),
        dataType: 'json'
    }).done(function() {
        //TODO:
        // that.removeBasketLine(id);
        // Sync Basket Totals
        // Update input[name="basketState"]
    }).fail(function(e) {
        // TODO:
        //this.notifyUserRemoveFailed(id);
    });
};

app.views.BasketView.prototype.updateProductModel = function (e) {
    var pid = e.currentTarget.getAttribute('form');
    var model = this.collection.getModelById(pid);
    model.setAttribute('quantity', e.currentTarget.value);
};

app.views.BasketView.prototype.setOnProductQuantityChange = function () {
    //this.quantityInputs = this.container.find('table .quantity input[type="number"]');
    $(this.container).on('change', 'table .quantity input[type="number"]', $.proxy(this, 'updateProductModel'));
};