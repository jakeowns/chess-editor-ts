import * as $ from 'jquery';
import {FenLoader} from './FenLoader';

export class ChessBoard {
  private fen: FenLoader;
  constructor(private startFen: string = 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R') {
  }
  public run(): void {
    this.fen = new FenLoader();
    this.fen.load(this.startFen);
    $('board')
      .find('square').droppable({
        drop: function(e, ui) {
          let $drag = $(ui.draggable).detach().css({ top: 0, left: 0 });
          $(this).empty().append( $drag );
          setTimeout(function() {
            $drag.draggable();
          }, 500);
        }
      }).find('piece').draggable({
        zIndex: 10,
        containment: 'board',
        scroll: false
      });
  }
}
