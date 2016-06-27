import * as $ from 'jquery';

export class FenLoader {
  constructor() {
  }
  public load(fen: string): void {
    //reg /([rnbqkn1-8]{1,8}\/?){8}/i
    let rows = fen.split('/');
    $('board board-row').each(function() {
      let c = rows[ $(this).index() ].split(''),
          $squares = $(this).find('square'),
          chp = 0;
      for(let i = 0; i < $squares.length; i++) {
        if(!isNaN(+c[chp])) {
          i = i + (+c[chp]-1);
        } else {
          let prefix = c[chp] === c[chp].toUpperCase() ? '_' : '';
          $($squares.get(i)).append(
            $('<piece>').append('<img src="/app/img/pieces/' + prefix + c[chp] + '.png"/>')
          );
        }
        chp++;
      }
    });
  }
}
