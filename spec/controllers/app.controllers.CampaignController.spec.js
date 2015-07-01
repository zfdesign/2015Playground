describe('Campaign Controller', function () {

    var controller;
    var mockCampaignView;

    beforeEach(function() {
        mockCampaignView = jasmine.createSpy();
        spyOn(app.views, 'CampaignView').and.returnValue(mockCampaignView);

        controller = new app.controllers.CampaignController();
    });

    describe('Creating new Campaign Controller', function () {
        it('Creates new Campaign View', function () {
            expect(controller.view).toBe(mockCampaignView);
        });
    });
});
