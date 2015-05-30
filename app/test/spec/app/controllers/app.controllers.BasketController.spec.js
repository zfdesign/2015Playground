describe('Basket Controller', function () {

    var controller;
    var mockView;

    beforeEach(function() {

        mockView = {};
        spyOn(app.views, 'BasketView').and.callFake(function () {
            return mockView;
        });

        controller = new app.controllers.BasketController();
    });

    describe('Creates new Basket Controller', function () {
        it('Creates new Basket View', function () {
            expect(controller.view).toBe(mockView);
        })
    });
});