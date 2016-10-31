$(function(){
    $('#delete-profile')
    .click(function(){
        if ( confirm('Do you really want to delete your profile?') ) {
            $.ajax({
                method: 'DELETE',
                url: '/users/me'
            })
            .done(function(){
                window.location.reload(true);
            })
            .fail(/* @callback */ function(xhr, textStatus){
                alert(textStatus);
            });
        }
    });
    $('#fb-disconnect')
    .click(function(){
        alert('Disconnect FB');
    });
    $('#google-disconnect')
    .click(function(){
        alert('Disconnect Google');
    });
    $('.delete-book')
    .click(function(){
        $.ajax({
            method: 'DELETE',
            url: '/books/' + $(this)
            .data('id')
        })
        .done(function(){
            window.location.reload(true);
        })
        .fail(/* @callback */ function(xhr, textStatus){
            alert(textStatus);
        });
    });
    $('#update-profile').on('submit', function (e) {
        e.preventDefault();
        var formData = $(this).serializeArray();
        var data = {};

        formData.forEach(function (elem) {
            data[elem.name] = elem.value;
        });

        $.ajax({
            url: '/users/me',
            method: 'PUT',
            data: data
        });
    })
});
