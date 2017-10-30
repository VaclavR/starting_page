import * as AppActions from './app.actions';
import * as FileSaver from 'file-saver';
import { Favorite } from '../favorite.model';
import { MenuItem } from '../menuItem.model';

let initialState = {
  favorites: [
    new Favorite('idnes', 'http://idnes.cz', 'news'),
    new Favorite('lidovky', 'http://lidovky.cz', 'news'),
    new Favorite('duolingo', 'http://duolingo.com', 'education')
  ],
  menuItems: [
    new MenuItem('news'),
    new MenuItem('education')
  ],
  activeMenuItem: 'all',
  formEditMode: false,
  itemEditMode: false,
  editedFavorite: new Favorite('', '', ''),
  activeRoute: 'all'
};

if (localStorage.menuItems) {
  initialState.menuItems = JSON.parse(localStorage.getItem('menuItems'));
}
if (localStorage.favorites) {
  initialState.favorites = JSON.parse(localStorage.getItem('favorites'));
}

export function appReducer(state = initialState, action: AppActions.AppActions) {
  switch (action.type) {

    case (AppActions.ADD_MENU_ITEM):
      initialState.menuItems = [...state.menuItems, action.payload];
      localStorage.setItem('menuItems', JSON.stringify(initialState.menuItems));
       return {
        ...state,
        menuItems: [...state.menuItems, action.payload]
        };

    case (AppActions.DELETE_MENU_ITEM):
      const oldMenuItems = [...state.menuItems];
      oldMenuItems.splice(oldMenuItems.findIndex((menuItem) => {
        return menuItem.name === action.payload.name;
      }), 1);
      initialState.menuItems = oldMenuItems;
      localStorage.setItem('menuItems', JSON.stringify(initialState.menuItems));
      return {
        ...state,
        menuItems: oldMenuItems
      };

    case (AppActions.ADD_FAVORITE):
      initialState.favorites = [...initialState.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case (AppActions.SAVE_EDITED_FAVORITE):
      const filterFavorites = [...state.favorites];
      let pos = filterFavorites.indexOf(action.payload.originalFavorite);
      filterFavorites[pos] = action.payload.newFavorite;
      const editedFavorites = [...initialState.favorites];
      pos = editedFavorites.indexOf(action.payload.originalFavorite);
      editedFavorites[pos] = action.payload.newFavorite;
      initialState.favorites = editedFavorites;
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return {
        ...state,
        favorites: filterFavorites
      };

    case (AppActions.DELETE_FAVORITE):
      const deletedFavorites = [...initialState.favorites];
      deletedFavorites.splice(deletedFavorites.indexOf(action.payload), 1);
      initialState.favorites = deletedFavorites;
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return {
        ...state,
        favorites: deletedFavorites
      };

    case (AppActions.SAVE_SORTED_FAVORITES):
      initialState.favorites = action.payload;
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return {
          ...state,
          favorites: action.payload
        };

    case (AppActions.PROCESS_IMPORTED_SETTINGS):
      const importedState = {
        ...state,
        favorites: action.payload.settings[0],
        menuItems: action.payload.settings[1]
      };
      initialState = importedState;
      localStorage.setItem('menuItems', JSON.stringify(initialState.menuItems));
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return initialState;

    case (AppActions.RETURN_FILTERED_FAVORITES):
      if (action.payload === 'all' ||
          action.payload === undefined ||
          action.payload === 'sort') {
        return {
          ...state,
          favorites: initialState.favorites,
          menuItems: initialState.menuItems
        };
      }
      const oldFavorites = [...initialState.favorites];
      const filteredFavorites = oldFavorites.filter((favorite) => {
        return favorite.category === action.payload;
      });
      return {
        ...state,
        favorites: filteredFavorites,
        menuItems: state.menuItems
      };

    case (AppActions.EXPORT_SETTINGS):
      const settings = [];
      settings.push(initialState.favorites);
      settings.push(initialState.menuItems);
      const jsonedSettings = new File([JSON.stringify(settings)],
        'settings.json', {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(jsonedSettings);
      return state;

    case (AppActions.EDIT_MODE_CHANGED):
      return {
        ...state,
        itemEditMode: action.payload
      };

    case (AppActions.FORM_EDIT_MODE_CHANGED):
      if (!action.payload.formEditMode) {
        return {
          ...state,
          formEditMode: action.payload.formEditMode,
          editedFavorite: new Favorite('', '', state.activeRoute)
        };
      }
      return {
        ...state,
        formEditMode: action.payload.formEditMode,
        editedFavorite: action.payload.editedFavorite
      };

    case (AppActions.ACTIVE_ROUTE):
      return {
        ...state,
        activeRoute: action.payload
      };

    default:
      return state;
  }
}
