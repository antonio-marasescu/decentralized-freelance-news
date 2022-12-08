import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';
import { Comparer } from '@ngrx/entity/src/models';

export class NewsArticleSortUtils {
  static sortAscendingByDateCompareFn: Comparer<INewsModel> = (a: INewsModel, b: INewsModel) =>
    a.index - b.index;
  static sortDescendingByDateCompareFn: Comparer<INewsModel> = (a: INewsModel, b: INewsModel) =>
    b.index - a.index;
  static sortAscendingByRatingCompareFn: Comparer<INewsModel> = (a: INewsModel, b: INewsModel) =>
    a.rating - b.rating;
  static sortDescendingByRatingCompareFn: Comparer<INewsModel> = (a: INewsModel, b: INewsModel) =>
    b.rating - a.rating;
}
