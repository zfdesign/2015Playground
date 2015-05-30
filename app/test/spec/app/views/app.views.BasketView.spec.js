describe('Basket View', function() {

    var view;
    var mockContainer;

    beforeEach(function () {
        mockContainer = {};

        spyOn(window, '$').and.callFake(function(arg) {
            if(arg === '#basket') {
                return mockContainer;
            }
        });


        view = new app.views.BasketView();
    });

    describe('Creates new Basket View', function() {
        it('Sets container property value', function () {
            expect(view.container).toBe(mockContainer);
        });
    });

});