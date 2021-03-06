import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEspece } from 'app/shared/model/backend/espece.model';

type EntityResponseType = HttpResponse<IEspece>;
type EntityArrayResponseType = HttpResponse<IEspece[]>;

@Injectable({ providedIn: 'root' })
export class EspeceService {
    public resourceUrl = SERVER_API_URL + 'backend/api/especes';

    constructor(protected http: HttpClient) {}

    create(espece: IEspece): Observable<EntityResponseType> {
        return this.http.post<IEspece>(this.resourceUrl, espece, { observe: 'response' });
    }

    update(espece: IEspece): Observable<EntityResponseType> {
        return this.http.put<IEspece>(this.resourceUrl, espece, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEspece>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEspece[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
