describe('Basket View', function() {

    var view;
    var mockContainer;
    var mockProductForm;
    var mockPaymentForm;
    var mockSubtotalCostSpan;
    var mockVatCostSpan;
    var mockTotalCostSpan;
    var mockModel;
    var mockCollection;
    var mockProductFormsModels;
    var mockProductTableEditTh;
    var mockProductTableEditTd;
    var mockProductFormSubmit;
    var mockProductRemoveLink;
    var mockProxy;
    var mockTotalsObject;
    var mockReturnedTotals;
    var mockUpdateBasket;
    var mockRemoveEvent;

    beforeEach(function () {
        mockContainer = {
            on: function () {},
            find: function () {}
        };
        spyOn(mockContainer, 'on');
        mockProductForm = jasmine.createSpyObj('mockProductForm', ['length']);
        mockPaymentForm = jasmine.createSpyObj('mockPaymentForm', ['on']);
        mockSubtotalCostSpan = {'text': function() {}};
        mockVatCostSpan = {'attr': function() {}, 'text': function() {}};
        mockTotalCostSpan = {'text': function() {}};
        mockProductTableEditTh = jasmine.createSpyObj('mockProductTableEditTh', ['addClass']);
        mockProductTableEditTd = jasmine.createSpyObj('mockProductTableEditTd', ['append']);
        mockProductFormSubmit = jasmine.createSpyObj('mockProductFormSubmit', ['addClass']);
        mockProductRemoveLink = jasmine.createSpyObj('mockProductRemoveLink', ['on']);
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
            if( arg === 'table thead th.edit' ) {
                return mockProductTableEditTh;
            }
            if( arg === 'table td.edit' ) {
                return mockProductTableEditTd;
            }
            if( arg === 'table input[type="submit"]' ) {
                return mockProductFormSubmit;
            }
            if( arg === 'table tbody tr .remove' ) {
                return mockProductRemoveLink;
            }
        });

        mockModel = jasmine.createSpyObj('mockModel', ['on']);
        spyOn(app, 'Model').and.returnValue(mockModel);

        mockCollection = jasmine.createSpyObj('mockCollection', ['addModel', 'addModels']);
        spyOn(app, 'Collection').and.callFake(function (){
           return mockCollection;
        });

        mockProductFormsModels = [];
        spyOn($, 'each');
        mockProxy = 1;
        spyOn($, 'proxy').and.callFake(function () {
            return mockProxy;
        });

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
        it('Creates collection view property', function () {
            expect(view.productFormModels).toEqual(mockProductFormsModels);
        });
        it('Creates collection view property', function () {
            expect(view.collection).toBe(mockCollection);
        });
        it('Creates proceed to checkout Form property', function () {
            expect(view.proceedToCheckoutForm).toBe(mockPaymentForm);
        });
        it('Listens on submit event proceed to checkout form', function () {
            expect(view.proceedToCheckoutForm.on).toHaveBeenCalledWith('submit', mockProxy);
        });
        it('Creates a Model from each Product', function () {
            expect(view.container.find).toHaveBeenCalledWith('table td.edit');
            expect(view.container.find).toHaveBeenCalledWith('table thead th.edit');
            expect(view.container.find).toHaveBeenCalledWith('table input[type="submit"]');
            expect(view.container.find).toHaveBeenCalledWith('table tbody tr .remove');
        });
        it('Listens on change event to quantity input', function () {
            expect(view.container.on).toHaveBeenCalledWith('change', 'table .quantity input[type="number"]', mockProxy);
        });

    });
    describe('Creating a Model from Product all Forms', function () {
        beforeEach(function() {
            spyOn(view, 'createFormModel');
            view.productForms = {
                length: 1
            };
            view.createProductFormModels();
        });
        it('Creates a Model form each form', function () {
            expect(view.createFormModel).toHaveBeenCalled();
        });
    });
    describe('Creating a Model from Product a Form', function () {
        beforeEach(function() {
            spyOn(view, 'updateBasket');
            view.createFormModel(mockProductForm);
        });
        it('Creates new Product Model', function () {
            expect(app.Model).toHaveBeenCalledWith(jasmine.any(Object));
        });
        it('Listens on Product Model change event', function () {
            expect(mockModel.on).toHaveBeenCalledWith('changed', jasmine.any(Function), view);
        });
        it('Adds Product Model to View product form models', function () {
            expect(view.productFormModels[0]).toBe(mockModel);
        });
    });
    describe('Adds product form Models to a Collection', function () {
        beforeEach(function() {
            view.addProductFormModelsToCollection();
        });
        it('Calls "addModels" method of Collection', function () {
            expect(mockCollection.addModels).toHaveBeenCalled();
        });
    });
    describe('Creates totals object', function () {
        beforeEach(function() {
            spyOn(mockSubtotalCostSpan, 'text').and.returnValue(1);
            spyOn(mockVatCostSpan, 'attr').and.returnValue(1);
            spyOn(mockVatCostSpan, 'text').and.returnValue(1);
            spyOn(mockTotalCostSpan, 'text').and.returnValue(1);
            mockTotalsObject = {
                'id': 'basketTotals',
                "subTotal": mockSubtotalCostSpan.text() * 100,
                'vat': mockVatCostSpan.text() * 100,
                'vatPercent': mockVatCostSpan.attr('data-vat-percent')/100,
                'grandTotal': mockTotalCostSpan.text() * 100
            };

            mockReturnedTotals = view.createTotalsObject();
        });
        it('Returns an Object', function () {
            expect(mockReturnedTotals).toEqual(mockTotalsObject);
        });
    });

    describe('Sets totals Collection Model', function () {
        beforeEach(function() {
            spyOn(view, 'createTotalsObject');
            view.setTotalsCollectionModel();
        });
        it('Adds the new Model to Collection', function () {
            expect(view.createTotalsObject).toHaveBeenCalled();
            expect(app.Model).toHaveBeenCalled();
            expect(mockCollection.addModel).toHaveBeenCalled();
        });
    });

    describe('Removes products from basket', function () {
        beforeEach(function() {
            mockRemoveEvent = {
                preventDefault: jasmine.createSpy(),
                currentTarget: 'a'
            };
            spyOn(mockCollection, 'getModelById').and.returnValue(1);

            view.removeProduct(mockRemoveEvent);
        });
        xit('Remove basket product', function () {
            expect(mockRemoveEvent.preventDefault).toHaveBeenCalled();
            expect($).toHaveBeenCalledWith(mockRemoveEvent.currentTarget);
            //expect(app.Collection.getModelById).toHaveBeenCalled();

        });
    });

    describe('Calculates totals in Basket', function () {
        beforeEach(function() {
            view.updateTotalsWithCollection();
        });
        xit('', function () {
            expect(1).toBe(2);
        });
    });
    describe('Updates totals in Basket', function () {
        beforeEach(function() {
            view.updateBasket();
        });
        xit('', function () {
            expect(1).toBe(2);
        });
    });
    describe('Updates totals Model', function () {
        beforeEach(function() {
            view.submitProductUpdate();
        });
        xit('', function () {
            expect(1).toBe(2);
        });
    });
    describe('Updates product Model', function () {
        beforeEach(function() {
            view.updateProductModel();
        });
        xit('', function () {
            expect(1).toBe(2);
        });
    });
    describe('Manages "Buy now >> " submission', function () {
        beforeEach(function() {
            view.onProceedToCheckoutSubmit();
        });
        xit('', function () {
            expect(1).toBe(2);
        });
    });
    describe('Sets form validation', function () {
        beforeEach(function() {
            view.addValidation();
        });
        xit('', function () {
            expect(1).toBe(2);
        });
    });

});