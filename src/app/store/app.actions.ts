import { Action } from '@ngrx/store';
import { MenuItem } from '../menuItem.model';
import { Favorite } from '../favorite.model';

export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const SAVE_EDITED_FAVORITE = 'SAVE_EDITED_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const SAVE_SORTED_FAVORITES = 'SAVE_SORTED_FAVORITES';
export const PROCESS_IMPORTED_SETTINGS = 'PROCESS_IMPORTED_SETTINGS';
export const RETURN_FILTERED_FAVORITES = 'RETURN_FILTERED_FAVORITES';
export const EXPORT_SETTINGS = 'EXPORT_SETTINGS';
export const EDIT_MODE_CHANGED = 'EDIT_MODE_CHANGED';
export const FORM_EDIT_MODE_CHANGED = 'FORM_EDIT_MODE_CHANGED';
export const ACTIVE_ROUTE = 'ACTIVE_ROUTE';

export class AddMenuItem implements Action {
  readonly type = ADD_MENU_ITEM;
  constructor(public payload: MenuItem) {}
}

export class DeleteMenuItem implements Action {
  readonly type = DELETE_MENU_ITEM;
  constructor(public payload: MenuItem) {}
}

export class AddFavorite implements Action {
  readonly type = ADD_FAVORITE;
  constructor(public payload: Favorite) {}
}

export class SaveEditedFavorite implements Action {
  readonly type = SAVE_EDITED_FAVORITE;
  constructor(public payload: {originalFavorite: Favorite, newFavorite: Favorite}) {}
}

export class DeleteFavorite implements Action {
  readonly type = DELETE_FAVORITE;
  constructor(public payload: Favorite) {}
}

export class SaveSortedFavorites implements Action {
  readonly type = SAVE_SORTED_FAVORITES;
  constructor(public payload: Favorite[]) {}
}

export class ProcessImportedSettings implements Action {
  readonly type = PROCESS_IMPORTED_SETTINGS;
  constructor(public payload: {settings: [Favorite[], MenuItem[]]}) {}
}

export class ReturnFilteredFavorites implements Action {
  readonly type = RETURN_FILTERED_FAVORITES;
  constructor(public payload: string) {}
}

export class ExportSettings implements Action {
  readonly type = EXPORT_SETTINGS;
}

export class EditModeChanged implements Action {
  readonly type = EDIT_MODE_CHANGED;
  constructor(public payload: boolean) {}
}

export class FormEditModeChanged implements Action {
  readonly type = FORM_EDIT_MODE_CHANGED;
  constructor(public payload: {formEditMode: boolean, editedFavorite?: Favorite }) {}
}

export class ActiveRoute implements Action {
  readonly type = ACTIVE_ROUTE;
  constructor(public payload: string) {}
}

export type AppActions =
  AddMenuItem |
  DeleteMenuItem |
  AddFavorite |
  SaveEditedFavorite |
  DeleteFavorite |
  SaveSortedFavorites |
  ProcessImportedSettings |
  ReturnFilteredFavorites |
  ExportSettings |
  EditModeChanged |
  FormEditModeChanged |
  ActiveRoute;
