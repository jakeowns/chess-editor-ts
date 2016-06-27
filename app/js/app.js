define("FenLoader", ["require", "exports", 'jquery'], function (require, exports, $) {
    "use strict";
    var FenLoader = (function () {
        function FenLoader() {
        }
        FenLoader.prototype.load = function (fen) {
            var rows = fen.split('/');
            $('board board-row').each(function () {
                var c = rows[$(this).index()].split(''), $squares = $(this).find('square'), chp = 0;
                for (var i = 0; i < $squares.length; i++) {
                    if (!isNaN(+c[chp])) {
                        i = i + (+c[chp] - 1);
                    }
                    else {
                        var prefix = c[chp] === c[chp].toUpperCase() ? '_' : '';
                        $($squares.get(i)).append($('<piece>').append('<img src="/app/img/pieces/' + prefix + c[chp] + '.png"/>'));
                    }
                    chp++;
                }
            });
        };
        return FenLoader;
    }());
    exports.FenLoader = FenLoader;
});
define("ChessBoard", ["require", "exports", 'jquery', "FenLoader"], function (require, exports, $, FenLoader_1) {
    "use strict";
    var ChessBoard = (function () {
        function ChessBoard(startFen) {
            if (startFen === void 0) { startFen = 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R'; }
            this.startFen = startFen;
        }
        ChessBoard.prototype.run = function () {
            this.fen = new FenLoader_1.FenLoader();
            this.fen.load(this.startFen);
            $('board')
                .find('square').droppable({
                drop: function (e, ui) {
                    var $drag = $(ui.draggable).detach().css({ top: 0, left: 0 });
                    $(this).empty().append($drag);
                    setTimeout(function () {
                        $drag.draggable();
                    }, 500);
                }
            }).find('piece').draggable({
                zIndex: 10,
                containment: 'board',
                scroll: false
            });
        };
        return ChessBoard;
    }());
    exports.ChessBoard = ChessBoard;
});
define("Main", ["require", "exports", "ChessBoard"], function (require, exports, ChessBoard_1) {
    "use strict";
    var Main = (function () {
        function Main() {
        }
        Main.prototype.run = function () {
            var board = new ChessBoard_1.ChessBoard();
            board.run();
        };
        return Main;
    }());
    exports.Main = Main;
});
require.config({
    baseUrl: "/app/js",
    shim: {
        "jquery": { exports: "$" },
        "jqueryui": { "deps": ["jquery"] },
        "bootstrap": { "deps": ["jquery"] }
    },
    paths: {
        "jquery": "/bower/jquery/dist/jquery.min",
        "jqueryui": "/bower/jqueryui/jquery-ui.min",
        "bootstrap": "/bower/bootstrap/dist/js/bootstrap.min"
    }
});
require(['Main', 'jquery', 'jqueryui'], function (app, $) {
    $(function () {
        var main = new app.Main();
        main.run();
    });
});
