const Book = require('../models/Book');

function updateTradeStep(targetBook, res, step){
    Book.findById(targetBook, (err, book) =>{
        if ( err ) {
            res.sendStatus(500);
        }
        book.tradeStep = step;
        book.save((err) =>{
            if ( err ) {
                res.sendStatus(500);
            }
            res.end();
        });
    });
}

module.exports = (req, res) =>{
    if ( req.isAuthenticated() ) {
        let targetBook = req.params.id;
        if ( req.method === 'DELETE' ) {
            updateTradeStep(targetBook, res, 0);
        } else {
            switch (req.body.operation) {
                case 'demand':
                    updateTradeStep(targetBook, res, 1);
                    break;
                case 'accept':
                    updateTradeStep(targetBook, res, 2);
                    break;
                case 'sent':
                    updateTradeStep(targetBook, res, 3);
                    break;
                case 'received':
                    updateTradeStep(targetBook, res, 4);
                    break;
                case 'cancel':
                    updateTradeStep(targetBook, res, 0);
                    break;
                default:
                    res.sendStatus(400);
            }
        }
    } else {
        res.sendStatus(403);
    }
};
