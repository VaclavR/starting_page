import * as AppActions from './app.actions';
import * as FileSaver from 'file-saver';
import { Favorite } from '../favorite.model';
import { MenuItem } from '../menuItem.model';

export interface AppState {
  app: State;
}

export interface State {
  favorites: Favorite[];
  menuItems: MenuItem[];
  editedFavorite: Favorite;
  editedMenuItem: MenuItem;
  activeRoute: string;
  menuItemEditMode: boolean;
  favoriteEditMode: boolean;
  itemEditMode: boolean;
  activeModal: {show: boolean, component?: string};
  darkTheme: boolean;
}

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
  editedFavorite: new Favorite('', '', ''),
  editedMenuItem: new MenuItem(''),
  activeRoute: 'all',
  menuItemFormEditMode: false,
  favoriteFormEditMode: false,
  itemEditMode: false,
  activeModal: {show: false},
  darkTheme: false
};

if (localStorage.menuItems) {
  initialState.menuItems = JSON.parse(localStorage.getItem('menuItems'));
}
if (localStorage.favorites) {
  initialState.favorites = JSON.parse(localStorage.getItem('favorites'));
}
if (localStorage.darkTheme) {
  initialState.darkTheme = JSON.parse(localStorage.getItem('darkTheme'));
}

export function appReducer(state = initialState, action: AppActions.AppActions) {
  let pos: number;
  let currentFavorites: Favorite[];

  switch (action.type) {

    case (AppActions.ADD_MENU_ITEM):
      initialState.menuItems = [...state.menuItems, action.payload];
      localStorage.setItem('menuItems', JSON.stringify(initialState.menuItems));
       return {
        ...state,
        menuItems: [...state.menuItems, action.payload]
        };

    case (AppActions.SAVE_EDITED_MENU_ITEM):
      const favoritesToModify = [...initialState.favorites];
      const modifiedFavorites = favoritesToModify.map((favorite) => {
        if (favorite.category === action.payload.originalMenuItem.name ) {
          favorite.category = action.payload.newMenuItem.name;
          return favorite;
        }
        return favorite;
      });
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));



      const filterMenuItems = [...state.menuItems];
      pos = filterMenuItems.indexOf(action.payload.originalMenuItem);
      filterMenuItems[pos] = action.payload.newMenuItem;
      initialState.menuItems = filterMenuItems;
      localStorage.setItem('menuItems', JSON.stringify(initialState.menuItems));
      return {
        ...state,
        menuItems: initialState.menuItems
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
      if (action.payload.category === state.activeRoute) {
        state.favorites = [...state.favorites, action.payload];
      }
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return {
        ...state,
        favorites: [...state.favorites]
      };

    case (AppActions.SAVE_EDITED_FAVORITE):
      const updatedFavorites = [...initialState.favorites];
      pos = updatedFavorites.indexOf(action.payload.originalFavorite);
      updatedFavorites[pos] = action.payload.newFavorite;
      initialState.favorites = updatedFavorites;
      currentFavorites = updatedFavorites.filter((favorite) => {
        return favorite.category === action.payload.originalFavorite.category;
      });
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return {
        ...state,
        favorites: currentFavorites
      };

    case (AppActions.DELETE_FAVORITE):
      currentFavorites = [...state.favorites];
      currentFavorites.splice(currentFavorites.indexOf(action.payload), 1);
      const deletedFavorites = [...initialState.favorites];
      deletedFavorites.splice(deletedFavorites.indexOf(action.payload), 1);
      initialState.favorites = deletedFavorites;
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      return {
        ...state,
        favorites: currentFavorites
      };

    case (AppActions.SAVE_SORTED):
      initialState.favorites = action.payload.favorites;
      initialState.menuItems = action.payload.menuItems;
      localStorage.setItem('favorites', JSON.stringify(initialState.favorites));
      localStorage.setItem('menuItems', JSON.stringify(initialState.menuItems));
      return {
          ...state,
          favorites: action.payload.favorites,
          menuItems: action.payload.menuItems
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
          menuItems: initialState.menuItems,
        };
      }
      const oldFavorites = [...initialState.favorites];
      const filteredFavorites = oldFavorites.filter((favorite) => {
        return favorite.category === action.payload;
      });
      return {
        ...state,
        favorites: filteredFavorites,
        menuItems: state.menuItems,
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

    case (AppActions.MENU_ITEM_EDIT_MODE_CHANGED):
      if (!action.payload.menuItemEditMode) {
        return {
          ...state,
          menuItemEditMode: action.payload.menuItemEditMode,
          editedMenuItem: initialState.editedMenuItem
        };
      }
      return {
        ...state,
        menuItemEditMode: action.payload.menuItemEditMode,
        editedMenuItem: action.payload.editedMenuItem
      };

    case (AppActions.FAVORITE_EDIT_MODE_CHANGED):
      if (!action.payload.favoriteEditMode) {
        return {
          ...state,
          favoriteEditMode: action.payload.favoriteEditMode,
          editedFavorite: new Favorite('', '', state.activeRoute)
        };
      }
      return {
        ...state,
        favoriteEditMode: action.payload.favoriteEditMode,
        editedFavorite: action.payload.editedFavorite
      };

    case (AppActions.ACTIVE_ROUTE):
      return {
        ...state,
        activeRoute: action.payload
      };

    case (AppActions.CHANGE_THEME):
      localStorage.setItem('darkTheme', JSON.stringify(!state.darkTheme));
      return {
        ...state,
        darkTheme: !state.darkTheme
      };

    case (AppActions.ACTIVE_MODAL):
      return {
        ...state,
        activeModal: action.payload
      };

    default:
      return state;
  }
}
