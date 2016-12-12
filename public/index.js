$('body')
    .on('click.not-wanted', '.not-wanted', function () {
        var self = $(this);
        var bookId = $(this)
            .data('book');

        $.ajax({
            url   : '/users/me/wanted/' + bookId,
            method: 'PUT',
            data  : 'demand'
        })
            .done(function () {
                self.toggleClass('disabled');
                self.toggleClass('not-wanted');
                self.toggleClass('wanted');
                self.text('Wanted');
            })
        .fail(function(err){
            console.error(err);
        });
    })
    .on('click.wanted', '.wanted', function () {
        var self = $(this);
        var bookId = $(this)
            .data('book');

        $.ajax({
            url   : '/users/me/wanted/' + bookId,
            method: 'DELETE'
        })
            .done(function () {
                self.toggleClass('disabled');
                self.toggleClass('wanted');
                self.toggleClass('not-wanted');
                self.text('Want this?');
            });
    });
