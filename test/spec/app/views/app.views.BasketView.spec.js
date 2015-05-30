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
        spyOn(window, '$').and.callFake(function(arg) {
            if(arg === '#basket') {
                return mockContainer;
            }
        });
        mockBasketModel = {};
        spyOn(app.models, 'BasketModel').and.returnValue(mockBasketModel);
        mockFormValidator = {};
        spyOn(app.validators, 'BasketFormValidator').and.returnValue(mockFormValidator);


        view = new app.views.BasketView();
    });

    describe('Creates new Basket View', function() {
        it('Sets container property value', function () {
            expect(view.container).toBe(mockContainer);
        });
        it('Creates basket Model', function () {
            expect(view.model).toBe(mockBasketModel);
        });
        it('Hides each product Form buttons', function () {
            expect(view.hideProductFormButtons).toHaveBeenCalledWith(mockProductForm);
        });
        it('Displays remove product "bin" icon', function () {
            expect(view.showRemoveLink).toHaveBeenCalledWith(mockProductForm);
        });
        it('Creates new Form Validator', function () {
            expect(view.formValidator).toBe(mockFormValidator);
        });
    });
    describe('Manages incrementing product quantity in basket', function () {
        beforeEach(function() {
            view.onChangeQuantity(mockProduct);
        });
        it('Listens for "change" event on quatntity product input and fires "changeQuantity" event', function () {
            expect(view.fire).toHaveBeenCalledWith(mockChangeQuantityEvent, mockChangeQuantityEventObj);
        });
    });
    describe('Manages removing products from basket', function () {
        beforeEach(function() {
            view.removeProduct(mockProduct);
        });
        it('Listens for "click" event on remove product link and fires "remove" event', function () {
            expect(view.fire).toHaveBeenCalledWith(mockRemoveEvent, mockProduct);
        });
    });
    describe('Updates Basket Products and Totals', function() {
        beforeEach(function () {
            view.updateBasket();
        });
        it('Updates Product lines', function() {
            expect(view.updateProduct).toHaveBeenCalledWith(mockProductsModel);
        });
        it('Updates Basket totals', function () {
            expect(view.updateTotals).toHaveBeenCalledWith(mockTotalsObject);
        });
    });
});