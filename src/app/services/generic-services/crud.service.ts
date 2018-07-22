import { HttpClient } from "@angular/common/http";

export abstract class CRUDService<T> {
  abstract apiUrl: string;
  constructor(protected http: HttpClient) { }

  getEntities(filter?: URLSearchParams): Promise<T[]> {
    return this.http
      .get(`${this.apiUrl}${filter ? `?${filter}` : ''}`)
      .toPromise()
      .then((entities: T[]) => entities)
      .catch(err => { throw err });
  }

  getEntity(id: string,filter?:URLSearchParams): Promise<T> {
    return this.http
      .get(`${this.apiUrl}/${id}${filter ? `?${filter}` : ''}`)
      .toPromise()
      .then((entity: T) => entity)
      .catch(err => { throw err });
  }

  createEntity(entity: T) {
    return this.http
      .post<T>(this.apiUrl, entity)
      .toPromise()
      .then(results => results)
      .catch(err => { throw err });
  }
  updateEntity(id: string, updatedEntity: T) {
    return this.http
      .put<T>(`${this.apiUrl}/${id}`, updatedEntity)
      .toPromise()
      .then(results => results)
      .catch(err => { throw err });
  }
  deleteEntity(id: string) {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .toPromise()
      .then(results => results)
      .catch(err => { throw err });
  }
}
