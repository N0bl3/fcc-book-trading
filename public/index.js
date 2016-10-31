$('body')
    .on('click.not-wanted', '.not-wanted', function () {
        var self = $(this);
        var bookId = $(this)
            .data('book');
        var userId = $(this).data('user');

        $.ajax({url: '/users/' + userId + '/wanted/' + bookId, method: 'PUT'})
            .done(function () {
                self.toggleClass('disabled');
                self.toggleClass('wanted');
                self.toggleClass('not-wanted');
                self.text('Wanted');
            });
    })
    .on('click.wanted', '.wanted', function () {
        var self = $(this);
        var bookId = $(this)
            .data('book');
        var userId = $(this).data('user');

        $.ajax({
            url: '/users/' + userId + '/wanted/' + bookId,
            method: 'DELETE'
        })
            .done(function () {
                self.toggleClass('disabled');
                self.toggleClass('wanted');
                self.toggleClass('not-wanted');
                self.text('Want this?');
            });
    });
