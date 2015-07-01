describe("Base view", function() {

    var view;

    beforeEach(function() {
        spyOn(app.views.BaseView, "superConstructor");
        view = new app.views.BaseView();
    });

    describe("Creating a base view", function() {
        it("Calls the event emitter super constructor", function() {
            expect(app.views.BaseView.superConstructor).toHaveBeenCalled();
            expect(app.views.BaseView.superConstructor.calls.mostRecent().object).toBe(view);
        });
    });

});