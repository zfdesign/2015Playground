describe('Feed View', function() {

    var view;
    var mockContainer;
    var mockContainerChildren;
    var mockContainerFind;
    var mockEventData;
    var mockObject;
    var mockImg;
    var mockModel;
    var mockCollection;

    beforeEach(function () {
        spyOn(app.views.FeedView, "superConstructor");
        mockContainer = jasmine.createSpyObj('mockContainer',['on', 'find', 'toggleClass', 'children', 'append']);
        mockContainerFind = {"length": 1, "is": jasmine.createSpy, "toggleClass": jasmine.createSpy};
        mockContainer.find.and.returnValue(mockContainerFind);
        mockContainerChildren = jasmine.createSpyObj('mockContainerChildren', ['append']);
        mockContainer.children.and.returnValue(mockContainerChildren);

        mockImg = jasmine.createSpyObj('mockImg', ['toggleClass', 'attr', 'is']);
        spyOn(window, '$').and.callFake(function(args) {
            if(args === 1) {
                return mockImg;
            }
        });
        mockModel = {
            "attributes": {
                "id" : 1,
                "selected": "selected",
                "media": {
                    "m": 'SomeUrl'
                },
                "title": 'Blah Blah'
            }
        };

        view = new app.views.FeedView(mockContainer);
    });

    describe('Creating new Feed View', function() {
        it('Call its superConstructor', function () {
            expect(app.views.FeedView.superConstructor).toHaveBeenCalled();
            expect(app.views.FeedView.superConstructor.calls.mostRecent().object).toBe(view);
        });
    });
    describe('Creating new Feed View', function() {
        it('Sets a container property', function () {
            expect(view.container).toBe(mockContainer);
        });
    });
    describe('Sets "userSeleted" class on the View container', function () {
        beforeEach(function () {
            mockObject = {};
            mockContainer.find.and.returnValue(mockObject);
            view.setContainerClass();
        });
        it('Toggles conatainer class', function () {
            expect(mockContainer.find).toHaveBeenCalledWith('.selected');
            expect(mockContainer.toggleClass).toHaveBeenCalledWith('userSelected', false);

        });
    });
    describe('Selecting an image', function () {
        beforeEach(function () {
            mockEventData = {
                "currentTarget": 1
            };
            spyOn(view, 'fire');
            spyOn(view, 'setContainerClass');
            view.onImageSelected(mockEventData);
        });
        it('Toggles the image class', function () {
            expect($).toHaveBeenCalledWith(mockEventData.currentTarget);
        });
    });
    describe('On Model Updates', function () {
        beforeEach(function () {
            spyOn(view, 'fire');
            spyOn(view, 'setContainerClass');
            view.setImgSelectedClass(mockModel);
        });
        it('onImageSelected state is called', function () {
            expect(mockContainer.find).toHaveBeenCalledWith('#1');
            expect(view.fire).toHaveBeenCalled();
            expect(view.setContainerClass).toHaveBeenCalled();
        });
    });
/*    describe('For each image data', function () {
        beforeEach(function () {
            view.createListItem(mockModel);
        });
        it('Creates new List item containing the image', function () {
            expect(mockContainer.children).toHaveBeenCalledWith('ul');
        });
    });*/

    describe('displaying the feed images', function () {
        beforeEach(function () {
            mockCollection = {
                "models": [1]
            };
            spyOn(view, 'createListItem');
            spyOn(view, 'setContainerClass');
            view.displayImages(mockCollection);
        });
        it('Calls setContainerClass', function () {
            expect(view.createListItem).toHaveBeenCalledWith(mockCollection.models[0]);
            expect(view.setContainerClass).toHaveBeenCalled();
        });
    });

});