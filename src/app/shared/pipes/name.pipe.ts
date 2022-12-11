import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(user: any): string {
    let name = user.name;
    if (user.surname != undefined) name += ' ' + user.surname; 
    return name;
  }

}
