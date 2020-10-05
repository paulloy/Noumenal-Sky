$.getJSON("assets/js/json/references.json").done(function (data) {
  var key = 5;

  describe("First Reference", function () {
    it("should return 5", function () {
      expect(key).toBe(5);
    });
  });
});
