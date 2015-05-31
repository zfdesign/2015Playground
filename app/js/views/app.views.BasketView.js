app.views.BasketView = function (container) {
    this.container = container;
    this.productForms = container.find('table form');
    //this.paymentForm = container.find('form#payment');
    this.subTotal = container.find('.subTotal .cost span');
    this.vat = container.find('.vat .cost span');
    this.grandTotal = container.find('.total .cost span');
    this.collection  = new app.Collection();
    this.addProductsModelsToCollection();
    this.addTotalsModelToCollection();
    this.addValidation();
    this.addProductRemoveLinks();
};

app.views.BasketView.prototype.addProductsModelsToCollection = function () {

    var that = this;
    $.each(this.productForms, function() {
        var formData = $(this).serializeArray();

        var product = {};
        $.each(formData, function () {
            product[this.name] = this.value;
        });

        var productModel = new app.Model(product);
        productModel.on('changed', that.updateBasket, that);
        that.collection.addModel(productModel);
    });

};

app.views.BasketView.prototype.addTotalsModelToCollection = function () {
    var totals = {
        'id': 'basketTotals',
        "subTotal": this.subTotal.text() * 100,
        'vat': this.vat.text() * 100,
        'vatPercent': this.vat.attr('data-vat-percent')/100,
        'grandTotal': this.grandTotal.text() * 100
    };

    var totalsModel = new app.Model(totals);
    this.collection.addModel(totalsModel);
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

app.views.BasketView.prototype.updateBasket = function (e) {
    // Product removed
    if (e.changed.quantity && e.changed.quantity.newValue === '0') {
        var id = e.model.attributes.id.currentValue;
        this.updateTotalsWithCollection(e.model);
        this.collection.removeModelById(id);
        // TODO: Refactor to Service
        this.submitProductRemoved(id);
    }
};

app.views.BasketView.prototype.updateTotalsWithCollection = function (model) {
    // TODO:
    var totalsModel = this.collection.getModelById('basketTotals');
    // Calc
    var subTotalReduction = model.attributes.price.previousValue * 100 * model.attributes.quantity.previousValue;
    var subTotal = totalsModel.attributes.subTotal.currentValue - subTotalReduction;
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

app.views.BasketView.prototype.submitProductRemoved = function (id) {
    var form = this.container.find('form#' + id);
    form.parents('tr').find('td.quantity input[name="quantity"]').val(0);
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