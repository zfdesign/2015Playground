describe("Base view", function() {

    var view;

    beforeEach(function() {
        spyOn(je.views.BaseView, "superConstructor");
        view = new je.views.BaseView();
    });

    describe("Creating a base view", function() {
        it("Calls the event emitter super constructor", function() {
            expect(je.views.BaseView.superConstructor).toHaveBeenCalled();
            expect(je.views.BaseView.superConstructor.calls.mostRecent().object).toBe(view);
        });
    });

});