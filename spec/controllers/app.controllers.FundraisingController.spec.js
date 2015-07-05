describe('Campaign Controller', function () {

    var controller;
    var mockCampaignView;

    beforeEach(function() {
        mockCampaignView = jasmine.createSpy();
        spyOn(app.views, 'FundraisingView').and.returnValue(mockCampaignView);

        controller = new app.controllers.FundraisingController();
    });

    describe('Creating new Campaign Controller', function () {
        it('Creates new Campaign View', function () {
            expect(controller.view).toBe(mockCampaignView);
        });
    });
});
