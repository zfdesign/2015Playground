describe('Basket View', function() {

    var view;
    var mockContainer;
    var mockBasketModel;
    var mockProductForm;
    var mockFormValidator;
    var mockProduct;
    var mockChangeQuantityEvent;
    var mockChangeQuantityEventObj;
    var mockRemoveEvent;
    var mockProductsModel;
    var mockTotalsObject;

    beforeEach(function () {

        mockContainer = {};
        mockBasketModel = {};
        spyOn(app, 'Model').and.returnValue(mockBasketModel);
        mockFormValidator = {};
        /*spyOn(app.validators, 'BasketFormValidator').and.returnValue(mockFormValidator);*/


        view = new app.views.BasketView(mockContainer);
    });

    describe('Creates new Basket View', function() {
        it('Sets container property value', function () {
            expect(view.container).toBe(mockContainer);
        });
        it('Creates basket Model for each product and adds it to a Collection', function () {
            expect(app.Model).toHaveBeenCalled();
            expect(app.Collection).toHaveBeenCalled();
        });
        xit('Hides each product Form buttons', function () {
            expect(view.hideProductFormButtons).toHaveBeenCalledWith(mockProductForm);
        });
        xit('Displays remove product "bin" icon', function () {
            expect(view.showRemoveLink).toHaveBeenCalledWith(mockProductForm);
        });
        xit('Creates new Form Validator', function () {
            expect(view.formValidator).toBe(mockFormValidator);
        });
    });
/*
    describe('Manages incrementing product quantity in basket', function () {
        beforeEach(function() {
            view.onChangeQuantity(mockProduct);
        });
        xit('Listens for "change" event on quatntity product input and fires "changeQuantity" event', function () {
            expect(view.fire).toHaveBeenCalledWith(mockChangeQuantityEvent, mockChangeQuantityEventObj);
        });
    });
    describe('Manages removing products from basket', function () {
        beforeEach(function() {
            view.removeProduct(mockProduct);
        });
        xit('Listens for "click" event on remove product link and fires "remove" event', function () {
            expect(view.fire).toHaveBeenCalledWith(mockRemoveEvent, mockProduct);
        });
    });
    describe('Updates Basket Products and Totals', function() {
        beforeEach(function () {
            view.updateBasket();
        });
        xit('Updates Product lines', function() {
            expect(view.updateProduct).toHaveBeenCalledWith(mockProductsModel);
        });
        xit('Updates Basket totals', function () {
            expect(view.updateTotals).toHaveBeenCalledWith(mockTotalsObject);
        });
    });
*/
});