describe('Basket Controller', function () {

    var controller;
    var mockContainer;
    var mockView;

    beforeEach(function() {

        mockContainer = jasmine.createSpy();
        spyOn(window, '$').and.callFake(function (arg) {
            if(arg === '#basket') {
                return mockContainer;
            }
        });

        mockView = jasmine.createSpy();
        spyOn(app.views, 'BasketView').and.callFake(function () {
            return mockView;
        });

        controller = new app.controllers.BasketController();
    });

    describe('Creating new Basket Controller', function () {
        it('Creates container property', function () {
            expect(controller.container).toBe(mockContainer);
        });
        it('Creates new Basket View', function () {
            expect(controller.view).toBe(mockView);
        });
    });
});