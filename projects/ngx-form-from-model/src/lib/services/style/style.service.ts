import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }

  public getStyleFor(component:string, uistyle:string, condition: boolean = true) {
    switch(uistyle) {
      case 'bootstrap':
        return this.getBootstrapStyleFor(component, condition)
      case 'tailwind':
        return this.getTailwindStyleFor(component, condition)
    }

    return {}
  }

  public getBootstrapStyleFor(component:string, condition: boolean = true) {
    switch(component) {
      case 'formViewControlDiv':
        return {'form-floating mb-3': condition}
      case 'formViewControlLabel':
        return {'form-label': condition}
      case 'formViewControlInput':
        return {'form-control': condition}
      case 'formViewControlInputSm':
        return {'form-control-sm': condition}
      case 'formViewControlSelect':
        return {'form-select': condition}
      case 'formViewControlSelectSm':
        return {'form-select-sm': condition}
    }

    return {}
  }

  public getTailwindStyleFor(component:string, condition: boolean = true) {

    switch(component) {
      case 'formViewControlDiv':
        return {'col-span-full py-4': condition}
      case 'formViewControlLabel':
        return {'block text-sm font-medium leading-6 text-gray-900': condition}
      case 'formViewControlWrapper':
        return {'mt-2': condition}
      case 'formViewControlInputWrapper':
        return {'flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600': condition}
      case 'formViewControlArrayTitle':
        return {'block font-medium leading-6 text-gray-900': condition}
      case 'formViewControlInput':
        return {'block flex-1 border-0 bg-transparent py-1.5 px-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6': condition}
      case 'formViewControlInputSm':
        return {'py-1 text-sm': condition}
      case 'formViewControlSelect':
        return {'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600': condition}
      case 'formViewControlSelectSm':
        return {'py-1 text-sm': condition}
    }

    return {}
  }

  public mergeStyles(st1:any, st2:any) {
    return Object.assign({}, st1, st2)
  }
}
