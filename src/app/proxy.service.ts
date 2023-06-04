import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommonService } from 'src/app/common.service';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  APIBaseUrl = 'https://tslapi.azurewebsites.net/api/data';
  url = '';
  constructor(public api: HttpClient, private common: CommonService) {}
  Get_Product_By_OWNER_ID(
    i_Params_Get_Product_By_OWNER_ID: Params_Get_Product_By_OWNER_ID
  ): Observable<Product[]> {
    this.url =
      this.APIBaseUrl + '/Get_Product_By_OWNER_ID?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Product_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Product_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Product_By_Where_InList_Adv(
    i_Params_Get_Product_By_Where_InList: Params_Get_Product_By_Where_InList
  ): Observable<Result_Get_Product_By_Where_InList_Adv> {
    this.url =
      this.APIBaseUrl +
      '/Get_Product_By_Where_InList_Adv?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Product_By_Where_InList_Adv>(
        this.url,
        JSON.stringify(i_Params_Get_Product_By_Where_InList),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response;
        })
      );
  }
  Get_Offer_By_OWNER_ID(
    i_Params_Get_Offer_By_OWNER_ID: Params_Get_Offer_By_OWNER_ID
  ): Observable<Offer[]> {
    this.url =
      this.APIBaseUrl + '/Get_Offer_By_OWNER_ID?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Offer_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Offer_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Offer_By_Where(
    i_Params_Get_Offer_By_Where: Params_Get_Offer_By_Where
  ): Observable<Result_Get_Offer_By_Where> {
    this.url =
      this.APIBaseUrl + '/Get_Offer_By_Where?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Offer_By_Where>(
        this.url,
        JSON.stringify(i_Params_Get_Offer_By_Where),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response;
        })
      );
  }
  Get_Product_type_By_OWNER_ID(
    i_Params_Get_Product_type_By_OWNER_ID: Params_Get_Product_type_By_OWNER_ID
  ): Observable<Product_type[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Product_type_By_OWNER_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Product_type_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Product_type_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Flavor_By_OWNER_ID(
    i_Params_Get_Flavor_By_OWNER_ID: Params_Get_Flavor_By_OWNER_ID
  ): Observable<Flavor[]> {
    this.url =
      this.APIBaseUrl + '/Get_Flavor_By_OWNER_ID?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Flavor_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Flavor_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Get_Inventory_status_By_OWNER_ID(
    i_Params_Get_Inventory_status_By_OWNER_ID: Params_Get_Inventory_status_By_OWNER_ID
  ): Observable<Inventory_status[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Inventory_status_By_OWNER_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Inventory_status_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Inventory_status_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Edit_Flavor(i_Flavor: Flavor): Observable<Flavor> {
    this.url = this.APIBaseUrl + '/Edit_Flavor?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Flavor>(this.url, JSON.stringify(i_Flavor), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Flavor;
        })
      );
  }
  Edit_Product(i_Product: Product): Observable<Product> {
    this.url = this.APIBaseUrl + '/Edit_Product?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Product>(this.url, JSON.stringify(i_Product), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Product;
        })
      );
  }
  Edit_Offer(i_Offer: Offer): Observable<Offer> {
    this.url = this.APIBaseUrl + '/Edit_Offer?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Offer>(this.url, JSON.stringify(i_Offer), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Offer;
        })
      );
  }
  Edit_Product_type(i_Product_type: Product_type): Observable<Product_type> {
    this.url =
      this.APIBaseUrl + '/Edit_Product_type?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Product_type>(
        this.url,
        JSON.stringify(i_Product_type),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Product_type;
        })
      );
  }
  Edit_Inventory_status(
    i_Inventory_status: Inventory_status
  ): Observable<Inventory_status> {
    this.url =
      this.APIBaseUrl + '/Edit_Inventory_status?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Inventory_status>(
        this.url,
        JSON.stringify(i_Inventory_status),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Inventory_status;
        })
      );
  }
  Edit_Product_flavor(
    i_Product_flavor: Product_flavor
  ): Observable<Product_flavor> {
    this.url =
      this.APIBaseUrl + '/Edit_Product_flavor?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Product_flavor>(
        this.url,
        JSON.stringify(i_Product_flavor),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Product_flavor;
        })
      );
  }
  Delete_Product(
    i_Params_Delete_Product: Params_Delete_Product
  ): Observable<string> {
    this.url = this.APIBaseUrl + '/Delete_Product?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<any>(this.url, JSON.stringify(i_Params_Delete_Product), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.ExceptionMsg;
        })
      );
  }
  Delete_Offer(i_Params_Delete_Offer: Params_Delete_Offer): Observable<string> {
    this.url = this.APIBaseUrl + '/Delete_Offer?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<any>(this.url, JSON.stringify(i_Params_Delete_Offer), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.ExceptionMsg;
        })
      );
  }
  Get_Promo_code_By_OWNER_ID(
    i_Params_Get_Promo_code_By_OWNER_ID: Params_Get_Promo_code_By_OWNER_ID
  ): Observable<Promo_code[]> {
    this.url =
      this.APIBaseUrl +
      '/Get_Promo_code_By_OWNER_ID?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Get_Promo_code_By_OWNER_ID>(
        this.url,
        JSON.stringify(i_Params_Get_Promo_code_By_OWNER_ID),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Result;
        })
      );
  }
  Edit_Promo_code(i_Promo_code: Promo_code): Observable<Promo_code> {
    this.url =
      this.APIBaseUrl + '/Edit_Promo_code?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Promo_code>(
        this.url,
        JSON.stringify(i_Promo_code),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Promo_code;
        })
      );
  }
  Delete_Promo_code(
    i_Params_Delete_Promo_code: Params_Delete_Promo_code
  ): Observable<string> {
    this.url =
      this.APIBaseUrl + '/Delete_Promo_code?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<any>(this.url, JSON.stringify(i_Params_Delete_Promo_code), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.ExceptionMsg;
        })
      );
  }
  Edit_Uploaded_file(
    i_Uploaded_file: Uploaded_file
  ): Observable<Uploaded_file> {
    this.url =
      this.APIBaseUrl + '/Edit_Uploaded_file?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<Result_Edit_Uploaded_file>(
        this.url,
        JSON.stringify(i_Uploaded_file),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.My_Uploaded_file;
        })
      );
  }
  Delete_Uploaded_file(
    i_Params_Delete_Uploaded_file: Params_Delete_Uploaded_file
  ): Observable<string> {
    this.url =
      this.APIBaseUrl + '/Delete_Uploaded_file?Ticket=' + this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<any>(
        this.url,
        JSON.stringify(i_Params_Delete_Uploaded_file),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.ExceptionMsg;
        })
      );
  }
  Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD(
    i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD: Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
  ): Observable<string> {
    this.url =
      this.APIBaseUrl +
      '/Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD?Ticket=' +
      this.common.ticket;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ticket: this.common.ticket,
    });
    const options = { headers: headers };
    return this.api
      .post<any>(
        this.url,
        JSON.stringify(
          i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
        ),
        options
      )
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.ExceptionMsg;
        })
      );
  }
}
export class Params_Get_Product_By_OWNER_ID {
  OWNER_ID?: number;
}
export class Product {
  PRODUCT_ID?: number;
  NAME!: string;
  DESCRIPTION!: string;
  PRICE?: number;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
  PRODUCT_TYPE_ID?: number;
  INVENTORY_STATUS_ID?: number;
  My_Product_type!: Product_type;
  My_Inventory_status!: Inventory_status;
  My_Product_flavor!: Product_flavor[];
  My_Uploaded_files!: Uploaded_file[];
  My_Image_Url!: Uploaded_file;
}
export class Product_type {
  PRODUCT_TYPE_ID?: number;
  TYPE!: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
}
export class Inventory_status {
  INVENTORY_STATUS_ID?: number;
  VALUE!: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
}
export class Product_flavor {
  PRODUCT_FLAVOR_ID?: number;
  PRODUCT_ID?: number;
  FLAVOR_ID?: number;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
  DESCRIPTION!: string;
  My_Product!: Product;
  My_Flavor!: Flavor;
}
export class Uploaded_file {
  UPLOADED_FILE_ID?: number;
  REL_ENTITY!: string;
  REL_KEY?: number;
  REL_FIELD!: string;
  SIZE?: number;
  EXTENSION!: string;
  STAMP!: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
  My_URL!: string;
}
export class Params_Get_Product_By_Where_InList {
  OWNER_ID?: number;
  NAME!: string;
  DESCRIPTION!: string;
  PRODUCT_TYPE_ID_LIST!: number[];
  INVENTORY_STATUS_ID_LIST!: number[];
  START_ROW?: number;
  END_ROW?: number;
  TOTAL_COUNT?: number;
}
export class Params_Get_Offer_By_OWNER_ID {
  OWNER_ID?: number;
}
export class Offer {
  OFFER_ID?: number;
  NAME!: string;
  DESCRIPTION!: string;
  PRICE!: number;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
  My_Uploaded_files!: Uploaded_file[];
  My_Image_Url!: Uploaded_file;
}
export class Params_Get_Offer_By_Where {
  OWNER_ID?: number;
  NAME!: string;
  DESCRIPTION!: string;
  START_ROW?: number;
  END_ROW?: number;
  TOTAL_COUNT?: number;
}
export class Params_Get_Product_type_By_OWNER_ID {
  OWNER_ID?: number;
}
export class Params_Get_Flavor_By_OWNER_ID {
  OWNER_ID?: number;
}
export class Flavor {
  FLAVOR_ID?: number;
  VALUE!: string;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
}
export class Params_Get_Inventory_status_By_OWNER_ID {
  OWNER_ID?: number;
}
export class Params_Delete_Product {
  PRODUCT_ID?: number;
}
export class Params_Delete_Offer {
  OFFER_ID?: number;
}
export class Params_Get_Promo_code_By_OWNER_ID {
  OWNER_ID?: number;
}
export class Promo_code {
  PROMO_CODE_ID?: number;
  PROMO_CODE!: string;
  PERCENTAGE!: number;
  ENTRY_USER_ID?: number;
  ENTRY_DATE!: string;
  OWNER_ID?: number;
}
export class Params_Delete_Promo_code {
  PROMO_CODE_ID?: number;
}
export class Params_Delete_Uploaded_file {
  UPLOADED_FILE_ID?: number;
}
export class Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD {
  REL_ENTITY!: string;
  REL_KEY?: number;
  REL_FIELD!: string;
}
export class Action_Result {
  ExceptionMsg!: string;
}
export class Result_Get_Product_By_OWNER_ID extends Action_Result {
  My_Result!: Product[];
  My_Params_Get_Product_By_OWNER_ID!: Params_Get_Product_By_OWNER_ID;
}
export class Result_Get_Product_By_Where_InList_Adv extends Action_Result {
  My_Result!: Product[];
  My_Params_Get_Product_By_Where_InList!: Params_Get_Product_By_Where_InList;
}
export class Result_Get_Offer_By_OWNER_ID extends Action_Result {
  My_Result!: Offer[];
  My_Params_Get_Offer_By_OWNER_ID!: Params_Get_Offer_By_OWNER_ID;
}
export class Result_Get_Offer_By_Where extends Action_Result {
  My_Result!: Offer[];
  My_Params_Get_Offer_By_Where!: Params_Get_Offer_By_Where;
}
export class Result_Get_Product_type_By_OWNER_ID extends Action_Result {
  My_Result!: Product_type[];
  My_Params_Get_Product_type_By_OWNER_ID!: Params_Get_Product_type_By_OWNER_ID;
}
export class Result_Get_Flavor_By_OWNER_ID extends Action_Result {
  My_Result!: Flavor[];
  My_Params_Get_Flavor_By_OWNER_ID!: Params_Get_Flavor_By_OWNER_ID;
}
export class Result_Get_Inventory_status_By_OWNER_ID extends Action_Result {
  My_Result: Inventory_status[] = [];
  My_Params_Get_Inventory_status_By_OWNER_ID:
    | Params_Get_Inventory_status_By_OWNER_ID
    | undefined;
}
export class Result_Edit_Flavor extends Action_Result {
  My_Flavor!: Flavor;
}
export class Result_Edit_Product extends Action_Result {
  My_Product!: Product;
}
export class Result_Edit_Offer extends Action_Result {
  My_Offer!: Offer;
}
export class Result_Edit_Product_type extends Action_Result {
  My_Product_type!: Product_type;
}
export class Result_Edit_Inventory_status extends Action_Result {
  My_Inventory_status!: Inventory_status;
}
export class Result_Edit_Product_flavor extends Action_Result {
  My_Product_flavor!: Product_flavor;
}
export class Result_Delete_Product extends Action_Result {
  My_Params_Delete_Product!: Params_Delete_Product;
}
export class Result_Delete_Offer extends Action_Result {
  My_Params_Delete_Offer!: Params_Delete_Offer;
}
export class Result_Get_Promo_code_By_OWNER_ID extends Action_Result {
  My_Result!: Promo_code[];
  My_Params_Get_Promo_code_By_OWNER_ID!: Params_Get_Promo_code_By_OWNER_ID;
}
export class Result_Edit_Promo_code extends Action_Result {
  My_Promo_code!: Promo_code;
}
export class Result_Delete_Promo_code extends Action_Result {
  My_Params_Delete_Promo_code!: Params_Delete_Promo_code;
}
export class Result_Edit_Uploaded_file extends Action_Result {
  My_Uploaded_file!: Uploaded_file;
}
export class Result_Delete_Uploaded_file extends Action_Result {
  My_Params_Delete_Uploaded_file!: Params_Delete_Uploaded_file;
}
export class Result_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD extends Action_Result {
  My_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD!: Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD;
}
