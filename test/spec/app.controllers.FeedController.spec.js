describe('Feed Controller', function() {

    var controller;
    var mockContainer;
    var mockItemId;
    var mockModel;
    var mockCollection;

    beforeEach(function () {
        mockContainer = {};
        mockItemId = 123;
        mockModel = {};
        spyOn(window, '$').and.callFake(function(arg) {
            if(arg === '#feed') {
                return mockContainer;
            }
        });
        spyOn($, 'proxy');
        spyOn(app.views, 'FeedView');

        mockCollection = jasmine.createSpyObj('Collection', ['addModel']);
        spyOn(app, 'Collection').and.callFake(function () {
            return mockCollection;
        });



        controller = new app.controllers.FeedController();
    });

    describe('Creates new Feed Controller', function () {
        it('Gets the Feed container', function () {
            expect(controller.container).toBe(mockContainer);
        });
    });
    describe('Creates a new Feed View', function () {
        it('App Feed View is called', function () {
            expect(app.views.FeedView).toHaveBeenCalledWith(mockContainer);
        });
    });
    xdescribe('Listens for "imageSelected" event on the View', function () {
        it('Calls "itemSelected" method with Item Id', function () {
            expect($.proxy).toHaveBeenCalledWith(controller, 'imageSelected');
        });
    });
    xdescribe('Creates new Feed Collection', function () {
        it('App Feed Service is called', function () {
            expect(app.Collection).toHaveBeenCalledWith(mockContainer);
        });
    });
    xdescribe('Iterates through Feed data', function () {
        it('Creates a Model for each image', function () {
            expect(controller.collection.addModel).toHaveBeenCalledWith(mockModel);
        });
    });

    // Controller methods
    xdescribe('When an image has been selected', function () {
        beforeEach(function() {
            controller.itemSelected(mockItemId);
        });
        it('Retrieves the Model in Collection', function () {
            expect(controller.collection.getModelById).toHaveBeenCalled(mockItemId)
        });
        it('Sets Model selected proprty value',function () {
            expect(app.Model.setAttribute).toHaveBeenCalledWith('selected', true);
        });
        it('Saves the Collection state', function () {
            expect(controller.collection.saveToSessionStorage).toHaveBeenCalled();
        });
    });

    describe('When a Collection exists in session storage', function () {
        it('Displays previously selected images', function () {
            //expect().toBe();
        });
    });

});