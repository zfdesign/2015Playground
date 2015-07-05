describe('Campaign View', function () {

    var view;
    var mockContainer;

    beforeEach(function() {

        spyOn(app.views.FundraisingView, 'superConstructor');
        mockContainer = jasmine.createSpyObj('mockContainer', ['on']);
        spyOn(window, '$').and.callFake(function(args) {
            if(args === 'form#newCampaign') {
                return mockContainer;
            }
        });

        view = new app.views.FundraisingView();
    });

    describe('Creating new Campaign Controller', function () {
        it('Calls its superConstructor', function () {
            expect(app.views.FundraisingView.superConstructor).toHaveBeenCalled();
            expect(app.views.FundraisingView.superConstructor.calls.mostRecent().object).toBe(view);
        });
        it('Sets container', function () {
            expect(view.container).toBe(mockContainer);
        });
    });

});
