import { Injectable } from '@angular/core';
import { PaginationRequest } from '../../core/interfaces/pagination-request.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  getUrlParameters (paginationReq: PaginationRequest): string {
    const {s, page, limit, sort} = paginationReq;
    return `s=${s}&page=${page || ""}&limit=${limit || ""}&sort=${sort}`;
  }
}
