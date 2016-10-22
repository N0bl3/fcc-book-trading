$(function (){
    $("#delete-profile").click(function(){
        confirm("Do you really want to delete your profile?");
    });
    $("#fb-disconnect").click(function(){
        alert("Disconnect FB");
    });
    $("#google-disconnect").click(function(){
        alert("Disconnect Google");
    });
    $(".delete-book").click(function () {
        $.ajax({
            method: "DELETE",
            url: "/book/" + $(this).data("id")
        }).done(function () {
            window.location.reload(true);
        }).fail(function(xhr, textStatus){
            alert(textStatus);
        });
    });
});