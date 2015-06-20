describe('Feed Controller', function() {

    var controller;
    var mockContainer;

    beforeEach(function () {
        mockContainer = {};
        spyOn(window, '$').and.callFake(function(arg) {
            if(arg === '#feed') {
                return mockContainer;
            }
        })

        controller = new app.controllers.FeedController();
    });

    describe('Creates new Feed Controller', function () {
        it('Gets the Feed container', function () {
            expect(controller.container).toBe(mockContainer);
        });
    });
    describe('', function () {
        it('', function () {

        });
    });
    describe('', function () {
        it('', function () {

        });
    });
    describe('', function () {
        it('', function () {

        });
    });
    describe('', function () {
        it('', function () {

        });
    });

});