describe('Campaign View', function () {

    var view;
    var mockContainer;

    beforeEach(function() {

        spyOn(app.views.CampaignView, 'superConstructor');
        mockContainer = jasmine.createSpyObj('mockContainer', ['on']);
        spyOn(window, '$').and.callFake(function(args) {
            if(args === 'form#newCampaign') {
                return mockContainer;
            }
        });

        view = new app.views.CampaignView();
    });

    describe('Creating new Campaign Controller', function () {
        it('Calls its superConstructor', function () {
            expect(app.views.CampaignView.superConstructor).toHaveBeenCalled();
            expect(app.views.CampaignView.superConstructor.calls.mostRecent().object).toBe(view);
        });
        it('Sets container', function () {
            expect(view.container).toBe(mockContainer);
        });
    });

});
