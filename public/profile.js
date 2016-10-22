$(function (){
    $("#delete-profile").click(function(){
        if(confirm("Do you really want to delete your profile?")){
            $.ajax({
                method: "DELETE",
                url: "/profile"
            }).done(function(){
                window.location.reload(true);
            }).fail(function (xhr, textStatus) {
                alert(textStatus);
            });
        }
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