describe("Traversal Service", function () {

  var Traverser;

  beforeEach(module('traversal'));

  beforeEach(inject(function (_Traverser_) {
    Traverser = _Traverser_;
  }));

  describe("The Basics", function () {
    it("should be true", function () {
      expect(Traverser.x).toBe(1);
    })

  });

});