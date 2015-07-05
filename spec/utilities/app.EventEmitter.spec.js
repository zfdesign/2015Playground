describe("Event Emitter", function() {
    var eventEmitter;
    var mockListener;
    var mockListener2;
    var mockContext;

    beforeEach(function() {
        mockContext = {};
        mockListener = jasmine.createSpy();
        mockListener2 = jasmine.createSpy();
        eventEmitter = new app.EventEmitter();
    });

    describe("Creating an event emitter", function() {
        it("Adds an event object property", function() {
            expect(typeof eventEmitter.events).toBe("object");
        });
    });

    describe("Listening to an event", function() {
        describe("No listeners", function() {
            it("Does not throw", function() {
                expect(function() {
                    eventEmitter.on("someEvent", mockListener);
                }).not.toThrow();
            });
        });
        describe("No context supplied", function() {
            it("Adds listener to the events object", function() {
                eventEmitter.on("someEvent", mockListener);
                expect(eventEmitter.events.someEvent.subscribers[0].fn).toBe(mockListener);
                expect(eventEmitter.events.someEvent.subscribers[0].context).toBe(null);
            });
        });
        describe("Context supplied", function() {
            it("Adds listener to the events object", function() {
                eventEmitter.on("someEvent", mockListener, mockContext);
                expect(eventEmitter.events.someEvent.subscribers[0].fn).toBe(mockListener);
                expect(eventEmitter.events.someEvent.subscribers[0].context).toBe(mockContext);
            });
        });
        describe("Adding more than one listener", function() {
            it("Adds multiple subscribers", function() {
                eventEmitter.on("someEvent", mockListener);
                eventEmitter.on("someEvent", mockListener2);
                expect(eventEmitter.events.someEvent.subscribers[0].fn).toBe(mockListener);
                expect(eventEmitter.events.someEvent.subscribers[1].fn).toBe(mockListener2);
            });
        });
    });

    describe("Firing an event", function() {
        describe("No listeners", function() {
            it("Does not throw", function() {
                expect(function() {
                    eventEmitter.fire("doesntExistEvent");
                }).not.toThrow();
            });
        });
        describe("Has listeners", function() {
            describe("Error free listener", function() {
                it("Calls the listeners with all arguments but the first", function() {
                    eventEmitter.events.someEvent = {
                        subscribers: [
                            {
                                fn: mockListener,
                                context: mockContext
                            }, {
                                fn: mockListener2,
                                context: mockContext
                            }
                        ]
                    };
                    eventEmitter.fire("someEvent", 1, 2);
                    expect(mockListener).toHaveBeenCalledWith(1, 2);
                    expect(mockListener2).toHaveBeenCalledWith(1, 2);
                });
            });

            describe("Erroneous listener", function() {
                it("Continues to call the other listeners", function() {
                    mockListener.and.throwError("someError");
                    eventEmitter.events.someEvent = {
                        subscribers: [
                            {
                                fn: mockListener,
                                context: mockContext
                            }, {
                                fn: mockListener2,
                                context: mockContext
                            }
                        ]
                    };
                    eventEmitter.fire("someEvent", 1, 2);
                    expect(mockListener2).toHaveBeenCalledWith(1, 2);
                });
            });

        });
    });
});
