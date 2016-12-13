$(function(){
    $('#delete-profile')
    .click(function(){
        if ( confirm('Do you really want to delete your profile?') ) {
            $.ajax({
                method: 'DELETE',
                url   : '/users/me'
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
            url   : '/books/' + $(this)
            .data('id')
        })
        .done(function(){
            window.location.reload(true);
        })
        .fail(/* @callback */ function(xhr, textStatus){
            alert(textStatus);
        });
    });
    $('#update-profile')
    .on('submit', function(e){
        e.preventDefault();
        var formData = $(this)
        .serializeArray();
        var data     = {};

        formData.forEach(function(elem){
            data[elem.name] = elem.value;
        });

        $.ajax({
            url: '/users/me',
            method: 'PUT',
            data: data
        });
    });
    $('.accept-trade')
    .click(function(e){
        var self   = $(this);
        var bookId = $(this)
        .data('book');
        e.preventDefault();
        $.ajax({
            url   : '/books/' + bookId + '/trade',
            method: 'POST',
            data  : { operation: 'accept' }
        })
        .done(function(){
                self.toggleClass('accept-trade');
                self.text = "Accepted";
            }
        )
        .fail(function(err){
            console.log(err);
        });
    });
    $('.send-trade')
    .click(function(e){
        var self   = $(this);
        var bookId = $(this)
        .data('book');
        e.preventDefault();
        $.ajax({
            url   : '/books/' + bookId + '/trade',
            method: 'POST',
            data  : { operation: 'sent' }
        })
        .done(function(){
            self.toggleClass('send-trade');
            self.text = "Sent";
        })
        .fail(function(err){
            console.log(err);
        });

    });
    $('.receive-trade')
    .click(function(e){
        var self   = $(this);
        var bookId = $(this)
        .data('book');
        e.preventDefault();
        $.ajax({
            url   : '/books/' + bookId + '/trade',
            method: 'POST',
            data  : { operation: 'received' }
        })
        .done(function(){
            self.toggleClass('receive-trade');
            self.text = "Received";
        })
        .fail(function(err){
            console.log(err);
        });

    });
    $('.cancel-trade')
    .click(function(e){
        var self   = $(this);
        var bookId = $(this)
        .data('book');
        e.preventDefault();
        $.ajax({
            url   : '/books/' + bookId + '/trade',
            method: 'POST',
            data  : { operation: 'cancel' }
        })
        .done(function(){
            self.toggleClass('cancel-trade');
            self.text = "Canceled";
        })
        .fail(function(err){
            console.log(err);
        });
    });
});
