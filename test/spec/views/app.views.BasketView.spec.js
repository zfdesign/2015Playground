describe('Basket View', function() {

    var view;
    var mockContainer;
    var mockProductForm;
    var mockPaymentForm;
    var mockSubtotalCostSpan;
    var mockVatCostSpan;
    var mockTotalCostSpan;
    var mockCollection;
    var mockProductFormsArray;

    beforeEach(function () {
        mockContainer = {
            find: function () {}
        };
        mockProductForm = jasmine.createSpy();
        mockSubtotalCostSpan = jasmine.createSpy();
        mockPaymentForm = jasmine.createSpy();
        mockVatCostSpan = jasmine.createSpy();
        mockTotalCostSpan = jasmine.createSpy();
        spyOn(mockContainer, 'find').and.callFake(function (arg) {
            if( arg === 'table form' ) {
                return mockProductForm;
            }
            if( arg === '.subTotal .cost span' ) {
                return mockSubtotalCostSpan;
            }
            if( arg === '.vat .cost span' ) {
                return mockVatCostSpan;
            }
            if( arg === '.total .cost span' ) {
                return mockTotalCostSpan;
            }
            if( arg === 'form#payment' ) {
                return mockPaymentForm;
            }
        });
        mockCollection = jasmine.createSpy();
        spyOn(app, 'Collection').and.callFake(function (){
           return mockCollection;
        });

        mockProductFormsArray = [];
        spyOn($, 'each');

        view = new app.views.BasketView(mockContainer);
    });

    describe('Creating new Basket View', function() {
        it('Creates container property', function () {
            expect(view.container).toBe(mockContainer);
        });
        it('Creates Product Forms property', function () {
            expect(view.productForms).toBe(mockProductForm);
        });
        it('Creates Subtotal property', function () {
            expect(view.subTotal).toBe(mockSubtotalCostSpan);
        });
        it('Creates VAT property', function () {
            expect(view.vat).toBe(mockVatCostSpan);
        });
        it('Creates Total property', function () {
            expect(view.grandTotal).toBe(mockTotalCostSpan);
        });
        xit('Creates Payment Form property value', function () {
            expect(view.paymentForm).toBe(mockPaymentForm);
        });
        it('Creates collection view property', function () {
            expect(view.collection).toBe(mockCollection);
        });
        it('Creates a Model from each Product', function () {
            expect($.each).toHaveBeenCalledWith(view.productForms, jasmine.any(Function));
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
*/

/*    describe('Manages removing products from basket', function () {
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