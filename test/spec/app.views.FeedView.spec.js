describe('Feed View', function() {

    var view;
    var mockContainer;

    beforeEach(function () {
        mockContainer = {};

        view = new app.views.FeedView(mockContainer);
    });

    describe('Creating new Feed View', function() {
        it('Sets a container property', function () {
            expect(view.container).toBe(mockContainer);
        });
    });
    describe('Listens for CLick events on the Images', function () {
        it('imageToggle state is called', function () {

        });
    });
    describe('When images data is provided', function () {
        it('Creates new List of images Feed', function () {

        });
    });
    describe('When images have been previously selected', function () {
        it('Sets images class to "selected"', function () {

        });
    });
    describe('Selecting an image', function () {
        it('Toggles the image class', function () {

        });
        it('Fires "imageSelected" with image', function () {

        });
    });
    describe('', function () {
        it('', function () {

        });
    });

});