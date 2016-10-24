$("body").on("click.not-wanted", ".not-wanted", function () {
  var self = $(this);
  var id = $(this).data("id");

  $.post("/wanted/" + id).done(function () {
    self.toggleClass("disabled");
    self.toggleClass("wanted");
    self.toggleClass("not-wanted");
    self.text("Wanted");
  });
});

$("body").on("click.wanted", ".wanted", function () {
  var self = $(this);
  var id = $(this).data("id");

  $.ajax({
    url: "/wanted/" + id, method: "DELETE"
  }).done(function () {
    self.toggleClass("disabled");
    self.toggleClass("wanted");
    self.toggleClass("not-wanted");
    self.text("Want this?");
  });
});
