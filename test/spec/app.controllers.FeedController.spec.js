describe('Feed Controller', function() {

    var controller;
    var mockContainer;
    var mockView;
    var mockItemId;
    var mockModel;
    var mockCollection;
    var mockFeed;
    var mockEventData;
    var mockSessionStorage;

    beforeEach(function () {
        mockItemId = 123;
        mockModel = jasmine.createSpyObj('mockModel', ['setAttribute']);
        mockFeed = {};

        mockContainer = {};
        spyOn(window, '$').and.callFake(function(arg) {
            if(arg === '#feed') {
                return mockContainer;
            }
        });
        spyOn($, 'proxy');

        mockView = jasmine.createSpyObj('mockView', ['on', 'displayImages'])
        spyOn(app.views, 'FeedView').and.callFake(function(){
            return mockView;
        });

        mockSessionStorage = jasmine.createSpyObj('mockSessionStorage', ['setItem', 'getItem']);
        spyOn(window, 'sessionStorage').and.callFake(function(){
            return mockSessionStorage;
        });

        mockCollection = jasmine.createSpyObj('Collection', ['addModel', 'getModelById']);
        spyOn(app, 'Collection').and.callFake(function () {
            return mockCollection;
        });
        mockCollection.getModelById.and.callFake(function () {
            return mockModel;
        });

        controller = new app.controllers.FeedController();
    });

    describe('Creates new Feed Controller', function () {
        it('Sets the Feed container', function () {
            expect(controller.container).toBe(mockContainer);
        });
    });
    describe('Creates a new Feed View', function () {
        it('App Feed View is called', function () {
            expect(app.views.FeedView).toHaveBeenCalledWith(mockContainer);
        });
    });
    describe('Listens for "imgClassToggle" event on the View', function () {
        it('Calls "onImgClassToggle" method', function () {
            expect($.proxy).toHaveBeenCalledWith(controller, 'onImgClassToggle');
        });
    });
    describe('Creates new Collection', function () {
        it('App Collection is called', function () {
            expect(app.Collection).toHaveBeenCalled();
        });
        it('Sets collection property', function () {
            expect(controller.collection).toBe(mockCollection);
        });
    });

    describe('When an image selection has been toggled', function () {
        beforeEach(function() {
            mockEventData = {
                "modelId": 123,
                "selected": true
            };
            controller.onImgClassToggle(mockEventData);
        });
        it('Retrieves the Model in Collection', function () {
            expect(mockCollection.getModelById).toHaveBeenCalledWith(mockEventData.modelId);
        });
        it('Sets Model selected proprty value',function () {
            expect(mockModel.setAttribute).toHaveBeenCalledWith('selected', 'selected');
        });
    });

    describe('When the Feed is saved in session', function () {
        beforeEach(function() {
            controller.saveFeed();
        });
        xit('Puts localStorage "flickrFeed" data in storage', function () {
            expect(mockSessionStorage.setItem).toHaveBeenCalledWith('flickrFeed', jasmine.any('string'));
        });
    });
    describe('When a Collection is saved in session', function () {
        beforeEach(function() {
            controller.saveCollection();
        });
        xit('Puts localStorage "flickrCollection" data in storage', function () {
            expect(mockSessionStorage.setItem).toHaveBeenCalledWith('flickrFeed', jasmine.any('string'));
        });
    });

    describe('When updating the Collection', function () {
        beforeEach(function() {
            spyOn(controller, 'saveCollection');
            controller.updateCollection();
        });
        it('Adds new Models to Collection and Saves the Collection', function () {
            expect(mockCollection.getModelById).toHaveBeenCalled();
            expect(mockView.displayImages).toHaveBeenCalled();
        });
    });
    describe('When a new feed is retrieved', function () {
        beforeEach(function() {
            spyOn(controller, 'saveFeed');
            spyOn(controller, 'updateCollection');
            controller.setLiveFeed(mockFeed);
        });
        it('Puts localStorage "flickrCollection" data in storage', function () {
            expect(controller.feed).toBe(mockFeed);
            expect(controller.saveFeed).toHaveBeenCalled();
            expect(controller.updateCollection).toHaveBeenCalled();

        });
    });

});